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

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-semibold text-navy-900">
          Assessment Progress: Step {currentStep} of {totalSteps}
        </span>
        <span className="font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
          {percent}% Complete
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
        <div
          className="bg-teal-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-5 gap-2">
        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isDone && !isCurrent}
              onClick={() => onStepClick && onStepClick(step.id)}
              className={`flex flex-col items-center text-center group transition-colors ${
                !isDone && !isCurrent ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-1.5 transition-all ${
                  isDone
                    ? 'bg-teal-600 text-white shadow-xs'
                    : isCurrent
                    ? 'bg-navy-900 text-white ring-4 ring-navy-100'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.id}
              </div>
              <span
                className={`text-[11px] leading-tight font-medium hidden sm:block ${
                  isCurrent
                    ? 'text-navy-900 font-semibold'
                    : isDone
                    ? 'text-teal-700'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
              <span
                className={`text-[10px] leading-tight font-medium sm:hidden ${
                  isCurrent
                    ? 'text-navy-900 font-semibold'
                    : isDone
                    ? 'text-teal-700'
                    : 'text-slate-400'
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
