import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Download,
  Printer,
  Check,
  X,
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
    <div className="space-y-6 py-6 max-w-5xl mx-auto">
      {/* Medical Disclaimer Banner */}
      <div className="bg-zinc-50 border border-charcoal-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-charcoal-700 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-charcoal-900">Preliminary Screening Notice: </span>
            <span className="text-charcoal-600">
              The classifications and probability estimates below are preliminary screening indications computed for research purposes. They do not constitute clinical diagnoses.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-50 text-charcoal-800 border border-charcoal-200 rounded text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-charcoal-500" />
            <span>Download Report</span>
          </button>
          <button
            onClick={handlePrint}
            className="p-1.5 text-charcoal-500 hover:text-charcoal-800 bg-white hover:bg-zinc-50 border border-charcoal-200 rounded transition-colors"
            title="Print Assessment Sheet"
            aria-label="Print Report"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Header Summary Card */}
      <div className="bg-white border border-charcoal-200 rounded-lg p-5 sm:p-6 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono text-charcoal-500 bg-zinc-100 px-2 py-0.5 rounded">
                Ref: {latestResult.id}
              </span>
              <span className="text-xs text-charcoal-400">
                {new Date(latestResult.timestamp).toLocaleDateString()}
              </span>
              {latestResult.backendMeta?.syncedWithBackend ? (
                <span className="text-[11px] font-mono text-sage-800 bg-sage-50 px-2 py-0.5 rounded border border-sage-200 flex items-center gap-1">
                  <Check className="w-3 h-3 text-sage-700" />
                  FastAPI Verified
                </span>
              ) : (
                <span className="text-[11px] font-mono text-charcoal-500 bg-zinc-100 px-2 py-0.5 rounded">
                  Local Calculation
                </span>
              )}
            </div>
            <h1 className="text-lg font-semibold text-charcoal-900 tracking-tight">
              Screening Results & Risk Stratification
            </h1>
            <p className="text-xs text-charcoal-500 max-w-xl">
              Multimodal screening summary across Depression, Anxiety, and Stress dimensions.
            </p>
          </div>

          <div className="bg-zinc-50 border border-charcoal-200 p-3 rounded-lg shrink-0">
            <div className="text-[11px] text-charcoal-500 font-medium uppercase tracking-wider mb-1">
              Primary Concern
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-charcoal-900">
                {latestResult.overallRiskSummary.primaryConcern !== 'None'
                  ? latestResult.overallRiskSummary.primaryConcern
                  : 'Low Risk Profile'}
              </span>
              <Badge
                label={latestResult.overallRiskSummary.highestSeverity}
                severity={latestResult.overallRiskSummary.highestSeverity}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Condition Cards: Depression, Anxiety, Stress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-charcoal-500">
          <h2 className="font-semibold text-charcoal-900 text-sm">
            Condition Breakdown
          </h2>
          <span>Select a category to view probability distribution</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Depression Card */}
          <div
            onClick={() => setSelectedDisorder('Depression')}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedDisorder === 'Depression'
                ? 'bg-white border-charcoal-900 shadow-subtle'
                : 'bg-white border-charcoal-200 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-charcoal-900">Depression</h3>
                <p className="text-[11px] text-charcoal-500">PHQ-9 & DASS-21</p>
              </div>
              <Badge
                label={latestResult.predictions.depression.severity}
                severity={latestResult.predictions.depression.severity}
                size="sm"
              />
            </div>

            <div className="my-2.5 py-1.5 px-2.5 bg-zinc-50 rounded border border-charcoal-200 flex justify-between items-baseline text-xs">
              <span className="text-charcoal-600">Raw Score</span>
              <span className="font-semibold text-charcoal-900">
                {latestResult.predictions.depression.score}{' '}
                <span className="font-normal text-charcoal-400">/ 27</span>
              </span>
            </div>

            <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
              {latestResult.predictions.depression.interpretation}
            </p>
          </div>

          {/* Anxiety Card */}
          <div
            onClick={() => setSelectedDisorder('Anxiety')}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedDisorder === 'Anxiety'
                ? 'bg-white border-charcoal-900 shadow-subtle'
                : 'bg-white border-charcoal-200 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-charcoal-900">Anxiety</h3>
                <p className="text-[11px] text-charcoal-500">GAD-7 & DASS-21</p>
              </div>
              <Badge
                label={latestResult.predictions.anxiety.severity}
                severity={latestResult.predictions.anxiety.severity}
                size="sm"
              />
            </div>

            <div className="my-2.5 py-1.5 px-2.5 bg-zinc-50 rounded border border-charcoal-200 flex justify-between items-baseline text-xs">
              <span className="text-charcoal-600">Raw Score</span>
              <span className="font-semibold text-charcoal-900">
                {latestResult.predictions.anxiety.score}{' '}
                <span className="font-normal text-charcoal-400">/ 21</span>
              </span>
            </div>

            <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
              {latestResult.predictions.anxiety.interpretation}
            </p>
          </div>

          {/* Stress Card */}
          <div
            onClick={() => setSelectedDisorder('Stress')}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedDisorder === 'Stress'
                ? 'bg-white border-charcoal-900 shadow-subtle'
                : 'bg-white border-charcoal-200 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-charcoal-900">Stress</h3>
                <p className="text-[11px] text-charcoal-500">DASS-21 Subscale</p>
              </div>
              <Badge
                label={latestResult.predictions.stress.severity}
                severity={latestResult.predictions.stress.severity}
                size="sm"
              />
            </div>

            <div className="my-2.5 py-1.5 px-2.5 bg-zinc-50 rounded border border-charcoal-200 flex justify-between items-baseline text-xs">
              <span className="text-charcoal-600">Raw Score</span>
              <span className="font-semibold text-charcoal-900">
                {latestResult.predictions.stress.score}{' '}
                <span className="font-normal text-charcoal-400">/ 21</span>
              </span>
            </div>

            <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
              {latestResult.predictions.stress.interpretation}
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Class Probability Distribution Chart */}
      <Card
        title={`Probability Distribution: ${selectedDisorder}`}
        subtitle="Illustrative Softmax probabilities across severity strata (Module 3 prediction contract ready)"
        action={
          <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded">
            {(['Depression', 'Anxiety', 'Stress'] as DisorderType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedDisorder(type)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  selectedDisorder === type
                    ? 'bg-white text-charcoal-900 shadow-xs font-semibold'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        }
      >
        <div className="space-y-3">
          <div className="h-56 sm:h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 16, left: -16, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="2 2" stroke="#e4e4e7" vertical={false} />
                <XAxis
                  dataKey="severity"
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  axisLine={{ stroke: '#e4e4e7' }}
                  tickLine={false}
                />
                <YAxis
                  unit="%"
                  domain={[0, 100]}
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  axisLine={{ stroke: '#e4e4e7' }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Probability']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '6px',
                    borderColor: '#e4e4e7',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-zinc-50 border border-charcoal-200 rounded text-xs text-charcoal-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>
              Validated psychometric scores active. Softmax distribution reflects preliminary severity probability.
            </span>
            <span className="font-mono text-[10px] text-charcoal-600 bg-white border border-charcoal-200 px-2 py-0.5 rounded shrink-0">
              Contract Verified • Module 3 Ready
            </span>
          </div>
        </div>
      </Card>

      {/* Detailed Assessment Summary & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Patient Context & Subscale Breakdown */}
        <Card title="Patient Profile & Scale Scores" subtitle="Demographic inputs and instrument sub-totals">
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 p-3 bg-zinc-50 rounded border border-charcoal-200">
              <div>
                <span className="text-charcoal-400">Demographics:</span>
                <p className="font-medium text-charcoal-900 mt-0.5">
                  {latestResult.patientData.age} yrs • {latestResult.patientData.gender}
                </p>
              </div>
              <div>
                <span className="text-charcoal-400">Occupation:</span>
                <p className="font-medium text-charcoal-900 mt-0.5">
                  {latestResult.patientData.occupation || 'Unspecified'}
                </p>
              </div>
              <div>
                <span className="text-charcoal-400">Sleep:</span>
                <p className="font-medium text-charcoal-900 mt-0.5">
                  {latestResult.patientData.sleepHours} hrs / night
                </p>
              </div>
              <div>
                <span className="text-charcoal-400">Activity:</span>
                <p className="font-medium text-charcoal-900 mt-0.5">
                  {latestResult.patientData.physicalActivityDays} days / week
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center p-2 rounded bg-zinc-50 border border-charcoal-200">
                <span className="text-charcoal-600">PHQ-9 Depression</span>
                <span className="font-semibold text-charcoal-900">{latestResult.scores.phq9Total} / 27</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-zinc-50 border border-charcoal-200">
                <span className="text-charcoal-600">GAD-7 Anxiety</span>
                <span className="font-semibold text-charcoal-900">{latestResult.scores.gad7Total} / 21</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-zinc-50 border border-charcoal-200">
                <span className="text-charcoal-600">DASS-21 Depression Subscale</span>
                <span className="font-semibold text-charcoal-900">{latestResult.scores.dass21Depression} / 21</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-zinc-50 border border-charcoal-200">
                <span className="text-charcoal-600">DASS-21 Anxiety Subscale</span>
                <span className="font-semibold text-charcoal-900">{latestResult.scores.dass21Anxiety} / 21</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-zinc-50 border border-charcoal-200">
                <span className="text-charcoal-600">DASS-21 Stress Subscale</span>
                <span className="font-semibold text-charcoal-900">{latestResult.scores.dass21Stress} / 21</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Clinical Summary & Recommendations */}
        <Card title="Clinical Summary & Action Plan" subtitle="Guidance based on screening severity indicators">
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-zinc-50 border border-charcoal-200 rounded space-y-1">
              <span className="font-semibold text-charcoal-900 block">Interpretation:</span>
              <p className="text-charcoal-600 leading-relaxed">
                {disorderData.interpretation}
              </p>
            </div>

            <div>
              <span className="font-semibold text-charcoal-900 block mb-1.5">Recommended Actions:</span>
              <ul className="space-y-1.5">
                {latestResult.overallRiskSummary.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-charcoal-600 leading-relaxed">
                    <span className="text-sage-800 font-bold shrink-0">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Page Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-charcoal-200">
        <Link
          to="/dashboard"
          className="text-xs text-charcoal-600 hover:text-charcoal-900 font-medium"
        >
          ← Return to Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="px-3.5 py-2 bg-white hover:bg-zinc-50 text-charcoal-700 border border-charcoal-200 rounded text-xs font-medium transition-colors"
          >
            Download Report
          </button>

          <Link
            to="/assessment"
            className="px-3.5 py-2 bg-charcoal-900 hover:bg-charcoal-800 text-white rounded text-xs font-medium transition-colors"
          >
            New Assessment
          </Link>
        </div>
      </div>

      {/* Download Report Modal */}
      {downloadSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/50">
          <div className="bg-white rounded-lg max-w-sm w-full p-5 border border-charcoal-200 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-charcoal-200 pb-2">
              <h3 className="text-xs font-semibold text-charcoal-900">
                Assessment Report
              </h3>
              <button
                onClick={() => setDownloadSuccessModal(false)}
                className="text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5 text-xs text-charcoal-600">
              <p><strong className="text-charcoal-900">Assessment ID:</strong> {latestResult.id}</p>
              <p><strong className="text-charcoal-900">Primary Concern:</strong> {latestResult.overallRiskSummary.primaryConcern}</p>
              <p><strong className="text-charcoal-900">Highest Severity:</strong> {latestResult.overallRiskSummary.highestSeverity}</p>
              <p className="text-[11px] text-charcoal-500 pt-1">
                To save as PDF, click "Print to PDF" and select Destination as "Save as PDF".
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setDownloadSuccessModal(false);
                  window.print();
                }}
                className="flex-1 py-1.5 bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-medium rounded transition-colors"
              >
                Print to PDF
              </button>
              <button
                onClick={() => setDownloadSuccessModal(false)}
                className="px-3 py-1.5 border border-zinc-200 text-charcoal-600 hover:bg-zinc-50 text-xs rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
