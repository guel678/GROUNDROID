from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


Provenance = Literal["demo", "imported", "algorithm-generated", "real"]


class ExperimentCreate(BaseModel):
    name: str = Field(min_length=1)
    description: str = ""
    width: float = Field(gt=0)
    length: float = Field(gt=0)
    coordinate_reference: str = Field(alias="coordinateReference", min_length=1)


class ExperimentRead(ExperimentCreate):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str
    provenance: Provenance
    created_at: datetime = Field(alias="createdAt")


class MeasurementCreate(BaseModel):
    id: str = Field(min_length=1)
    x: float
    y: float
    moisture: float
    compaction: float
    nitrogen: float
    phosphorus: float
    potassium: float
    recorded_at: datetime = Field(alias="recordedAt")
    provenance: Provenance = "demo"


class MeasurementRead(MeasurementCreate):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class MeasurementBatch(BaseModel):
    rows: list[MeasurementCreate]
