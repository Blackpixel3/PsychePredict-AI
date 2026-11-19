import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  HeartPulse,
  Brain,
  PlusCircle,
  FileText,
  Clock,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Calendar,
  AlertCircle,
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

  const disorderCards = [
    {
      type: 'Depression',
      instrument: 'PHQ-9 & DASS-21 (D)',
      currentSeverity: latestResult.predictions.depression.severity,
      score: latestResult.scores.phq9Total,
      maxScore: 27,
      scaleName: 'PHQ-9 Score',
      benchmark: 'Cutoff: 0-4 Normal, 5-9 Mild, 10-14 Mod, 15+ Severe',
      icon: Activity,
      riskRatio: latestResult.predictions.depression.riskPercent,
    },
    {
      type: 'Anxiety',
      instrument: 'GAD-7 & DASS-21 (A)',
      currentSeverity: latestResult.predictions.anxiety.severity,
      score: latestResult.scores.gad7Total,
      maxScore: 21,
      scaleName: 'GAD-7 Score',
      benchmark: 'Cutoff: 0-4 Normal, 5-9 Mild, 8-11 Mod, 12+ Severe',
      icon: HeartPulse,
      riskRatio: latestResult.predictions.anxiety.riskPercent,
    },
    {
      type: 'Stress',
      instrument: 'DASS-21 (S) Subscale',
      currentSeverity: latestResult.predictions.stress.severity,
      score: latestResult.scores.dass21Stress,
      maxScore: 21,
      scaleName: 'DASS-21 Stress',
      benchmark: 'Cutoff: 0-7 Normal, 8-9 Mild, 10-12 Mod, 13+ Severe',
      icon: Brain,
      riskRatio: latestResult.predictions.stress.riskPercent,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row -mx-4 sm:-mx-6 lg:-mx-8 min-h-[calc(100vh-4rem)]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-6 text-white shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Active Assessment Session
              </span>
              <span className="text-xs text-slate-300">
                ID: {latestResult.id}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Clinical Assessment Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Multi-class screening overview for psychological disorder prediction. Monitor triage tiers across Depression, Anxiety, and Stress.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Assessment</span>
            </Link>
            <Link
              to="/results"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-700/80 hover:bg-navy-700 text-white font-medium text-xs rounded-xl border border-navy-600 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Full Report</span>
            </Link>
          </div>
        </div>

        {/* Assessment Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Primary Concern</span>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-lg font-bold text-navy-900">
              {latestResult.overallRiskSummary.primaryConcern}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Highest screening strata</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Peak Severity Tier</span>
              <Activity className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-lg font-bold">
              <Badge
                label={latestResult.overallRiskSummary.highestSeverity}
                severity={latestResult.overallRiskSummary.highestSeverity}
                size="md"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Calibrated psychometric tier</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Scales Completed</span>
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-lg font-bold text-navy-900">3 Batteries</div>
            <p className="text-[11px] text-slate-400 mt-0.5">PHQ-9 • GAD-7 • DASS-21</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Historical Records</span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-lg font-bold text-navy-900">
              {RECENT_ASSESSMENTS_MOCK.length + 1} Screenings
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Mock cohort dataset</p>
          </div>
        </div>

        {/* Disorder Cards: Depression, Anxiety, Stress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {disorderCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Card
                key={i}
                className="hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center border border-navy-100">
                      <Icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <Badge label={card.currentSeverity} severity={card.currentSeverity} size="md" />
                  </div>

                  <h3 className="text-base font-bold text-navy-900">{card.type}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-3">{card.instrument}</p>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-3">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs text-slate-600">{card.scaleName}</span>
                      <span className="text-base font-extrabold text-navy-900">
                        {card.score}{' '}
                        <span className="text-xs font-normal text-slate-400">/ {card.maxScore}</span>
                      </span>
                    </div>

                    {/* Progress representation */}
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-500 h-full rounded-full transition-all"
                        style={{ width: `${card.riskRatio}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug">{card.benchmark}</p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    to="/results"
                    className="font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>Inspect Probabilities</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] text-slate-400">
                    Est. Risk: {card.riskRatio}%
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Assessments Section (UI Only) */}
        <Card
          title="Recent Clinical Assessments (Cohort Screening Logs)"
          subtitle="Simulated intake records formatted for clinicians and researchers (UI Only — Mock Data)"
          action={
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-transparent font-medium text-navy-900 focus:outline-none"
                >
                  <option value="all">All Logs</option>
                  <option value="completed">Completed</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
            </div>
          }
        >
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-y border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-5 font-semibold">Assessment ID</th>
                  <th className="py-3 px-4 font-semibold">Patient Code</th>
                  <th className="py-3 px-4 font-semibold">Intake Date</th>
                  <th className="py-3 px-4 font-semibold">Demographics</th>
                  <th className="py-3 px-4 font-semibold">Depression</th>
                  <th className="py-3 px-4 font-semibold">Anxiety</th>
                  <th className="py-3 px-4 font-semibold">Stress</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssessments.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-navy-900 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {row.patientCode}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {row.date}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {row.age} yrs • {row.gender}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge label={row.depressionSeverity} severity={row.depressionSeverity} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge label={row.anxietySeverity} severity={row.anxietySeverity} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge label={row.stressSeverity} severity={row.stressSeverity} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          row.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <Link
                        to="/results"
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                      >
                        View Report
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
