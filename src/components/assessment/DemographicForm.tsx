import React from 'react';
import type { PatientDemographics } from '../../types';

interface DemographicFormProps {
  data: PatientDemographics;
  onChange: (fields: Partial<PatientDemographics>) => void;
  errors?: Record<string, string>;
}

export const DemographicForm: React.FC<DemographicFormProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  return (
    <div className="space-y-5">
      <div className="border-b border-charcoal-200 pb-3">
        <h2 className="text-base font-semibold text-charcoal-900">
          Demographic & Lifestyle Profile
        </h2>
        <p className="text-xs text-charcoal-500 mt-0.5">
          Standard contextual parameters used to contextualize clinical psychometric indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Age */}
        <div>
          <label className="block text-xs font-medium text-charcoal-700 mb-1">
            Age (years) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            min={15}
            max={100}
            placeholder="e.g. 24"
            value={data.age === '' ? '' : data.age}
            onChange={(e) =>
              onChange({ age: e.target.value === '' ? '' : parseInt(e.target.value, 10) })
            }
            className={`w-full px-3 py-2 text-xs bg-white border rounded-md focus:outline-none transition-colors ${
              errors.age
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-zinc-300 focus:border-sage-700 focus:ring-1 focus:ring-sage-700'
            }`}
          />
          {errors.age && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.age}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-medium text-charcoal-700 mb-1">
            Biological Sex / Gender Identity <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.gender}
            onChange={(e) =>
              onChange({
                gender: e.target.value as PatientDemographics['gender'],
              })
            }
            className={`w-full px-3 py-2 text-xs bg-white border rounded-md focus:outline-none transition-colors ${
              errors.gender
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-zinc-300 focus:border-sage-700 focus:ring-1 focus:ring-sage-700'
            }`}
          >
            <option value="">Select option</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary / Diverse</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-xs font-medium text-charcoal-700 mb-1">
            Occupation / Primary Role <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Student, Software Engineer, Healthcare Worker"
            value={data.occupation}
            onChange={(e) => onChange({ occupation: e.target.value })}
            className={`w-full px-3 py-2 text-xs bg-white border rounded-md focus:outline-none transition-colors ${
              errors.occupation
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-zinc-300 focus:border-sage-700 focus:ring-1 focus:ring-sage-700'
            }`}
          />
          {errors.occupation && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.occupation}</p>
          )}
        </div>

        {/* Sleep Duration */}
        <div>
          <label className="block text-xs font-medium text-charcoal-700 mb-1">
            Average Sleep (hours / night) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            min={2}
            max={16}
            step={0.5}
            placeholder="e.g. 7"
            value={data.sleepHours === '' ? '' : data.sleepHours}
            onChange={(e) =>
              onChange({
                sleepHours: e.target.value === '' ? '' : parseFloat(e.target.value),
              })
            }
            className={`w-full px-3 py-2 text-xs bg-white border rounded-md focus:outline-none transition-colors ${
              errors.sleepHours
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-zinc-300 focus:border-sage-700 focus:ring-1 focus:ring-sage-700'
            }`}
          />
          {errors.sleepHours && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.sleepHours}</p>
          )}
        </div>

        {/* Physical Activity */}
        <div>
          <label className="block text-xs font-medium text-charcoal-700 mb-1">
            Physical Exercise (days / week) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            max={7}
            placeholder="e.g. 3"
            value={data.physicalActivityDays === '' ? '' : data.physicalActivityDays}
            onChange={(e) =>
              onChange({
                physicalActivityDays:
                  e.target.value === '' ? '' : parseInt(e.target.value, 10),
              })
            }
            className={`w-full px-3 py-2 text-xs bg-white border rounded-md focus:outline-none transition-colors ${
              errors.physicalActivityDays
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-zinc-300 focus:border-sage-700 focus:ring-1 focus:ring-sage-700'
            }`}
          />
          {errors.physicalActivityDays && (
            <p className="text-[11px] text-rose-500 mt-1">
              {errors.physicalActivityDays}
            </p>
          )}
        </div>

        {/* Caffeine Intake */}
        <div>
          <label className="block text-xs font-medium text-charcoal-700 mb-1">
            Caffeine / Stimulant Consumption <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.caffeineIntake}
            onChange={(e) =>
              onChange({
                caffeineIntake: e.target.value as PatientDemographics['caffeineIntake'],
              })
            }
            className={`w-full px-3 py-2 text-xs bg-white border rounded-md focus:outline-none transition-colors ${
              errors.caffeineIntake
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-zinc-300 focus:border-sage-700 focus:ring-1 focus:ring-sage-700'
            }`}
          >
            <option value="">Select consumption tier</option>
            <option value="none">None (0 cups/day)</option>
            <option value="low">Low (1 cup coffee/tea daily)</option>
            <option value="moderate">Moderate (2-3 cups daily)</option>
            <option value="high">High (&gt; 3 cups or energy drinks)</option>
          </select>
          {errors.caffeineIntake && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.caffeineIntake}</p>
          )}
        </div>
      </div>

      {/* Work / Study Stress Rating (1 to 5 scale) */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-charcoal-700">
            Self-Perceived Work or Academic Stress (1: Minimal — 5: Severe){' '}
            <span className="text-rose-500">*</span>
          </label>
          {data.workStressLevel && (
            <span className="text-xs font-mono text-charcoal-500">
              Selected: {data.workStressLevel} / 5
            </span>
          )}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((lvl) => {
            const isSelected = data.workStressLevel === lvl;
            const labels = ['Minimal', 'Low', 'Moderate', 'Elevated', 'Severe'];
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => onChange({ workStressLevel: lvl })}
                className={`py-2.5 px-2 rounded-md border text-center transition-colors ${
                  isSelected
                    ? 'bg-charcoal-900 border-charcoal-900 text-white font-medium'
                    : 'bg-white border-zinc-200 text-charcoal-700 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                <div className="text-xs font-semibold">{lvl}</div>
                <div
                  className={`text-[10px] mt-0.5 ${
                    isSelected ? 'text-zinc-300' : 'text-charcoal-400'
                  }`}
                >
                  {labels[lvl - 1]}
                </div>
              </button>
            );
          })}
        </div>
        {errors.workStressLevel && (
          <p className="text-[11px] text-rose-500 mt-1">{errors.workStressLevel}</p>
        )}
      </div>
    </div>
  );
};
