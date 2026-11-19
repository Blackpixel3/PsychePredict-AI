import datetime
from typing import Dict, Any
from ..schemas.assessment import (
    AssessmentSubmitRequest,
    AssessmentSubmitResponse,
)
from ..core.security import generate_anonymized_assessment_id, sanitize_string
from .scoring_service import (
    calculate_psychometric_scores,
    get_preliminary_severity_summaries,
)
from .db_service import save_assessment_record, CLINICAL_DISCLAIMER

def process_and_save_assessment(request_data: AssessmentSubmitRequest) -> AssessmentSubmitResponse:
    """
    Validates, scores, and securely saves an assessment submission.
    No fake AI predictions are created here — only verified psychometric scoring.
    """
    # Anonymized unique ID
    assessment_id = generate_anonymized_assessment_id()
    created_at = datetime.datetime.now(datetime.timezone.utc).isoformat()

    # Sanitize occupation text
    request_data.demographics.occupation = sanitize_string(request_data.demographics.occupation)

    # Compute psychometric scores using official scales
    scores = calculate_psychometric_scores(
        phq9=request_data.phq9,
        gad7=request_data.gad7,
        dass21=request_data.dass21,
    )

    # Compute preliminary screening categories
    preliminary_summary = get_preliminary_severity_summaries(scores)

    # Save to SQLite database
    raw_responses = {
        "phq9": request_data.phq9,
        "gad7": request_data.gad7,
        "dass21": request_data.dass21,
    }
    save_assessment_record(
        assessment_id=assessment_id,
        created_at=created_at,
        demographics=request_data.demographics,
        scores=scores,
        raw_responses=raw_responses,
    )

    return AssessmentSubmitResponse(
        assessment_id=assessment_id,
        created_at=created_at,
        demographics=request_data.demographics,
        scores=scores,
        preliminary_summary=preliminary_summary,
        status="Successfully Evaluated & Recorded",
        disclaimer=CLINICAL_DISCLAIMER,
    )
