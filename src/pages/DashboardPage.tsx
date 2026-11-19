import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  FileText,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { RECENT_ASSESSMENTS_MOCK } from '../data/mockData';
import { useAssessment } from '../context/AssessmentContext';
import { getRecentAssessments } from '../services/api';
import type { RecentAssessmentItem } from '../types';

export const DashboardPage: React.FC = () => {
  const { latestResult } = useAssessment();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [assessmentsList, setAssessmentsList] = useState<RecentAssessmentItem[]>(RECENT_ASSESSMENTS_MOCK);

  useEffect(() => {
    getRecentAssessments().then((items) => {
      if (items && items.length > 0) {
        setAssessmentsList(items);
      }
    });
  }, []);

  const filteredAssessments =
    filterStatus === 'all'
      ? assessmentsList
      : assessmentsList.filter((item) => item.status.toLowerCase() === filterStatus);

  const conditionMetrics = [
    {
      title: 'Depression',
      instrument: 'PHQ-9 & DASS-21 Subscale',
      score: latestResult.scores.phq9Total,
      maxScore: 27,
      severity: latestResult.predictions.depression.severity,
      benchmark: 'Thresholds: 0-4 Normal, 5-9 Mild, 10-14 Mod, 15+ Severe',
    },
    {
      title: 'Anxiety',
      instrument: 'GAD-7 & DASS-21 Subscale',
      score: latestResult.scores.gad7Total,
      maxScore: 21,
      severity: latestResult.predictions.anxiety.severity,
      benchmark: 'Thresholds: 0-4 Normal, 5-9 Mild, 8-11 Mod, 12+ Severe',
    },
    {
      title: 'Stress',
      instrument: 'DASS-21 Stress Subscale',
      score: latestResult.scores.dass21Stress,
      maxScore: 21,
      severity: latestResult.predictions.stress.severity,
      benchmark: 'Thresholds: 0-7 Normal, 8-9 Mild, 10-12 Mod, 13+ Severe',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row -mx-4 sm:-mx-6 lg:-mx-8 min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 max-w-5xl space-y-5">
        {/* Clean Header Bar */}
        <div className="bg-white border border-charcoal-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-charcoal-500 bg-zinc-100 px-2 py-0.5 rounded">
                Active Session: {latestResult.id}
              </span>
            </div>
            <h1 className="text-lg font-semibold text-charcoal-900 tracking-tight">
              Clinical Assessment Dashboard
            </h1>
            <p className="text-xs text-charcoal-500">
              Overview of psychological screening records and current triage indicators.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-sage-800 hover:bg-sage-700 text-white font-medium text-xs rounded transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Intake</span>
            </Link>
            <Link
              to="/results"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-zinc-50 text-charcoal-700 font-medium text-xs rounded border border-charcoal-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-charcoal-500" />
              <span>View Report</span>
            </Link>
          </div>
        </div>

        {/* Assessment Overview Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-lg border border-charcoal-200 shadow-subtle">
            <span className="text-xs text-charcoal-500 block mb-1">Primary Dimension</span>
            <div className="text-sm font-semibold text-charcoal-900">
              {latestResult.overallRiskSummary.primaryConcern}
            </div>
            <span className="text-[11px] text-charcoal-400">Dominant indicator</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-charcoal-200 shadow-subtle">
            <span className="text-xs text-charcoal-500 block mb-1">Highest Severity</span>
            <div>
              <Badge
                label={latestResult.overallRiskSummary.highestSeverity}
                severity={latestResult.overallRiskSummary.highestSeverity}
                size="sm"
              />
            </div>
            <span className="text-[11px] text-charcoal-400 mt-1 block">Standardized tier</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-charcoal-200 shadow-subtle">
            <span className="text-xs text-charcoal-500 block mb-1">Screening Instruments</span>
            <div className="text-sm font-semibold text-charcoal-900">3 Validated Scales</div>
            <span className="text-[11px] text-charcoal-400">PHQ-9 • GAD-7 • DASS-21</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-charcoal-200 shadow-subtle">
            <span className="text-xs text-charcoal-500 block mb-1">Assessment Status</span>
            <div className="text-sm font-semibold text-charcoal-900">Evaluated</div>
            <span className="text-[11px] text-charcoal-400">Preliminary screening</span>
          </div>
        </div>

        {/* Three Compact Condition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {conditionMetrics.map((card) => (
            <Card key={card.title} className="p-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-900">{card.title}</h3>
                    <p className="text-[11px] text-charcoal-500">{card.instrument}</p>
                  </div>
                  <Badge label={card.severity} severity={card.severity} size="sm" />
                </div>

                <div className="bg-zinc-50 rounded p-2.5 border border-charcoal-200">
                  <div className="flex items-baseline justify-between mb-1.5 text-xs">
                    <span className="text-charcoal-600">Raw Score</span>
                    <span className="font-semibold text-charcoal-900">
                      {card.score} <span className="font-normal text-charcoal-400">/ {card.maxScore}</span>
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-sage-700 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (card.score / card.maxScore) * 100)}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-charcoal-400 leading-tight">
                  {card.benchmark}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-charcoal-200">
                <Link
                  to="/results"
                  className="text-xs font-medium text-charcoal-900 hover:text-sage-800 inline-flex items-center gap-1 transition-colors"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Assessment Records Section */}
        <Card
          title="Recent Assessment Logs"
          subtitle="Screening intake records stored for clinical audit and reference"
          action={
            <div className="flex items-center gap-1.5 text-xs text-charcoal-500 bg-zinc-50 border border-charcoal-200 px-2 py-1 rounded">
              <Filter className="w-3 h-3 text-charcoal-400" />
              <span>Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent text-charcoal-900 font-medium focus:outline-none text-xs"
              >
                <option value="all">All Logs</option>
                <option value="completed">Completed</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
          }
        >
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-charcoal-200 text-charcoal-500 font-medium text-[11px]">
                  <th className="py-2.5 px-4">Record ID</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Profile</th>
                  <th className="py-2.5 px-3">Depression</th>
                  <th className="py-2.5 px-3">Anxiety</th>
                  <th className="py-2.5 px-3">Stress</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-200">
                {filteredAssessments.map((row) => (
                  <tr key={row.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-medium text-charcoal-900 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="py-2.5 px-3 text-charcoal-600 whitespace-nowrap">
                      {row.patientCode}
                    </td>
                    <td className="py-2.5 px-3 text-charcoal-500 whitespace-nowrap font-mono text-[11px]">
                      {row.date}
                    </td>
                    <td className="py-2.5 px-3 text-charcoal-600 whitespace-nowrap">
                      {row.age}y • {row.gender}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <Badge label={row.depressionSeverity} severity={row.depressionSeverity} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <Badge label={row.anxietySeverity} severity={row.anxietySeverity} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <Badge label={row.stressSeverity} severity={row.stressSeverity} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-[11px] font-medium text-charcoal-600">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right whitespace-nowrap">
                      <Link
                        to="/results"
                        className="text-xs text-charcoal-900 hover:text-sage-800 font-medium"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
