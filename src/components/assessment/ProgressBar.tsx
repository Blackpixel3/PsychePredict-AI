import React from 'react';
import { Check } from 'lucide-react';

interface StepItem {
  id: number;
  label: string;
  shortLabel: string;
}

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: StepItem[];
  onStepClick?: (step: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  steps,
  onStepClick,
}) => {
  const percent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);
  const currentStepInfo = steps.find(s => s.id === currentStep);

  return (
    <div className="w-full bg-white rounded-lg border border-charcoal-200 p-4 shadow-subtle mb-6">
      <div className="flex items-center justify-between mb-2 text-xs">
        <div>
          <span className="font-semibold text-charcoal-900">
            Step {currentStep} of {totalSteps}:
          </span>{' '}
          <span className="text-charcoal-600">
            {currentStepInfo?.label || 'Intake'}
          </span>
        </div>
        <span className="text-xs font-mono text-charcoal-500">
          {percent}%
        </span>
      </div>

      {/* Slim Progress Track */}
      <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden mb-4">
        <div
          className="bg-sage-700 h-full transition-all duration-200 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-5 gap-1">
        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isDone && !isCurrent}
              onClick={() => onStepClick && onStepClick(step.id)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                isCurrent
                  ? 'bg-zinc-100'
                  : 'hover:bg-zinc-50'
              } ${!isDone && !isCurrent ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${
                  isDone
                    ? 'bg-sage-800 text-white'
                    : isCurrent
                    ? 'border-2 border-charcoal-900 text-charcoal-900 bg-white font-bold'
                    : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                }`}
              >
                {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : step.id}
              </div>
              <span
                className={`text-[11px] truncate hidden md:inline ${
                  isCurrent
                    ? 'font-semibold text-charcoal-900'
                    : isDone
                    ? 'text-charcoal-700'
                    : 'text-charcoal-400'
                }`}
              >
                {step.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
