import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Download,
  RotateCcw,
  LayoutDashboard,
  Activity,
  HeartPulse,
  Brain,
  Printer,
  Check,
  AlertTriangle,
  Info,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useAssessment } from '../context/AssessmentContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import type { DisorderType } from '../types';

export const ResultsPage: React.FC = () => {
  const { latestResult } = useAssessment();
  const [selectedDisorder, setSelectedDisorder] = useState<DisorderType>('Depression');
  const [downloadSuccessModal, setDownloadSuccessModal] = useState(false);

  const disorderData =
    selectedDisorder === 'Depression'
      ? latestResult.predictions.depression
      : selectedDisorder === 'Anxiety'
      ? latestResult.predictions.anxiety
      : latestResult.predictions.stress;

  const chartData = disorderData.probabilities.map((p) => ({
    severity: p.label,
    probability: p.probability,
    fill: p.color,
  }));

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloadSuccessModal(true);
  };

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      {/* Critical Medical Disclaimer Banner */}
      <div className="bg-amber-500/10 border-2 border-amber-300 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                Screening Instrument
              </span>
              <span className="text-xs text-amber-900 font-semibold">
                Preliminary Research Estimates Only
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed max-w-3xl">
              These scores and multi-class probabilistic distributions represent <strong>preliminary screening estimates</strong> based on patient-reported psychometric questionnaires (DASS-21, PHQ-9, GAD-7). This output is <strong>not a medical or psychiatric diagnosis</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-navy-900 border border-slate-300 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-teal-600" />
            <span>Download Report</span>
          </button>
          <button
            onClick={handlePrint}
            className="p-2 text-slate-600 hover:text-navy-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors"
            title="Print Assessment Sheet"
            aria-label="Print Report"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Header Summary Card */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 rounded-2xl p-6 sm:p-8 text-white shadow-elevated border border-navy-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-semibold text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                Evaluation Ref: {latestResult.id}
              </span>
              <span className="text-xs text-slate-400">
                Generated: {new Date(latestResult.timestamp).toLocaleString()}
              </span>
              {latestResult.backendMeta?.syncedWithBackend ? (
                <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  FastAPI & SQLite Verified
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-slate-300 bg-slate-700/50 px-2 py-0.5 rounded-md border border-slate-600">
                  Local Psychometric Calculation
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Patient Screening Profile & Risk Stratification
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Derived from multimodal psychometric batteries and demographic indicators. Standardized clinical scoring categorizes affective risk levels across Depression, Anxiety, and Stress.
            </p>
          </div>

          {/* Primary Alert Box */}
          <div className="bg-navy-900/90 border border-navy-700 p-4 rounded-xl shrink-0 flex items-center gap-4">
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Overall Triage Band
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-bold text-white">
                  {latestResult.overallRiskSummary.primaryConcern !== 'None'
                    ? `${latestResult.overallRiskSummary.primaryConcern}`
                    : 'Low Symptom Risk'}
                </span>
                <Badge
                  label={latestResult.overallRiskSummary.highestSeverity}
                  severity={latestResult.overallRiskSummary.highestSeverity}
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Disorder Cards: Depression, Anxiety, Stress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-900">
            Tri-Factor Affective Condition Breakdown
          </h2>
          <span className="text-xs text-slate-500">
            Click any tab below to inspect detailed class probabilities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Depression Card */}
          <div
            onClick={() => setSelectedDisorder('Depression')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedDisorder === 'Depression'
                ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                <Activity className="w-5 h-5" />
              </div>
              <Badge
                label={latestResult.predictions.depression.severity}
                severity={latestResult.predictions.depression.severity}
                size="md"
              />
            </div>

            <h3 className="text-base font-bold text-navy-900">Depression</h3>
            <p className="text-[11px] text-slate-500 font-medium">PHQ-9 & DASS-21 Subscale</p>

            <div className="my-3 py-2 px-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-baseline">
              <span className="text-xs text-slate-600">Screening Score</span>
              <span className="text-base font-extrabold text-navy-900">
                {latestResult.predictions.depression.score}{' '}
                <span className="text-xs font-normal text-slate-400">/ 27</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {latestResult.predictions.depression.interpretation}
            </p>
          </div>

          {/* Anxiety Card */}
          <div
            onClick={() => setSelectedDisorder('Anxiety')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedDisorder === 'Anxiety'
                ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
                <HeartPulse className="w-5 h-5" />
              </div>
              <Badge
                label={latestResult.predictions.anxiety.severity}
                severity={latestResult.predictions.anxiety.severity}
                size="md"
              />
            </div>

            <h3 className="text-base font-bold text-navy-900">Anxiety</h3>
            <p className="text-[11px] text-slate-500 font-medium">GAD-7 & DASS-21 Subscale</p>

            <div className="my-3 py-2 px-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-baseline">
              <span className="text-xs text-slate-600">Screening Score</span>
              <span className="text-base font-extrabold text-navy-900">
                {latestResult.predictions.anxiety.score}{' '}
                <span className="text-xs font-normal text-slate-400">/ 21</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {latestResult.predictions.anxiety.interpretation}
            </p>
          </div>

          {/* Stress Card */}
          <div
            onClick={() => setSelectedDisorder('Stress')}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              selectedDisorder === 'Stress'
                ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                <Brain className="w-5 h-5" />
              </div>
              <Badge
                label={latestResult.predictions.stress.severity}
                severity={latestResult.predictions.stress.severity}
                size="md"
              />
            </div>

            <h3 className="text-base font-bold text-navy-900">Stress</h3>
            <p className="text-[11px] text-slate-500 font-medium">DASS-21 Stress Subscale</p>

            <div className="my-3 py-2 px-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-baseline">
              <span className="text-xs text-slate-600">Screening Score</span>
              <span className="text-base font-extrabold text-navy-900">
                {latestResult.predictions.stress.score}{' '}
                <span className="text-xs font-normal text-slate-400">/ 21</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {latestResult.predictions.stress.interpretation}
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Class Probability Distribution Chart */}
      <Card
        title={`Multi-Class Probability Distribution: ${selectedDisorder}`}
        subtitle="Simulated Softmax class probabilities across severity bands (Deep Learning Architecture Placeholder)"
        action={
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            {(['Depression', 'Anxiety', 'Stress'] as DisorderType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedDisorder(type)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  selectedDisorder === type
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        }
      >
        <div className="space-y-4">
          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="severity"
                  tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  unit="%"
                  domain={[0, 100]}
                  tick={{ fill: '#475569', fontSize: 11 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Class Probability']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    borderColor: '#cbd5e1',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="probability" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                Visual representation of Softmax distribution placeholder. Verified psychometric scoring is active.
              </span>
            </div>
            <span className="font-semibold text-navy-900 bg-navy-50 border border-navy-100 px-2 py-0.5 rounded text-[11px]">
              Module 2 API Contract Verified • ML Weights in Module 3
            </span>
          </div>
        </div>
      </Card>

      {/* Detailed Assessment Summary & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Context & Subscale Breakdown */}
        <Card title="Patient Context & Subscale Scores" subtitle="Demographic indicators and psychometric sub-totals">
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400">Age & Gender:</span>
                <p className="font-semibold text-navy-900 mt-0.5">
                  {latestResult.patientData.age} yrs • {latestResult.patientData.gender}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Occupation:</span>
                <p className="font-semibold text-navy-900 mt-0.5">
                  {latestResult.patientData.occupation || 'Unspecified'}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Sleep Duration:</span>
                <p className="font-semibold text-navy-900 mt-0.5">
                  {latestResult.patientData.sleepHours} hrs / night
                </p>
              </div>
              <div>
                <span className="text-slate-400">Physical Activity:</span>
                <p className="font-semibold text-navy-900 mt-0.5">
                  {latestResult.patientData.physicalActivityDays} days / week
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-navy-900 text-xs">Individual Scale Scores:</p>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">PHQ-9 Depression Score</span>
                  <span className="font-bold text-navy-900">{latestResult.scores.phq9Total} / 27</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">GAD-7 Anxiety Score</span>
                  <span className="font-bold text-navy-900">{latestResult.scores.gad7Total} / 21</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">DASS-21 Depression Subscale</span>
                  <span className="font-bold text-navy-900">{latestResult.scores.dass21Depression} / 21</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">DASS-21 Anxiety Subscale</span>
                  <span className="font-bold text-navy-900">{latestResult.scores.dass21Anxiety} / 21</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50">
                  <span className="text-slate-600">DASS-21 Stress Subscale</span>
                  <span className="font-bold text-navy-900">{latestResult.scores.dass21Stress} / 21</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Clinical Interpretation & Recommended Actions */}
        <Card title="Clinical Summary & Action Plan" subtitle="Algorithmic guidance for triage and decision support">
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-teal-50/60 border border-teal-200/80 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-teal-900">
                <Info className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Primary Clinical Interpretation</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {disorderData.interpretation}
              </p>
            </div>

            <div>
              <p className="font-semibold text-navy-900 mb-2">Recommended Next Steps:</p>
              <ul className="space-y-2">
                {latestResult.overallRiskSummary.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 leading-relaxed">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <div className="flex items-start gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-[11px]">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Always cross-validate questionnaire answers with longitudinal clinical interviews and history.
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Page Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Link
          to="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Clinical Report</span>
          </button>

          <Link
            to="/assessment"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Assessment</span>
          </Link>
        </div>
      </div>

      {/* Download Report Modal (UI Only) */}
      {downloadSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
              <Download className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-navy-900">
                Clinical Report Ready
              </h3>
              <p className="text-xs text-slate-500">
                Patient Assessment Log: {latestResult.id}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p><strong>Format:</strong> Electronic Assessment Record (PDF/Print View)</p>
              <p><strong>Primary Concern:</strong> {latestResult.overallRiskSummary.primaryConcern}</p>
              <p><strong>Severity:</strong> {latestResult.overallRiskSummary.highestSeverity}</p>
              <p><strong>Status:</strong> Generated for academic screening & clinician review</p>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              (UI Only feature — to save or print this report, use your browser's Print to PDF option).
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDownloadSuccessModal(false);
                  window.print();
                }}
                className="flex-1 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Print to PDF Now
              </button>
              <button
                onClick={() => setDownloadSuccessModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
