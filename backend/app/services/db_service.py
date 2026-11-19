import json
from typing import Optional, Dict, Any, List
from ..core.database import get_db_connection
from ..schemas.assessment import (
    DemographicsSchema,
    PsychometricScoresSchema,
    AssessmentDetailResponse,
)
from .scoring_service import get_preliminary_severity_summaries

CLINICAL_DISCLAIMER = (
    "Preliminary Research Screening Estimate Only: Not a definitive medical or psychiatric diagnosis. "
    "All indicators are based on self-reported psychometric questionnaires (DASS-21, PHQ-9, GAD-7) "
    "and must be validated by a licensed clinical professional."
)

def save_assessment_record(
    assessment_id: str,
    created_at: str,
    demographics: DemographicsSchema,
    scores: PsychometricScoresSchema,
    raw_responses: Dict[str, Any]
) -> None:
    """Inserts a validated assessment record into the SQLite database."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO assessments (
                id, created_at, age, gender, occupation, sleep_hours,
                physical_activity_days, caffeine_intake, work_stress_level,
                phq9_total, gad7_total, dass21_depression, dass21_anxiety,
                dass21_stress, raw_responses_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                assessment_id,
                created_at,
                demographics.age,
                demographics.gender,
                demographics.occupation,
                demographics.sleep_hours,
                demographics.physical_activity_days,
                demographics.caffeine_intake,
                demographics.work_stress_level,
                scores.phq9_total,
                scores.gad7_total,
                scores.dass21_depression,
                scores.dass21_anxiety,
                scores.dass21_stress,
                json.dumps(raw_responses),
            ),
        )
        conn.commit()

def get_assessment_record_by_id(assessment_id: str) -> Optional[AssessmentDetailResponse]:
    """Retrieves an assessment record by its unique ID."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM assessments WHERE id = ?",
            (assessment_id,),
        )
        row = cursor.fetchone()
        if not row:
            return None

        demographics = DemographicsSchema(
            age=row["age"],
            gender=row["gender"],
            occupation=row["occupation"],
            sleepHours=row["sleep_hours"],
            physicalActivityDays=row["physical_activity_days"],
            caffeineIntake=row["caffeine_intake"],
            workStressLevel=row["work_stress_level"],
        )

        scores = PsychometricScoresSchema(
            phq9_total=row["phq9_total"],
            gad7_total=row["gad7_total"],
            dass21_depression=row["dass21_depression"],
            dass21_anxiety=row["dass21_anxiety"],
            dass21_stress=row["dass21_stress"],
        )

        preliminary_summary = get_preliminary_severity_summaries(scores)

        raw_responses = {}
        if row["raw_responses_json"]:
            try:
                raw_responses = json.loads(row["raw_responses_json"])
            except Exception:
                raw_responses = {}

        return AssessmentDetailResponse(
            assessment_id=row["id"],
            created_at=row["created_at"],
            demographics=demographics,
            scores=scores,
            preliminary_summary=preliminary_summary,
            raw_responses=raw_responses,
            status="Stored & Evaluated",
            disclaimer=CLINICAL_DISCLAIMER,
        )

def list_recent_assessment_records(limit: int = 10) -> List[Dict[str, Any]]:
    """Lists recent assessments for dashboard triage."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, created_at, age, gender, occupation, phq9_total, gad7_total, dass21_stress FROM assessments ORDER BY created_at DESC LIMIT ?",
            (limit,),
        )
        rows = cursor.fetchall()
        results = []
        for row in rows:
            results.append({
                "id": row["id"],
                "created_at": row["created_at"],
                "age": row["age"],
                "gender": row["gender"],
                "occupation": row["occupation"],
                "phq9_total": row["phq9_total"],
                "gad7_total": row["gad7_total"],
                "dass21_stress": row["dass21_stress"],
            })
        return results
