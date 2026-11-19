import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Send,
  RotateCcw,
  AlertCircle,
  Check,
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
    { id: 1, label: 'Demographics', shortLabel: 'Demographics' },
    { id: 2, label: 'PHQ-9 Depression', shortLabel: 'PHQ-9' },
    { id: 3, label: 'GAD-7 Anxiety', shortLabel: 'GAD-7' },
    { id: 4, label: 'DASS-21 Tri-Scale', shortLabel: 'DASS-21' },
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
    <div className="max-w-3xl mx-auto py-6 space-y-5">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-charcoal-200 shadow-subtle">
        <div>
          <h1 className="text-base font-semibold text-charcoal-900 tracking-tight">
            Patient Assessment Intake
          </h1>
          <p className="text-xs text-charcoal-500">
            Validated psychometric evaluation for depression, anxiety, and stress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fillSampleAnswers}
            className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-charcoal-800 rounded text-xs font-medium transition-colors"
            title="Auto-fill with sample test data for instant evaluation"
          >
            Fill Sample Data
          </button>

          <button
            type="button"
            onClick={resetAnswers}
            className="flex items-center gap-1 px-2.5 py-1.5 text-charcoal-500 hover:text-charcoal-800 hover:bg-zinc-50 rounded text-xs transition-colors"
            title="Clear all responses"
          >
            <RotateCcw className="w-3 h-3" />
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
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-lg flex items-start gap-2.5 text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Input Required: </span>
            <span>{validationAlert}</span>
          </div>
        </div>
      )}

      {/* Submission Status Feedback */}
      {submissionFeedback && (
        <div
          className={`p-3.5 rounded-lg flex items-start gap-2.5 text-xs font-medium border ${
            submissionFeedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}
        >
          <div className="flex-1">
            <p className="font-semibold">
              {submissionFeedback.type === 'success' ? 'Assessment Recorded' : 'Submission Notice'}
            </p>
            <p className="mt-0.5">{submissionFeedback.message}</p>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-5 sm:p-6 shadow-subtle">
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
          <div className="space-y-5">
            <div className="border-b border-charcoal-200 pb-3">
              <h2 className="text-base font-semibold text-charcoal-900">
                Review and Submit Assessment
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Verify recorded responses before calculating preliminary screening estimates.
              </p>
            </div>

            {/* Verification checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 border border-charcoal-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-charcoal-900">Demographic Profile</span>
                  <Check className="w-3.5 h-3.5 text-sage-800" />
                </div>
                <div className="text-xs text-charcoal-600 space-y-1">
                  <p>
                    <span className="text-charcoal-400">Demographics:</span>{' '}
                    {answers.demographics.age} years • {answers.demographics.gender}
                  </p>
                  <p>
                    <span className="text-charcoal-400">Occupation:</span>{' '}
                    {answers.demographics.occupation || 'Not specified'}
                  </p>
                  <p>
                    <span className="text-charcoal-400">Sleep & Exercise:</span>{' '}
                    {answers.demographics.sleepHours} hrs/night •{' '}
                    {answers.demographics.physicalActivityDays} days/wk
                  </p>
                  <p>
                    <span className="text-charcoal-400">Stress Rating:</span> Level{' '}
                    {answers.demographics.workStressLevel} of 5
                  </p>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border border-charcoal-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-charcoal-900">Instrument Status</span>
                  <Check className="w-3.5 h-3.5 text-sage-800" />
                </div>
                <div className="text-xs text-charcoal-600 space-y-1.5 font-mono">
                  <div className="flex justify-between items-center">
                    <span>PHQ-9 Depression:</span>
                    <span className="font-semibold text-charcoal-900">
                      {phq9Count} / 9 complete
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>GAD-7 Anxiety:</span>
                    <span className="font-semibold text-charcoal-900">
                      {gad7Count} / 7 complete
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>DASS-21 Tri-Scale:</span>
                    <span className="font-semibold text-charcoal-900">
                      {dass21Count} / 21 complete
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend Connectivity Status */}
            <div className="p-3 bg-zinc-50 border border-charcoal-200 rounded text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    backendConnected ? 'bg-sage-600' : 'bg-zinc-400'
                  }`}
                />
                <span className="font-medium text-charcoal-900">
                  Backend Service: {backendConnected ? 'Connected (FastAPI)' : 'Offline (Local Calculation)'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-charcoal-500">
                {backendMessage}
              </span>
            </div>

            {/* Disclaimer notice */}
            <div className="p-3 bg-zinc-50 border border-charcoal-200 rounded text-xs text-charcoal-600 leading-relaxed">
              <strong className="text-charcoal-900">Notice: </strong>
              Outputs produced upon submission are preliminary screening estimates for research purposes. They do not constitute clinical psychiatric diagnoses.
            </div>
          </div>
        )}

        {/* Action Buttons: Previous, Next, Submit */}
        <div className="pt-6 mt-6 border-t border-charcoal-200 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded border border-zinc-200 text-charcoal-700 hover:bg-zinc-50 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-medium transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-sage-800 hover:bg-sage-700 text-white text-xs font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit & View Results</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
