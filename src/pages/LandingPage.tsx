import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const categories = [
    {
      title: 'Depression',
      scale: 'PHQ-9 & DASS-21 Subscale',
      desc: 'Assesses mood dysphoria, anhedonia, sleep architecture changes, and energy fatigue over preceding weeks.',
      metric: '5 Severity Tiers',
    },
    {
      title: 'Anxiety',
      scale: 'GAD-7 & DASS-21 Subscale',
      desc: 'Evaluates autonomic arousal, somatic tension, apprehension, and persistent generalized cognitive worry.',
      metric: 'Clinical Thresholds',
    },
    {
      title: 'Stress',
      scale: 'DASS-21 Stress Scale',
      desc: 'Quantifies chronic non-specific nervous tension, difficulty relaxing, irritability, and stress reactivity.',
      metric: 'Normative Calibration',
    },
  ];

  const methodologySteps = [
    {
      number: '01',
      title: 'Standardized Intake',
      desc: 'Self-administered screening using clinically validated instruments (DASS-21, PHQ-9, GAD-7) and baseline demographic indicators.',
    },
    {
      number: '02',
      title: 'Multi-Class Representation',
      desc: 'Neural feature extraction models cross-condition interdependencies rather than evaluating symptoms in isolation.',
    },
    {
      number: '03',
      title: 'Stratified Risk Profiles',
      desc: 'Scores are classified into standardized severity tiers (Normal through Extremely Severe) to assist clinical decision-making.',
    },
  ];

  return (
    <div className="space-y-12 py-6 max-w-5xl mx-auto">
      {/* Editorial Header / Hero */}
      <section className="bg-white border border-charcoal-200 rounded-lg p-6 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-100 text-charcoal-700 text-xs font-mono">
            <span>MCA Project • Clinical Research Platform</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-charcoal-900 tracking-tight leading-tight">
            Deep Learning Based Multi-Class Prediction of Psychological Disorders
          </h1>

          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-2xl">
            An objective clinical research screening tool designed to evaluate and stratify Depression, Anxiety, and Stress through validated psychometric instruments and demographic context.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-sage-800 hover:bg-sage-700 text-white font-medium text-xs transition-colors"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md border border-zinc-200 hover:bg-zinc-50 text-charcoal-700 font-medium text-xs transition-colors"
            >
              Methodology & Documentation
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-charcoal-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-600">
          <div>
            <span className="font-semibold text-charcoal-900 block">Validated Batteries</span>
            <span className="text-charcoal-500">DASS-21, PHQ-9, and GAD-7</span>
          </div>
          <div>
            <span className="font-semibold text-charcoal-900 block">Stratification</span>
            <span className="text-charcoal-500">5-class clinical severity tiers</span>
          </div>
          <div>
            <span className="font-semibold text-charcoal-900 block">System Architecture</span>
            <span className="text-charcoal-500">FastAPI backend + React client</span>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer Banner */}
      <section className="bg-zinc-50 border border-charcoal-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-charcoal-700 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-charcoal-900">Clinical Screening Disclaimer: </span>
            <span className="text-charcoal-600">
              This system provides preliminary research screening estimates based on self-reported data. It does not provide medical diagnoses or replace formal evaluation by a licensed healthcare professional.
            </span>
          </div>
        </div>
        <Link
          to="/about"
          className="text-xs text-charcoal-900 font-medium underline underline-offset-2 shrink-0 hover:text-sage-800"
        >
          View Full Notice
        </Link>
      </section>

      {/* Assessment Categories */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-charcoal-900 tracking-tight">
            Assessment Categories
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Tri-dimensional screening based on internationally standardized psychometric scales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-lg border border-charcoal-200 p-5 flex flex-col justify-between space-y-4 shadow-subtle"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-charcoal-900">{c.title}</h3>
                  <span className="text-[10px] font-mono text-charcoal-500 bg-zinc-100 px-2 py-0.5 rounded">
                    {c.metric}
                  </span>
                </div>
                <div className="text-xs font-mono text-sage-800">{c.scale}</div>
                <p className="text-xs text-charcoal-600 leading-relaxed">{c.desc}</p>
              </div>

              <div className="pt-3 border-t border-charcoal-200">
                <Link
                  to="/assessment"
                  className="text-xs font-medium text-charcoal-900 hover:text-sage-800 inline-flex items-center gap-1 transition-colors"
                >
                  Screen {c.title} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-white border border-charcoal-200 rounded-lg p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-charcoal-900 tracking-tight">
            Screening & Prediction Methodology
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            A structured workflow connecting standardized psychometric questions to multi-class outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {methodologySteps.map((step) => (
            <div
              key={step.number}
              className="p-4 rounded-md border border-charcoal-200 bg-zinc-50 space-y-2"
            >
              <span className="text-xs font-mono font-semibold text-charcoal-400">
                {step.number}
              </span>
              <h3 className="text-xs font-semibold text-charcoal-900">{step.title}</h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-charcoal-500">
            Intake requires approximately 4–6 minutes to complete all questions.
          </p>
          <Link
            to="/assessment"
            className="px-4 py-2 bg-charcoal-900 hover:bg-charcoal-800 text-white font-medium text-xs rounded transition-colors"
          >
            Begin Intake Questionnaire
          </Link>
        </div>
      </section>
    </div>
  );
};
