import os
from contextlib import asynccontextmanager
from datetime import UTC, datetime
from pathlib import Path
from uuid import uuid4

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from .database import Base, create_database, session_dependency
from .models import Experiment, SoilMeasurement
from .schemas import ExperimentCreate, ExperimentRead, MeasurementBatch, MeasurementRead


DEFAULT_DATABASE_URL = f"sqlite:///{Path(__file__).resolve().parents[1] / 'groundroid-demo.db'}"


def create_app(database_url: str | None = None) -> FastAPI:
    engine, session_factory = create_database(database_url or os.getenv("DATABASE_URL", DEFAULT_DATABASE_URL))
    get_session = session_dependency(session_factory)

    @asynccontextmanager
    async def lifespan(_: FastAPI):
        Base.metadata.create_all(engine)
        with session_factory.begin() as session:
            if session.scalar(select(Experiment.id).limit(1)) is None:
                session.add(Experiment(
                    id="experiment-1",
                    name="Test Field - April 2025",
                    description="Seeded demonstration experiment",
                width=15,
                length=10,
                    coordinate_reference="Local grid (m)",
                    provenance="demo",
                    created_at=datetime.now(UTC),
                ))
        yield
        engine.dispose()

    app = FastAPI(title="Groundroid Demo API", lifespan=lifespan)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    def health(session: Session = Depends(get_session)):
        session.execute(text("SELECT 1"))
        return {"status": "ok", "database": "sqlite"}

    @app.get("/experiments", response_model=list[ExperimentRead], response_model_by_alias=True)
    def list_experiments(session: Session = Depends(get_session)):
        return session.scalars(select(Experiment).order_by(Experiment.created_at)).all()

    @app.post("/experiments", response_model=ExperimentRead, response_model_by_alias=True, status_code=status.HTTP_201_CREATED)
    def create_experiment(payload: ExperimentCreate, session: Session = Depends(get_session)):
        experiment = Experiment(
            id=f"experiment-{uuid4()}",
            name=payload.name,
            description=payload.description,
            width=payload.width,
            length=payload.length,
            coordinate_reference=payload.coordinate_reference,
            provenance="demo",
            created_at=datetime.now(UTC),
        )
        session.add(experiment)
        session.commit()
        return experiment

    @app.get("/experiments/{experiment_id}/measurements", response_model=list[MeasurementRead], response_model_by_alias=True)
    def list_measurements(experiment_id: str, session: Session = Depends(get_session)):
        return session.scalars(
            select(SoilMeasurement)
            .where(SoilMeasurement.experiment_id == experiment_id)
            .order_by(SoilMeasurement.recorded_at)
        ).all()

    @app.post("/experiments/{experiment_id}/measurements", status_code=status.HTTP_201_CREATED)
    def import_measurements(experiment_id: str, payload: MeasurementBatch, session: Session = Depends(get_session)):
        if session.get(Experiment, experiment_id) is None:
            raise HTTPException(status_code=404, detail="Experiment not found")
        session.add_all([
            SoilMeasurement(experiment_id=experiment_id, **row.model_dump())
            for row in payload.rows
        ])
        session.commit()
        return {
            "data": {"imported": len(payload.rows)},
            "provenance": "imported",
            "generatedAt": datetime.now(UTC).isoformat(),
        }

    return app


app = create_app()
