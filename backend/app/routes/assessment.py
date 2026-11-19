from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from ..schemas.common import ApiResponse
from ..schemas.assessment import (
    AssessmentSubmitRequest,
    AssessmentSubmitResponse,
    AssessmentDetailResponse,
)
from ..services.assessment_service import process_and_save_assessment
from ..services.db_service import get_assessment_record_by_id, list_recent_assessment_records

router = APIRouter(prefix="/assessment", tags=["Patient Assessment"])

@router.post(
    "/submit",
    response_model=ApiResponse[AssessmentSubmitResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Submit and validate patient psychometric assessment",
)
def submit_assessment(payload: AssessmentSubmitRequest):
    """
    Receives and validates demographic, lifestyle, PHQ-9, GAD-7, and DASS-21 responses.
    Calculates verified psychometric scores and securely records the assessment.
    """
    try:
        response_data = process_and_save_assessment(payload)
        return ApiResponse(
            success=True,
            message="Assessment successfully submitted, validated, and scored.",
            data=response_data,
        )
    except ValueError as val_err:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(val_err),
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the assessment: {str(exc)}",
        )

@router.get(
    "/recent",
    response_model=ApiResponse[List[Dict[str, Any]]],
    summary="Retrieve recent assessment logs for triage overview",
)
def get_recent_assessments():
    """
    Returns recent anonymized assessment logs for dashboard triage display.
    """
    records = list_recent_assessment_records(limit=10)
    return ApiResponse(
        success=True,
        message="Recent assessment logs retrieved.",
        data=records,
    )

@router.get(
    "/{assessment_id}",
    response_model=ApiResponse[AssessmentDetailResponse],
    summary="Retrieve a stored assessment by unique identifier",
)
def get_assessment(assessment_id: str):
    """
    Retrieves stored psychometric scores and validated answers by assessment ID.
    """
    record = get_assessment_record_by_id(assessment_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Assessment with identifier '{assessment_id}' was not found.",
        )

    return ApiResponse(
        success=True,
        message="Assessment record retrieved successfully.",
        data=record,
    )
