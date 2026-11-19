export type SeverityLevel = 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Extremely Severe';

export type DisorderType = 'Depression' | 'Anxiety' | 'Stress';

export interface PatientDemographics {
  age: number | '';
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | '';
  occupation: string;
  sleepHours: number | '';
  physicalActivityDays: number | '';
  caffeineIntake: 'none' | 'low' | 'moderate' | 'high' | '';
  workStressLevel: number | ''; // 1-5 scale
}

export interface QuestionItem {
  id: number;
  text: string;
  category?: 'depression' | 'anxiety' | 'stress';
}

export interface QuestionnaireScale {
  id: 'phq9' | 'gad7' | 'dass21';
  name: string;
  title: string;
  instruction: string;
  timeframe: string;
  options: {
    label: string;
    value: number;
    description?: string;
  }[];
  questions: QuestionItem[];
}

export interface AssessmentAnswers {
  demographics: PatientDemographics;
  phq9: Record<number, number>;
  gad7: Record<number, number>;
  dass21: Record<number, number>;
}

export interface MultiClassProbability {
  label: SeverityLevel;
  probability: number;
  color: string;
}

export interface DisorderPrediction {
  type: DisorderType;
  score: number;
  maxScore: number;
  scaleUsed: string;
  severity: SeverityLevel;
  riskPercent: number;
  probabilities: MultiClassProbability[];
  interpretation: string;
  clinicalNotes: string[];
}

export interface AssessmentResult {
  id: string;
  timestamp: string;
  patientData: PatientDemographics;
  scores: {
    phq9Total: number;
    gad7Total: number;
    dass21Depression: number;
    dass21Anxiety: number;
    dass21Stress: number;
  };
  predictions: {
    depression: DisorderPrediction;
    anxiety: DisorderPrediction;
    stress: DisorderPrediction;
  };
  overallRiskSummary: {
    primaryConcern: DisorderType | 'None';
    highestSeverity: SeverityLevel;
    recommendedActions: string[];
  };
  backendMeta?: {
    syncedWithBackend: boolean;
    savedAssessmentId?: string;
    backendMessage?: string;
    modelStatus?: string;
  };
}

export interface BackendHealthData {
  service: string;
  version: string;
  environment: string;
  database: string;
  model_status: string;
  module_stage: string;
  timestamp: string;
}

export interface BackendPredictData {
  model_status: string;
  module_stage: string;
  message: string;
  contract_ready: boolean;
  model_specification: {
    architecture: string;
    input_dimensions: number;
    output_heads: string[];
    target_classes: string[];
    module_target: string;
  };
  received_features_summary?: Record<string, any>;
  next_steps: string;
}

export interface RecentAssessmentItem {
  id: string;
  patientCode: string;
  date: string;
  age: number;
  gender: string;
  depressionSeverity: SeverityLevel;
  anxietySeverity: SeverityLevel;
  stressSeverity: SeverityLevel;
  status: 'Completed' | 'Pending Review' | 'Flagged';
}
