import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  ShieldAlert,
  ArrowRight,
  Activity,
  CheckCircle,
  BarChart3,
  Layers,
  HeartPulse,
  Sparkles,
  ClipboardCheck,
  Stethoscope,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const features = [
    {
      title: 'Depression Screening',
      instrument: 'PHQ-9 & DASS-21 Subscale',
      desc: 'Multimodal evaluation of anhedonia, dysphoric mood, sleep changes, and energy fatigue levels.',
      badge: 'Multi-Class Severity',
      color: 'border-blue-200 bg-blue-50/50 text-blue-700',
      icon: Activity,
    },
    {
      title: 'Anxiety Profiling',
      instrument: 'GAD-7 & DASS-21 Subscale',
      desc: 'Quantification of autonomic arousal, muscle tension, situational apprehension, and cognitive worry.',
      badge: 'Psychometric Calibration',
      color: 'border-teal-200 bg-teal-50/50 text-teal-700',
      icon: HeartPulse,
    },
    {
      title: 'Stress Tension Scoring',
      instrument: 'DASS-21 Stress Subscale',
      desc: 'Screening for nervous tension, irritability, emotional over-reactivity, and chronic fatigue states.',
      badge: 'Continuous Monitoring',
      color: 'border-amber-200 bg-amber-50/50 text-amber-700',
      icon: Brain,
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Multimodal Data Capture',
      desc: 'Structured intake of validated clinical psychometrics (DASS-21, PHQ-9, GAD-7) along with demographic and lifestyle behavioral parameters.',
      icon: ClipboardCheck,
    },
    {
      num: '02',
      title: 'Deep Feature Representation',
      desc: 'Nonlinear multi-class neural representations map complex symptom co-occurrences without assuming simplistic independent symptom scoring.',
      icon: Layers,
    },
    {
      num: '03',
      title: 'Stratified Risk Estimation',
      desc: 'Calibrated predictive outputs categorize preliminary disorder severity (Normal, Mild, Moderate, Severe, Extremely Severe) to assist clinicians.',
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 text-white p-8 sm:p-12 md:p-16 shadow-elevated border border-navy-800">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="relative max-w-3xl z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Master of Computer Applications (MCA) Project Research</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Deep Learning Based Multi-Class Prediction of Psychological Disorders Using Patient Assessment Data
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            A specialized healthcare intelligence platform for early, objective multi-class screening across Depression, Anxiety, and Stress. Combining standardized psychometric batteries (DASS-21, PHQ-9, GAD-7) with deep computational neural architectures.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-sm transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-400/35"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-medium text-sm transition-all border border-navy-700"
            >
              <span>View Dashboard</span>
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-colors"
            >
              <span>Project Details</span>
            </Link>
          </div>

          {/* Highlights checklist */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-navy-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>DASS-21, PHQ-9 & GAD-7</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Multi-Class Severity Strata</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Module 1 Frontend Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Medical Disclaimer Banner */}
      <section className="bg-amber-500/10 border border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Important Clinical Screening Notice
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
              This system is an academic research screening instrument designed to predict preliminary risk stratifications. It does <strong>not</strong> produce a formal medical or psychiatric diagnosis. In case of acute mental distress or suicidal crisis, contact professional emergency services immediately.
            </p>
          </div>
        </div>
        <Link
          to="/about#disclaimer"
          className="text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-200/80 px-3.5 py-2 rounded-lg border border-amber-300/70 shrink-0 transition-colors"
        >
          Read Full Disclaimer
        </Link>
      </section>

      {/* Screening Dimensions / Features */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Screening Dimensions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Tri-Factor Psychological Health Screening
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Multi-class assessment of interrelated affective disorders using validated psychometric batteries and demographic context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card hover:shadow-elevated transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center border border-navy-100">
                      <Icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${f.color}`}>
                      {f.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900">{f.title}</h3>
                    <p className="text-[11px] font-semibold text-teal-700 mt-0.5">
                      {f.instrument}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <Link
                    to="/assessment"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    <span>Assess Condition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How the System Works */}
      <section className="bg-slate-50 border border-slate-200/90 rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-navy-800 bg-navy-100/70 px-2.5 py-1 rounded-full">
            Pipeline Architecture
          </span>
          <h2 className="text-2xl font-extrabold text-navy-900">
            How the System Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A three-stage analytical workflow transforming raw self-reported assessments into multi-class risk probabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-teal-600 tracking-wider">
                    STEP {s.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-navy-900 text-white rounded-lg">
              <Stethoscope className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-navy-900">Ready to begin evaluation?</p>
              <p className="text-[11px] text-slate-500">
                Complete the demographic and 3-battery questionnaire in approximately 4-6 minutes.
              </p>
            </div>
          </div>
          <Link
            to="/assessment"
            className="w-full sm:w-auto px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs rounded-xl shadow-xs text-center transition-colors"
          >
            Launch Assessment Now
          </Link>
        </div>
      </section>
    </div>
  );
};
