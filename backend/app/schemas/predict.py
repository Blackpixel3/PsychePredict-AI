from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field
from .assessment import DemographicsSchema

class PredictRequestSchema(BaseModel):
    assessment_id: Optional[str] = Field(None, description="Optional ID of a previously submitted assessment")
    demographics: Optional[DemographicsSchema] = Field(None, description="Optional inline demographic data")
    phq9: Optional[Dict[str, int]] = Field(None, description="Optional inline PHQ-9 responses")
    gad7: Optional[Dict[str, int]] = Field(None, description="Optional inline GAD-7 responses")
    dass21: Optional[Dict[str, int]] = Field(None, description="Optional inline DASS-21 responses")

class ModelSpecification(BaseModel):
    architecture: str = "Multi-Head Deep Residual Neural Network (Feedforward MLP with Dropout & BatchNorm)"
    input_dimensions: int = 44  # 7 demographic/lifestyle + 9 PHQ-9 + 7 GAD-7 + 21 DASS-21
    output_heads: List[str] = ["Depression (5 classes)", "Anxiety (5 classes)", "Stress (5 classes)"]
    target_classes: List[str] = ["Normal", "Mild", "Moderate", "Severe", "Extremely Severe"]
    module_target: str = "Module 3: Model Architecture, Training & Deployment"

class PredictResponseSchema(BaseModel):
    model_status: str = "unavailable"
    module_stage: str = "Module 2 (Backend Core & API Contract)"
    message: str = (
        "Deep learning model inference is currently unavailable. "
        "In accordance with Module 2 development rules, AI/ML models are not trained "
        "or simulated with fake scores in this phase. Real model integration will occur in Module 3."
    )
    contract_ready: bool = True
    model_specification: ModelSpecification
    received_features_summary: Optional[Dict[str, Any]] = None
    next_steps: str = "Implement PyTorch / ONNX model inference pipeline in Module 3."
