from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class Experiment(Base):
    __tablename__ = "experiments"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, default="")
    width: Mapped[float] = mapped_column(Float, nullable=False)
    length: Mapped[float] = mapped_column(Float, nullable=False)
    coordinate_reference: Mapped[str] = mapped_column(String, nullable=False)
    provenance: Mapped[str] = mapped_column(String, default="demo")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    measurements: Mapped[list["SoilMeasurement"]] = relationship(
        back_populates="experiment", cascade="all, delete-orphan"
    )


class SoilMeasurement(Base):
    __tablename__ = "soil_measurements"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    experiment_id: Mapped[str] = mapped_column(ForeignKey("experiments.id"), index=True)
    x: Mapped[float] = mapped_column(Float, nullable=False)
    y: Mapped[float] = mapped_column(Float, nullable=False)
    moisture: Mapped[float] = mapped_column(Float, nullable=False)
    compaction: Mapped[float] = mapped_column(Float, nullable=False)
    nitrogen: Mapped[float] = mapped_column(Float, nullable=False)
    phosphorus: Mapped[float] = mapped_column(Float, nullable=False)
    potassium: Mapped[float] = mapped_column(Float, nullable=False)
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    provenance: Mapped[str] = mapped_column(String, default="demo")
    experiment: Mapped[Experiment] = relationship(back_populates="measurements")
