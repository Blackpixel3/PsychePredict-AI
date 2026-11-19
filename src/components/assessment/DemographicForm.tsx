import React from 'react';
import type { PatientDemographics } from '../../types';
import { User, Briefcase, Moon, Activity, Coffee, Flame } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-navy-900">
          Step 1: Patient Demographics & Lifestyle Profile
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          These background parameters are utilized by the multimodal risk stratification pipeline to contextualize psychological screening responses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Age */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-navy-700" />
            Age (Years) <span className="text-rose-500">*</span>
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
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.age
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-300 focus:ring-teal-500/20 focus:border-teal-600'
            }`}
          />
          {errors.age && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.age}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Biological Sex / Gender Identity <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.gender}
            onChange={(e) =>
              onChange({
                gender: e.target.value as PatientDemographics['gender'],
              })
            }
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.gender
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-300 focus:ring-teal-500/20 focus:border-teal-600'
            }`}
          >
            <option value="">Select gender option</option>
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
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-navy-700" />
            Occupation / Primary Role <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Student, Software Engineer, Healthcare Worker"
            value={data.occupation}
            onChange={(e) => onChange({ occupation: e.target.value })}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.occupation
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-300 focus:ring-teal-500/20 focus:border-teal-600'
            }`}
          />
          {errors.occupation && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.occupation}</p>
          )}
        </div>

        {/* Sleep Duration */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-navy-700" />
            Average Sleep (Hours / Night) <span className="text-rose-500">*</span>
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
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.sleepHours
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-300 focus:ring-teal-500/20 focus:border-teal-600'
            }`}
          />
          {errors.sleepHours && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.sleepHours}</p>
          )}
        </div>

        {/* Physical Activity */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            Physical Exercise (Days / Week) <span className="text-rose-500">*</span>
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
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.physicalActivityDays
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-300 focus:ring-teal-500/20 focus:border-teal-600'
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
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Coffee className="w-3.5 h-3.5 text-amber-700" />
            Caffeine / Stimulant Consumption <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.caffeineIntake}
            onChange={(e) =>
              onChange({
                caffeineIntake: e.target.value as PatientDemographics['caffeineIntake'],
              })
            }
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.caffeineIntake
                ? 'border-rose-300 focus:ring-rose-200'
                : 'border-slate-300 focus:ring-teal-500/20 focus:border-teal-600'
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
        <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            Self-Perceived Work / Academic Stress Rating (1: Minimal — 5: Extreme){' '}
            <span className="text-rose-500">*</span>
          </span>
          {data.workStressLevel && (
            <span className="text-xs font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded">
              Level {data.workStressLevel} of 5
            </span>
          )}
        </label>
        <div className="grid grid-cols-5 gap-2.5">
          {[1, 2, 3, 4, 5].map((lvl) => {
            const isSelected = data.workStressLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => onChange({ workStressLevel: lvl })}
                className={`py-3 px-2 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-navy-900 border-navy-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-sm font-bold">{lvl}</div>
                <div
                  className={`text-[10px] mt-0.5 ${
                    isSelected ? 'text-teal-300' : 'text-slate-400'
                  }`}
                >
                  {lvl === 1
                    ? 'Very Low'
                    : lvl === 2
                    ? 'Low'
                    : lvl === 3
                    ? 'Moderate'
                    : lvl === 4
                    ? 'High'
                    : 'Extreme'}
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
