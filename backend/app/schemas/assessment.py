from typing import Dict, Literal, Optional, Any
from pydantic import BaseModel, Field, field_validator, ConfigDict

GenderType = Literal["male", "female", "non-binary", "prefer-not-to-say"]
CaffeineType = Literal["none", "low", "moderate", "high"]

class DemographicsSchema(BaseModel):
    age: int = Field(..., ge=15, le=120, description="Age between 15 and 120 years")
    gender: GenderType = Field(..., description="Gender identity or biological sex")
    occupation: str = Field(..., min_length=1, max_length=100, description="Primary occupation or field of study")
    sleep_hours: float = Field(..., ge=1.0, le=24.0, alias="sleepHours", description="Average sleep per night in hours")
    physical_activity_days: int = Field(..., ge=0, le=7, alias="physicalActivityDays", description="Days of physical exercise per week")
    caffeine_intake: CaffeineType = Field(..., alias="caffeineIntake", description="Caffeine consumption level")
    work_stress_level: int = Field(..., ge=1, le=5, alias="workStressLevel", description="Subjective stress rating on a 1-5 scale")

    model_config = ConfigDict(
        populate_by_name=True,
        extra="ignore"
    )

class AssessmentSubmitRequest(BaseModel):
    demographics: DemographicsSchema
    phq9: Dict[str, int] = Field(..., description="PHQ-9 responses (item id 1-9, value 0-3)")
    gad7: Dict[str, int] = Field(..., description="GAD-7 responses (item id 1-7, value 0-3)")
    dass21: Dict[str, int] = Field(..., description="DASS-21 responses (item id 1-21, value 0-3)")

    @field_validator("phq9")
    @classmethod
    def validate_phq9(cls, v: Dict[str, int]) -> Dict[str, int]:
        if len(v) < 9:
            raise ValueError(f"PHQ-9 requires all 9 items to be answered, received {len(v)}")
        for key, val in v.items():
            try:
                k_int = int(key)
                if k_int < 1 or k_int > 9:
                    raise ValueError(f"Invalid PHQ-9 question id: {key}")
            except ValueError:
                raise ValueError(f"PHQ-9 key must be numeric 1-9: {key}")
            if val < 0 or val > 3:
                raise ValueError(f"PHQ-9 item {key} value must be between 0 and 3, received {val}")
        return v

    @field_validator("gad7")
    @classmethod
    def validate_gad7(cls, v: Dict[str, int]) -> Dict[str, int]:
        if len(v) < 7:
            raise ValueError(f"GAD-7 requires all 7 items to be answered, received {len(v)}")
        for key, val in v.items():
            try:
                k_int = int(key)
                if k_int < 1 or k_int > 7:
                    raise ValueError(f"Invalid GAD-7 question id: {key}")
            except ValueError:
                raise ValueError(f"GAD-7 key must be numeric 1-7: {key}")
            if val < 0 or val > 3:
                raise ValueError(f"GAD-7 item {key} value must be between 0 and 3, received {val}")
        return v

    @field_validator("dass21")
    @classmethod
    def validate_dass21(cls, v: Dict[str, int]) -> Dict[str, int]:
        if len(v) < 21:
            raise ValueError(f"DASS-21 requires all 21 items to be answered, received {len(v)}")
        for key, val in v.items():
            try:
                k_int = int(key)
                if k_int < 1 or k_int > 21:
                    raise ValueError(f"Invalid DASS-21 question id: {key}")
            except ValueError:
                raise ValueError(f"DASS-21 key must be numeric 1-21: {key}")
            if val < 0 or val > 3:
                raise ValueError(f"DASS-21 item {key} value must be between 0 and 3, received {val}")
        return v

    model_config = ConfigDict(
        populate_by_name=True,
        extra="ignore"
    )

class PsychometricScoresSchema(BaseModel):
    phq9_total: int
    gad7_total: int
    dass21_depression: int
    dass21_anxiety: int
    dass21_stress: int

class SeverityCategorySchema(BaseModel):
    condition: str
    score: int
    max_score: int
    preliminary_severity: str
    scale_used: str
    benchmark: str

class AssessmentSubmitResponse(BaseModel):
    assessment_id: str
    created_at: str
    demographics: DemographicsSchema
    scores: PsychometricScoresSchema
    preliminary_summary: list[SeverityCategorySchema]
    status: str
    disclaimer: str

class AssessmentDetailResponse(BaseModel):
    assessment_id: str
    created_at: str
    demographics: DemographicsSchema
    scores: PsychometricScoresSchema
    preliminary_summary: list[SeverityCategorySchema]
    raw_responses: Dict[str, Any]
    status: str
    disclaimer: str
