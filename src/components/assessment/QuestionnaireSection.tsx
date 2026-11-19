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
    <div className="space-y-4">
      {/* Header & Instructions */}
      <div className="bg-white border border-charcoal-200 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium text-charcoal-700 bg-zinc-100 px-2 py-0.5 rounded">
                {scale.name}
              </span>
              <span className="text-xs text-charcoal-500">
                Timeframe: {scale.timeframe}
              </span>
            </div>
            <h2 className="text-sm font-semibold text-charcoal-900 mt-1">
              {scale.title}
            </h2>
          </div>

          <div
            className={`self-start sm:self-auto text-xs font-mono px-2.5 py-1 rounded border flex items-center gap-1.5 ${
              isComplete
                ? 'bg-emerald-50/60 text-emerald-800 border-emerald-200'
                : 'bg-zinc-50 text-charcoal-600 border-zinc-200'
            }`}
          >
            {isComplete ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-charcoal-400" />
            )}
            <span>
              {answeredCount}/{totalCount} Completed
            </span>
          </div>
        </div>

        <p className="text-xs text-charcoal-600 bg-zinc-50 p-2.5 rounded border border-charcoal-200 mt-2 italic">
          "{scale.instruction}"
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {scale.questions.map((q, index) => {
          const selectedValue = answers[q.id];
          const isUnanswered = unansweredIds.includes(q.id);

          return (
            <div
              key={q.id}
              id={`question-${q.id}`}
              className={`p-4 rounded-lg border transition-colors ${
                isUnanswered
                  ? 'border-rose-400 bg-rose-50/20'
                  : 'border-charcoal-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-3">
                <span className="w-5 h-5 rounded bg-zinc-100 text-charcoal-700 font-semibold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-charcoal-900 leading-snug">
                    {q.text}
                  </p>
                  {q.category && (
                    <span className="inline-block mt-1 text-[10px] font-mono text-charcoal-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                      Subscale: {q.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Radio Option Responses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-0.5">
                {scale.options.map((opt) => {
                  const isChecked = selectedValue === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-2 p-2.5 rounded-md border cursor-pointer select-none transition-colors ${
                        isChecked
                          ? 'bg-sage-50/60 border-sage-700 text-charcoal-900 font-medium'
                          : 'bg-white border-zinc-200 text-charcoal-700 hover:bg-zinc-50 hover:border-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${scale.id}-${q.id}`}
                        value={opt.value}
                        checked={isChecked}
                        onChange={() => onAnswerChange(q.id, opt.value)}
                        className="mt-0.5 w-3.5 h-3.5 text-sage-800 border-zinc-300 focus:ring-sage-700 shrink-0"
                      />
                      <div className="text-xs leading-tight">
                        <div className="font-medium flex items-center gap-1">
                          <span>{opt.label}</span>
                          <span className="text-[10px] text-charcoal-400 font-normal">
                            ({opt.value})
                          </span>
                        </div>
                        {opt.description && (
                          <div className="text-[10px] text-charcoal-500 mt-0.5 font-normal">
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              {isUnanswered && (
                <p className="text-[11px] text-rose-600 mt-2 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Please select a response to proceed.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
