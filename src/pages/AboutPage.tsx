import React from 'react';
import { Card } from '../components/common/Card';

export const AboutPage: React.FC = () => {
  const objectives = [
    {
      title: 'Multimodal Psychometric Integration',
      desc: 'Synthesizes standardized psychiatric scales (DASS-21, PHQ-9, GAD-7) with demographic and lifestyle markers to construct an expressive multidimensional feature representation.',
    },
    {
      title: 'Multi-Class Disorder Stratification',
      desc: 'Moves beyond binary classification to predict granular clinical severity tiers (Normal, Mild, Moderate, Severe, Extremely Severe) across Depression, Anxiety, and Stress.',
    },
    {
      title: 'Objective Clinical Decision Support',
      desc: 'Provides calibrated probability distributions to assist mental health clinicians with quantitative triage metrics rather than subjective score cutoffs alone.',
    },
    {
      title: 'Production-Grade Healthcare Software Architecture',
      desc: 'Implements a modular, accessible React frontend coupled with an asynchronous FastAPI inference service and SQLite database.',
    },
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Standardized Psychometric Intake',
      desc: 'Patient responses are collected across DASS-21, PHQ-9, and GAD-7 alongside validated demographic and lifestyle covariates (sleep duration, activity, workplace stress).',
    },
    {
      step: '02',
      title: 'Feature Normalization & Preprocessing',
      desc: 'Ordinal scale responses are normalized, categorical demographics are one-hot encoded, and continuous metrics undergo zero-mean unit-variance scaling.',
    },
    {
      step: '03',
      title: 'Multi-Task Deep Neural Representation',
      desc: 'Feedforward neural architectures with residual connections model non-linear co-occurrences between depression, anxiety, and stress symptoms simultaneously.',
    },
    {
      step: '04',
      title: 'Calibrated Severity Stratification',
      desc: 'Softmax probability distributions are mapped into validated clinical severity bands to support screening workflows and audit compliance.',
    },
  ];

  const techStack = [
    {
      category: 'Frontend Client Architecture',
      items: [
        { name: 'React 19 & TypeScript', role: 'Type-safe component hierarchy and state management' },
        { name: 'Tailwind CSS', role: 'Restrained, clinical design system with custom typography' },
        { name: 'Vite', role: 'Optimized bundler and rapid hot-module development runtime' },
        { name: 'Recharts', role: 'Accessible probability distribution charts' },
      ],
    },
    {
      category: 'Backend & Service Layer',
      items: [
        { name: 'Python & FastAPI', role: 'Asynchronous REST API with Pydantic schema validation' },
        { name: 'SQLite & Python Standard Library', role: 'Persistent assessment record storage' },
        { name: 'Uvicorn', role: 'ASGI production server' },
        { name: 'Pytest', role: 'Automated test suite verifying submission and endpoints' },
      ],
    },
  ];

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto">
      {/* Editorial Header */}
      <div className="bg-white border border-charcoal-200 rounded-lg p-6 sm:p-8 space-y-3 shadow-subtle">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-100 text-charcoal-700 text-xs font-mono">
          <span>Academic Research Documentation</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-charcoal-900 tracking-tight leading-snug">
          Deep Learning Based Multi-Class Prediction of Psychological Disorders Using Patient Assessment Data
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-3xl">
          Technical overview, methodology, algorithmic architecture, and clinical boundaries for the MCA research project on multi-class psychological disorder screening.
        </p>
      </div>

      {/* Project Objectives */}
      <section className="space-y-4">
        <div className="border-b border-charcoal-200 pb-2">
          <h2 className="text-sm font-semibold text-charcoal-900 uppercase tracking-wider">
            Project Objectives
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Core research goals guiding computational architecture and clinical screening.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((obj, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg border border-charcoal-200 space-y-1.5 shadow-subtle"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-charcoal-400">
                  0{i + 1}
                </span>
                <h3 className="text-xs font-semibold text-charcoal-900">{obj.title}</h3>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed pl-5">
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Methodology Pipeline */}
      <section className="space-y-4">
        <div className="border-b border-charcoal-200 pb-2">
          <h2 className="text-sm font-semibold text-charcoal-900 uppercase tracking-wider">
            Methodology & Pipeline
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Four-stage data processing workflow from intake to multi-class estimation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {methodologySteps.map((m) => (
            <div
              key={m.step}
              className="bg-white p-4 rounded-lg border border-charcoal-200 space-y-2 shadow-subtle"
            >
              <span className="text-xs font-mono font-semibold text-sage-800">
                Phase {m.step}
              </span>
              <h3 className="text-xs font-semibold text-charcoal-900">{m.title}</h3>
              <p className="text-[11px] text-charcoal-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-50 p-3.5 rounded border border-charcoal-200 text-xs text-charcoal-600 leading-relaxed">
          <strong className="text-charcoal-900">Psychometric Integrity: </strong>
          The instruments integrated into this platform (PHQ-9, GAD-7, DASS-21) are internationally established psychological batteries with demonstrated internal consistency (Cronbach’s α &gt; 0.85). Deep representations help capture comorbid symptom presentations that simple linear sum thresholds may obscure.
        </div>
      </section>

      {/* Technology Overview */}
      <section className="space-y-4">
        <div className="border-b border-charcoal-200 pb-2">
          <h2 className="text-sm font-semibold text-charcoal-900 uppercase tracking-wider">
            Technology Stack
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Architecture and tooling implemented across the client and service layers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techStack.map((tech, i) => (
            <Card key={i} title={tech.category}>
              <div className="space-y-2">
                {tech.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-zinc-50 rounded border border-charcoal-200 text-xs"
                  >
                    <span className="font-semibold text-charcoal-900">{it.name}: </span>
                    <span className="text-charcoal-600">{it.role}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Limitations and Medical Disclaimer */}
      <section id="disclaimer" className="space-y-3">
        <div className="border-b border-charcoal-200 pb-2">
          <h2 className="text-sm font-semibold text-charcoal-900 uppercase tracking-wider">
            Limitations & Medical Disclaimer
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Ethical constraints, computational boundaries, and legal health notices.
          </p>
        </div>

        <div className="bg-zinc-50 border border-charcoal-200 rounded-lg p-5 space-y-3 text-xs text-charcoal-700 leading-relaxed">
          <div>
            <h3 className="font-semibold text-charcoal-900 mb-1">
              1. Non-Diagnostic Research Screening Instrument
            </h3>
            <p className="text-charcoal-600">
              The classifications, severity tiers, and probability values produced by this platform are preliminary screening estimates developed for academic research purposes. They do not constitute, and cannot replace, a formal psychiatric diagnosis or psychological clinical evaluation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-charcoal-900 mb-1">
              2. Self-Reporting Variability
            </h3>
            <p className="text-charcoal-600">
              Questionnaire responses depend on self-reported perception, which may be influenced by acute transient stressors, subjective interpretative differences, or recall variance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-charcoal-900 mb-1">
              3. Emergency Protocols
            </h3>
            <p className="text-charcoal-600">
              If an individual is experiencing acute crisis, severe distress, or self-harm ideation, immediate emergency medical attention or certified crisis helplines must be utilized (e.g., National Helpline Tele-MANAS: 14416).
            </p>
          </div>
        </div>
      </section>

      {/* Academic Attribution Footer */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-500">
        <div>
          <p className="font-semibold text-charcoal-900">
            Master of Computer Applications (MCA) Project
          </p>
          <p className="text-[11px] text-charcoal-500">
            Department of Computer Applications • Academic Year 2025–2026
          </p>
        </div>
        <span className="font-mono text-[10px] text-charcoal-600 bg-zinc-100 px-2.5 py-1 rounded">
          Modules 1 & 2 Integrated
        </span>
      </div>
    </div>
  );
};
