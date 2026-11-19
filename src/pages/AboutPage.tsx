import React from 'react';
import {
  Brain,
  Layers,
  ShieldAlert,
  Code2,
  Database,
  Cpu,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
} from 'lucide-react';
import { Card } from '../components/common/Card';

export const AboutPage: React.FC = () => {
  const objectives = [
    {
      title: 'Multimodal Psychometric Integration',
      desc: 'Synthesize standard psychiatric scales (DASS-21, PHQ-9, GAD-7) with patient demographic and lifestyle markers to build an expressive multi-feature representation.',
    },
    {
      title: 'Multi-Class Disorder Stratification',
      desc: 'Move beyond binary classifications to predict nuanced severity classes (Normal, Mild, Moderate, Severe, Extremely Severe) across Depression, Anxiety, and Stress.',
    },
    {
      title: 'Objective Clinical Decision Support',
      desc: 'Provide quantified screening probabilities to triage patient pipelines, identify high-risk individuals early, and assist mental health clinicians with calibrated metrics.',
    },
    {
      title: 'Modern Healthcare Software Architecture',
      desc: 'Build a modular, secure, accessible web client (Module 1) ready for integration with deep learning inference backends (Module 2) and clinical deployment.',
    },
  ];

  const methodologySteps = [
    {
      step: 'Phase 1',
      title: 'Data Collection & Normalization',
      desc: 'Standardized questionnaire batteries (DASS-21, PHQ-9, GAD-7) along with demographic attributes (age, sex, sleep hours, physical activity, work stress). Continuous and ordinal inputs are normalized and one-hot encoded.',
      icon: FileSpreadsheet,
    },
    {
      step: 'Phase 2',
      title: 'Feature Engineering & Latent Encoding',
      desc: 'Extraction of covariance structures between affective symptoms. Deep autoencoders or multi-layer dense projections map cross-disorder co-morbidities between depression and anxiety.',
      icon: Layers,
    },
    {
      step: 'Phase 3',
      title: 'Deep Multi-Class Neural Network',
      desc: 'A multi-head feedforward neural architecture with residual skip connections, batch normalization, and dropout regularization. Multi-class Softmax heads independently predict severity for each disorder.',
      icon: Cpu,
    },
    {
      step: 'Phase 4',
      title: 'Calibration & Stratified Output',
      desc: 'Temperature scaling and Platt calibration ensure that output probabilities accurately reflect empirical confidence. Outputs are formatted for clinician triage and patient feedback.',
      icon: Brain,
    },
  ];

  const techStack = [
    {
      category: 'Frontend Client (Module 1 — Current)',
      items: [
        { name: 'React 19 + TypeScript', role: 'Component architecture and type-safe state modeling' },
        { name: 'Vite 8', role: 'Next-generation fast bundler and dev server' },
        { name: 'Tailwind CSS', role: 'Modern, responsive healthcare UI design system' },
        { name: 'Recharts', role: 'Multi-class probability distribution visualization' },
        { name: 'Lucide React', role: 'Clean, accessible medical and interface iconography' },
      ],
      icon: Code2,
    },
    {
      category: 'Planned Backend & Model Engine (Future Module 2 & 3)',
      items: [
        { name: 'Python & FastAPI', role: 'High-performance asynchronous inference REST API' },
        { name: 'PyTorch / TensorFlow', role: 'Deep learning multi-class neural network classifier' },
        { name: 'Scikit-Learn & Pandas', role: 'Data preprocessing, imputation, and validation metrics' },
        { name: 'PostgreSQL / SQLite', role: 'Secure, anonymized longitudinal assessment audit storage' },
      ],
      icon: Database,
    },
  ];

  return (
    <div className="space-y-12 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-8 sm:p-12 text-white shadow-elevated border border-navy-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-teal-400" />
          <span>Master of Computer Applications (MCA) Project</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Deep Learning Based Multi-Class Prediction of Psychological Disorders Using Patient Assessment Data
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Comprehensive project documentation, clinical methodology, algorithmic pipeline specifications, and formal limitations for the psychological disorder prediction platform.
        </p>
      </div>

      {/* Project Objectives */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-navy-900">Project Objectives</h2>
          <p className="text-xs text-slate-500">
            Core research aims guiding the computational modeling and clinical utility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objectives.map((obj, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold text-navy-900">{obj.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Methodology Pipeline */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-navy-900">Methodology & Deep Learning Pipeline</h2>
          <p className="text-xs text-slate-500">
            End-to-end algorithmic flow from patient psychometric intake to calibrated multi-class severity prediction.
          </p>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {methodologySteps.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-teal-600 uppercase tracking-wider">
                      {m.step}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-teal-600" />
                    </div>
                  </div>
                  <h3 className="text-xs font-bold text-navy-900 mb-1">{m.title}</h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 text-slate-300">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-navy-900">Scientific Foundation:</span> The psychometric batteries integrated into this system (PHQ-9, GAD-7, DASS-21) possess decades of empirical validation in clinical psychology with established internal consistency (Cronbach's alpha &gt; 0.88). Deep neural models enable capturing nonlinear symptom interaction patterns that simple additive cutoff tables frequently overlook.
        </div>
      </section>

      {/* Technology Overview */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-navy-900">Technology Overview</h2>
          <p className="text-xs text-slate-500">
            Current frontend implementation and future architectural roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStack.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <Card
                key={i}
                title={tech.category}
                action={
                  <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-teal-600" />
                  </div>
                }
              >
                <div className="space-y-3">
                  {tech.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-bold text-navy-900">{it.name}: </span>
                        <span className="text-slate-600">{it.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Limitations and Medical Disclaimer */}
      <section id="disclaimer" className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-bold text-rose-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            Limitations & Medical Disclaimer
          </h2>
          <p className="text-xs text-slate-500">
            Ethical constraints, computational boundaries, and legal health notices.
          </p>
        </div>

        <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-bold text-rose-950 text-sm">
                Non-Diagnostic Clinical Research Tool
              </h3>
              <p>
                1. <strong>Preliminary Screening Only:</strong> The predictions, class probabilities, and risk classifications produced by this software are intended exclusively for academic research, preliminary screening, and clinical decision support. They do not constitute, nor are they a substitute for, a formal psychiatric diagnosis, psychiatric evaluation, or therapeutic plan.
              </p>
              <p>
                2. <strong>Subjective Reporting Bias:</strong> All psychometric scales rely on self-reported inputs. Factors such as transient stress, misunderstanding questions, social desirability bias, or language differences may affect calculated results.
              </p>
              <p>
                3. <strong>Deep Learning Model Boundaries:</strong> While neural networks can detect intricate correlation patterns, they can also exhibit algorithmic biases based on training distribution representations. Output probabilities must always be corroborated by licensed clinical psychologists.
              </p>
              <p>
                4. <strong>Emergency Protocol:</strong> If a user expresses suicidal ideation (e.g., PHQ-9 Item 9 positive rating) or is experiencing severe psychiatric crisis, this application must not be relied upon. The individual should seek immediate emergency medical care or reach out to authorized crisis suicide prevention helplines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Attribution Footer Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
            MCA
          </div>
          <div>
            <p className="font-bold text-navy-900 text-sm">
              Master of Computer Applications Project
            </p>
            <p className="text-[11px] text-slate-500">
              Department of Computer Applications • Module 1 (Frontend Implementation)
            </p>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-800 font-semibold rounded-full border border-teal-200">
            Frontend Architecture Approved
          </span>
        </div>
      </div>
    </div>
  );
};
