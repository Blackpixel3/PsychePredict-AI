import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Sparkles,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { ProgressBar } from '../components/assessment/ProgressBar';
import { DemographicForm } from '../components/assessment/DemographicForm';
import { QuestionnaireSection } from '../components/assessment/QuestionnaireSection';
import { phq9Scale } from '../data/phq9Questions';
import { gad7Scale } from '../data/gad7Questions';
import { dass21Scale } from '../data/dass21Questions';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    answers,
    setDemographics,
    setPhq9Answer,
    setGad7Answer,
    setDass21Answer,
    fillSampleAnswers,
    resetAnswers,
    submitAssessment,
    isSubmitting,
    backendConnected,
    backendMessage,
  } = useAssessment();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [unansweredIds, setUnansweredIds] = useState<number[]>([]);
  const [validationAlert, setValidationAlert] = useState<string | null>(null);
  const [submissionFeedback, setSubmissionFeedback] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);

  // Allow jumping to scale step via query param e.g. /assessment?scale=phq9
  useEffect(() => {
    const scaleParam = searchParams.get('scale');
    if (scaleParam === 'phq9') setCurrentStep(2);
    else if (scaleParam === 'gad7') setCurrentStep(3);
    else if (scaleParam === 'dass21') setCurrentStep(4);
  }, [searchParams]);

  const steps = [
    { id: 1, label: 'Demographics', shortLabel: 'Demo' },
    { id: 2, label: 'PHQ-9 (Depression)', shortLabel: 'PHQ-9' },
    { id: 3, label: 'GAD-7 (Anxiety)', shortLabel: 'GAD-7' },
    { id: 4, label: 'DASS-21 (Tri-Scale)', shortLabel: 'DASS-21' },
    { id: 5, label: 'Review & Submit', shortLabel: 'Review' },
  ];

  // Validation logic per step
  const validateCurrentStep = (): boolean => {
    setValidationAlert(null);
    setErrors({});
    setUnansweredIds([]);

    if (currentStep === 1) {
      const newErrors: Record<string, string> = {};
      const { age, gender, occupation, sleepHours, physicalActivityDays, caffeineIntake, workStressLevel } =
        answers.demographics;

      if (!age || age < 15 || age > 110) {
        newErrors.age = 'Please enter a valid age between 15 and 110.';
      }
      if (!gender) {
        newErrors.gender = 'Please select a gender option.';
      }
      if (!occupation || occupation.trim().length === 0) {
        newErrors.occupation = 'Please enter your current occupation or study field.';
      }
      if (sleepHours === '' || sleepHours < 1 || sleepHours > 18) {
        newErrors.sleepHours = 'Please enter average sleep hours (1-18).';
      }
      if (physicalActivityDays === '' || physicalActivityDays < 0 || physicalActivityDays > 7) {
        newErrors.physicalActivityDays = 'Please specify exercise days per week (0-7).';
      }
      if (!caffeineIntake) {
        newErrors.caffeineIntake = 'Please choose a caffeine intake category.';
      }
      if (!workStressLevel) {
        newErrors.workStressLevel = 'Please rate your subjective stress level from 1 to 5.';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setValidationAlert('Please fill in all required demographic and lifestyle parameters.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
      }
      return true;
    }

    if (currentStep === 2) {
      const missing = phq9Scale.questions
        .map((q) => q.id)
        .filter((id) => answers.phq9[id] === undefined);

      if (missing.length > 0) {
        setUnansweredIds(missing);
        setValidationAlert(`Please answer all ${missing.length} remaining PHQ-9 questions before proceeding.`);
        const firstMissing = document.getElementById(`question-${missing[0]}`);
        if (firstMissing) firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
      return true;
    }

    if (currentStep === 3) {
      const missing = gad7Scale.questions
        .map((q) => q.id)
        .filter((id) => answers.gad7[id] === undefined);

      if (missing.length > 0) {
        setUnansweredIds(missing);
        setValidationAlert(`Please answer all ${missing.length} remaining GAD-7 questions before proceeding.`);
        const firstMissing = document.getElementById(`question-${missing[0]}`);
        if (firstMissing) firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
      return true;
    }

    if (currentStep === 4) {
      const missing = dass21Scale.questions
        .map((q) => q.id)
        .filter((id) => answers.dass21[id] === undefined);

      if (missing.length > 0) {
        setUnansweredIds(missing);
        setValidationAlert(`Please answer all ${missing.length} remaining DASS-21 questions before proceeding.`);
        const firstMissing = document.getElementById(`question-${missing[0]}`);
        if (firstMissing) firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(5, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setValidationAlert(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setValidationAlert(null);
    setSubmissionFeedback(null);
    try {
      const result = await submitAssessment();
      if (result.backendMeta?.syncedWithBackend) {
        setSubmissionFeedback({
          type: 'success',
          message: `Assessment verified and saved in FastAPI backend (ID: ${result.id}). Navigating to Results...`,
        });
      } else {
        setSubmissionFeedback({
          type: 'warning',
          message: `Notice: Backend offline or unreachable. Computed preliminary screening using local psychometric formulas.`,
        });
      }
      setTimeout(() => {
        navigate('/results');
      }, 750);
    } catch (err: any) {
      setValidationAlert(err.message || 'Failed to submit assessment. Please check inputs and try again.');
    }
  };

  // Quick summary counts for Review step
  const phq9Count = Object.keys(answers.phq9).length;
  const gad7Count = Object.keys(answers.gad7).length;
  const dass21Count = Object.keys(answers.dass21).length;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Top Banner & Convenience Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-navy-900 tracking-tight">
            Patient Assessment Intake
          </h1>
          <p className="text-xs text-slate-500">
            Official multi-scale psychometric evaluation for depression, anxiety, and stress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fillSampleAnswers}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-semibold transition-colors"
            title="Auto-fill with sample test data for instant evaluation"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Fill Sample Data</span>
          </button>

          <button
            type="button"
            onClick={resetAnswers}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors"
            title="Clear all responses"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Step Bar */}
      <ProgressBar
        currentStep={currentStep}
        totalSteps={steps.length}
        steps={steps}
        onStepClick={(stepId) => {
          if (stepId < currentStep) {
            setCurrentStep(stepId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Validation Alert */}
      {validationAlert && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-start gap-3 text-xs font-medium animate-shake">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-rose-900">Validation Notice</p>
            <p className="mt-0.5">{validationAlert}</p>
          </div>
        </div>
      )}

      {/* Submission Status Feedback */}
      {submissionFeedback && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 text-xs font-medium border ${
            submissionFeedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}
        >
          <CheckCircle2
            className={`w-4 h-4 shrink-0 mt-0.5 ${
              submissionFeedback.type === 'success' ? 'text-emerald-600' : 'text-amber-600'
            }`}
          />
          <div className="flex-1">
            <p className="font-semibold">
              {submissionFeedback.type === 'success' ? 'Backend Submission Confirmed' : 'Submission Notice'}
            </p>
            <p className="mt-0.5">{submissionFeedback.message}</p>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card">
        {currentStep === 1 && (
          <DemographicForm
            data={answers.demographics}
            onChange={setDemographics}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <QuestionnaireSection
            scale={phq9Scale}
            answers={answers.phq9}
            onAnswerChange={setPhq9Answer}
            unansweredIds={unansweredIds}
          />
        )}

        {currentStep === 3 && (
          <QuestionnaireSection
            scale={gad7Scale}
            answers={answers.gad7}
            onAnswerChange={setGad7Answer}
            unansweredIds={unansweredIds}
          />
        )}

        {currentStep === 4 && (
          <QuestionnaireSection
            scale={dass21Scale}
            answers={answers.dass21}
            onAnswerChange={setDass21Answer}
            unansweredIds={unansweredIds}
          />
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-navy-900">
                Step 5: Review & Submit Assessment
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Please verify your entered parameters before generating multi-class predictive screening estimates.
              </p>
            </div>

            {/* Verification checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-navy-900">Patient Profile</span>
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>
                    <span className="font-medium text-slate-500">Demographics:</span>{' '}
                    {answers.demographics.age} years • {answers.demographics.gender}
                  </p>
                  <p>
                    <span className="font-medium text-slate-500">Occupation:</span>{' '}
                    {answers.demographics.occupation || 'Not specified'}
                  </p>
                  <p>
                    <span className="font-medium text-slate-500">Sleep & Exercise:</span>{' '}
                    {answers.demographics.sleepHours} hrs/night •{' '}
                    {answers.demographics.physicalActivityDays} days/wk
                  </p>
                  <p>
                    <span className="font-medium text-slate-500">Stress Rating:</span> Level{' '}
                    {answers.demographics.workStressLevel} of 5
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-navy-900">Batteries Status</span>
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-xs text-slate-600 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>PHQ-9 Depression Items:</span>
                    <span className="font-semibold text-navy-900">
                      {phq9Count} / 9 Answered
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>GAD-7 Anxiety Items:</span>
                    <span className="font-semibold text-navy-900">
                      {gad7Count} / 7 Answered
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>DASS-21 Tri-Scale Items:</span>
                    <span className="font-semibold text-navy-900">
                      {dass21Count} / 21 Answered
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend Connectivity Status */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    backendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                  }`}
                />
                <span className="font-semibold text-navy-900">
                  Backend API: {backendConnected ? 'Connected & Operational' : 'Offline / Local Fallback'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                {backendMessage}
              </span>
            </div>

            {/* Disclaimer acknowledgement */}
            <div className="p-4 bg-amber-500/10 border border-amber-200 rounded-xl text-xs text-slate-700 space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Screening Output Confirmation</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                By submitting, you acknowledge that the resulting severity tiers and probability distributions represent computational screening estimates and do not replace professional psychiatric or clinical psychological evaluation.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons: Previous, Next, Submit */}
        <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs shadow-xs transition-all"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Neural Inference...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Assessment & Generate Results</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
