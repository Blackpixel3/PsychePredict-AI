import React from 'react';
import type { QuestionnaireScale } from '../../types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface QuestionnaireSectionProps {
  scale: QuestionnaireScale;
  answers: Record<number, number>;
  onAnswerChange: (questionId: number, value: number) => void;
  unansweredIds?: number[];
}

export const QuestionnaireSection: React.FC<QuestionnaireSectionProps> = ({
  scale,
  answers,
  onAnswerChange,
  unansweredIds = [],
}) => {
  const answeredCount = Object.keys(answers).length;
  const totalCount = scale.questions.length;
  const isComplete = answeredCount === totalCount;

  return (
    <div className="space-y-6">
      {/* Header & Instructions */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded">
                {scale.name}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Timeframe: {scale.timeframe}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-navy-900 mt-1">
              {scale.title}
            </h2>
          </div>

          <div
            className={`self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
              isComplete
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {isComplete ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600" />
            )}
            <span>
              {answeredCount} of {totalCount} Answered
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 italic bg-white/70 p-3 rounded-lg border border-slate-200/60 mt-3">
          "{scale.instruction}"
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {scale.questions.map((q, index) => {
          const selectedValue = answers[q.id];
          const isUnanswered = unansweredIds.includes(q.id);

          return (
            <div
              key={q.id}
              id={`question-${q.id}`}
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                isUnanswered
                  ? 'border-rose-300 bg-rose-50/30 ring-1 ring-rose-200'
                  : selectedValue !== undefined
                  ? 'border-slate-200 bg-white hover:border-slate-300'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3 mb-3.5">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-navy-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800 leading-snug">
                    {q.text}
                  </p>
                  {q.category && (
                    <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      Subscale: {q.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Radio Option Responses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                {scale.options.map((opt) => {
                  const isChecked = selectedValue === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer select-none transition-all ${
                        isChecked
                          ? 'bg-teal-50/80 border-teal-500 text-teal-950 font-medium shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${scale.id}-${q.id}`}
                        value={opt.value}
                        checked={isChecked}
                        onChange={() => onAnswerChange(q.id, opt.value)}
                        className="mt-0.5 w-4 h-4 text-teal-600 border-slate-300 focus:ring-teal-500 shrink-0"
                      />
                      <div className="text-xs leading-tight">
                        <div className="font-semibold flex items-center gap-1">
                          <span>{opt.label}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({opt.value})
                          </span>
                        </div>
                        {opt.description && (
                          <div className="text-[11px] text-slate-500 mt-0.5 font-normal">
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              {isUnanswered && (
                <p className="text-[11px] text-rose-500 mt-2 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Please select a response to continue.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
