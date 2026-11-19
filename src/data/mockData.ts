import type { AssessmentResult, RecentAssessmentItem, SeverityLevel, DisorderPrediction, PatientDemographics } from '../types';

export const SEVERITY_COLORS: Record<SeverityLevel, { bg: string; text: string; border: string; bar: string }> = {
  'Normal': {
    bg: 'bg-emerald-50/70',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    bar: '#2e6153',
  },
  'Mild': {
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-200',
    bar: '#64748b',
  },
  'Moderate': {
    bg: 'bg-amber-50',
    text: 'text-amber-850',
    border: 'border-amber-200',
    bar: '#b45309',
  },
  'Severe': {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    border: 'border-orange-200',
    bar: '#c2410c',
  },
  'Extremely Severe': {
    bg: 'bg-rose-50',
    text: 'text-rose-900',
    border: 'border-rose-200',
    bar: '#9f1239',
  },
};

export const RECENT_ASSESSMENTS_MOCK: RecentAssessmentItem[] = [
  {
    id: 'ASM-2026-0891',
    patientCode: 'PT-4109',
    date: '2026-03-24',
    age: 28,
    gender: 'Female',
    depressionSeverity: 'Moderate',
    anxietySeverity: 'Mild',
    stressSeverity: 'Severe',
    status: 'Completed',
  },
  {
    id: 'ASM-2026-0890',
    patientCode: 'PT-3892',
    date: '2026-03-23',
    age: 34,
    gender: 'Male',
    depressionSeverity: 'Normal',
    anxietySeverity: 'Normal',
    stressSeverity: 'Mild',
    status: 'Completed',
  },
  {
    id: 'ASM-2026-0889',
    patientCode: 'PT-7611',
    date: '2026-03-22',
    age: 22,
    gender: 'Female',
    depressionSeverity: 'Severe',
    anxietySeverity: 'Severe',
    stressSeverity: 'Extremely Severe',
    status: 'Flagged',
  },
  {
    id: 'ASM-2026-0888',
    patientCode: 'PT-5203',
    date: '2026-03-21',
    age: 41,
    gender: 'Male',
    depressionSeverity: 'Mild',
    anxietySeverity: 'Moderate',
    stressSeverity: 'Moderate',
    status: 'Completed',
  },
  {
    id: 'ASM-2026-0887',
    patientCode: 'PT-1944',
    date: '2026-03-20',
    age: 29,
    gender: 'Prefer not to say',
    depressionSeverity: 'Normal',
    anxietySeverity: 'Mild',
    stressSeverity: 'Normal',
    status: 'Completed',
  },
];

/**
 * Standard Psychometric Severity Calculator for Preliminary Screening Scoring
 */
export function calculatePreliminaryResults(
  demographics: PatientDemographics,
  phq9Answers: Record<number, number>,
  gad7Answers: Record<number, number>,
  dass21Answers: Record<number, number>
): AssessmentResult {
  // Sum PHQ-9
  const phq9Total = Object.values(phq9Answers).reduce((a, b) => a + b, 0);

  // Sum GAD-7
  const gad7Total = Object.values(gad7Answers).reduce((a, b) => a + b, 0);

  // Sum DASS-21 subscales
  const dassDepIds = [3, 5, 10, 13, 16, 17, 21];
  const dassAnxIds = [2, 4, 7, 9, 15, 19, 20];
  const dassStrIds = [1, 6, 8, 11, 12, 14, 18];

  const dass21Depression = dassDepIds.reduce((sum, id) => sum + (dass21Answers[id] ?? 0), 0);
  const dass21Anxiety = dassAnxIds.reduce((sum, id) => sum + (dass21Answers[id] ?? 0), 0);
  const dass21Stress = dassStrIds.reduce((sum, id) => sum + (dass21Answers[id] ?? 0), 0);

  // Determine Severity Levels
  let depSeverity: SeverityLevel = 'Normal';
  if (phq9Total >= 20 || dass21Depression >= 14) depSeverity = 'Extremely Severe';
  else if (phq9Total >= 15 || dass21Depression >= 11) depSeverity = 'Severe';
  else if (phq9Total >= 10 || dass21Depression >= 7) depSeverity = 'Moderate';
  else if (phq9Total >= 5 || dass21Depression >= 5) depSeverity = 'Mild';

  let anxSeverity: SeverityLevel = 'Normal';
  if (gad7Total >= 15 || dass21Anxiety >= 10) anxSeverity = 'Extremely Severe';
  else if (gad7Total >= 12 || dass21Anxiety >= 8) anxSeverity = 'Severe';
  else if (gad7Total >= 8 || dass21Anxiety >= 6) anxSeverity = 'Moderate';
  else if (gad7Total >= 5 || dass21Anxiety >= 4) anxSeverity = 'Mild';

  let strSeverity: SeverityLevel = 'Normal';
  if (dass21Stress >= 17) strSeverity = 'Extremely Severe';
  else if (dass21Stress >= 13) strSeverity = 'Severe';
  else if (dass21Stress >= 10) strSeverity = 'Moderate';
  else if (dass21Stress >= 8) strSeverity = 'Mild';

  // Multi-Class Distribution simulation (Static illustrative values matching the score range)
  const buildProbabilities = (score: number, maxScore: number, currentSev: SeverityLevel) => {
    const ratio = Math.min(1, Math.max(0, score / maxScore));
    const classes: SeverityLevel[] = ['Normal', 'Mild', 'Moderate', 'Severe', 'Extremely Severe'];
    const targetIdx = classes.indexOf(currentSev);

    const probs = classes.map((label, idx) => {
      let weight = Math.max(0.04, 1 - Math.abs(targetIdx - idx) * 0.35);
      if (idx === targetIdx) weight = 0.62 + (ratio * 0.1);
      return {
        label,
        probability: Math.round(weight * 100),
        color: SEVERITY_COLORS[label].bar,
      };
    });

    // Normalize to 100%
    const total = probs.reduce((acc, p) => acc + p.probability, 0);
    return probs.map(p => ({
      ...p,
      probability: Math.round((p.probability / total) * 100),
    }));
  };

  const depressionPred: DisorderPrediction = {
    type: 'Depression',
    score: phq9Total,
    maxScore: 27,
    scaleUsed: 'PHQ-9 & DASS-21 Subscale',
    severity: depSeverity,
    riskPercent: Math.round((phq9Total / 27) * 100),
    probabilities: buildProbabilities(phq9Total, 27, depSeverity),
    interpretation:
      depSeverity === 'Normal'
        ? 'Symptom indications are within the normal baseline spectrum. No significant depressive pathology is indicated.'
        : depSeverity === 'Mild'
        ? 'Mild depressive symptoms reported. Recommend regular sleep hygiene and lifestyle stress management.'
        : depSeverity === 'Moderate'
        ? 'Moderate depressive symptoms detected. Clinical consultation and psychoeducational support are advised.'
        : 'Substantial depressive symptom indicators detected. Structured professional mental health evaluation is strongly recommended.',
    clinicalNotes: [
      `PHQ-9 screening score: ${phq9Total} / 27`,
      `DASS-21 Depression subscale: ${dass21Depression} / 21`,
      'Primary screening indicators reflect mood, hedonic tone, and subjective energy levels.',
    ],
  };

  const anxietyPred: DisorderPrediction = {
    type: 'Anxiety',
    score: gad7Total,
    maxScore: 21,
    scaleUsed: 'GAD-7 & DASS-21 Subscale',
    severity: anxSeverity,
    riskPercent: Math.round((gad7Total / 21) * 100),
    probabilities: buildProbabilities(gad7Total, 21, anxSeverity),
    interpretation:
      anxSeverity === 'Normal'
        ? 'Anxiety symptoms are within asymptomatic or minimal baseline levels.'
        : anxSeverity === 'Mild'
        ? 'Mild nervousness or situational anxiety reported. Monitoring and relaxation exercises are appropriate.'
        : anxSeverity === 'Moderate'
        ? 'Moderate generalized anxiety symptoms indicated. Consider mindfulness interventions or specialized assessment.'
        : 'Elevated anxiety indicators observed with somatic and cognitive worry components. Professional guidance is advised.',
    clinicalNotes: [
      `GAD-7 screening score: ${gad7Total} / 21`,
      `DASS-21 Anxiety subscale: ${dass21Anxiety} / 21`,
      'Primary screening indicators assess autonomic arousal, apprehension, and restlessness.',
    ],
  };

  const stressPred: DisorderPrediction = {
    type: 'Stress',
    score: dass21Stress,
    maxScore: 21,
    scaleUsed: 'DASS-21 Stress Subscale',
    severity: strSeverity,
    riskPercent: Math.round((dass21Stress / 21) * 100),
    probabilities: buildProbabilities(dass21Stress, 21, strSeverity),
    interpretation:
      strSeverity === 'Normal'
        ? 'Stress tension is well regulated within standard physiological parameters.'
        : strSeverity === 'Mild'
        ? 'Mild tension and difficulty relaxing observed. Pacing and workload balancing recommended.'
        : strSeverity === 'Moderate'
        ? 'Moderate chronic stress patterns noted. Ergonomic and behavioral stress-reduction advised.'
        : 'High stress arousal state detected. Comprehensive recovery strategy and professional consultation suggested.',
    clinicalNotes: [
      `DASS-21 Stress subscore: ${dass21Stress} / 21`,
      'Primary screening indicators capture chronic non-specific arousal, irritability, and nervous tension.',
    ],
  };

  // Find highest severity
  const severityRank: Record<SeverityLevel, number> = {
    'Normal': 0,
    'Mild': 1,
    'Moderate': 2,
    'Severe': 3,
    'Extremely Severe': 4,
  };

  const disorders = [depressionPred, anxietyPred, stressPred];
  const sorted = [...disorders].sort((a, b) => severityRank[b.severity] - severityRank[a.severity]);
  const primaryConcern = sorted[0].severity === 'Normal' ? 'None' : sorted[0].type;
  const highestSeverity = sorted[0].severity;

  return {
    id: `ASM-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    patientData: demographics,
    scores: {
      phq9Total,
      gad7Total,
      dass21Depression,
      dass21Anxiety,
      dass21Stress,
    },
    predictions: {
      depression: depressionPred,
      anxiety: anxietyPred,
      stress: stressPred,
    },
    overallRiskSummary: {
      primaryConcern,
      highestSeverity,
      recommendedActions: [
        'Review preliminary indicators in conjunction with clinical history.',
        'Consider specialized clinical evaluation if moderate or severe indicators persist beyond two weeks.',
        'Implement evidence-based behavioral lifestyle interventions: sleep hygiene, routine exercise, and structured stress management.',
        'This assessment is a research screening estimate and does not constitute a definitive medical diagnosis.',
      ],
    },
  };
}

export const DEFAULT_SAMPLE_RESULT: AssessmentResult = calculatePreliminaryResults(
  {
    age: 26,
    gender: 'female',
    occupation: 'Software Engineer',
    sleepHours: 6,
    physicalActivityDays: 2,
    caffeineIntake: 'moderate',
    workStressLevel: 4,
  },
  { 1: 2, 2: 2, 3: 1, 4: 2, 5: 1, 6: 2, 7: 1, 8: 0, 9: 0 }, // PHQ-9 (Total: 11 - Moderate)
  { 1: 2, 2: 1, 3: 2, 4: 2, 5: 1, 6: 1, 7: 0 },             // GAD-7 (Total: 9 - Mild/Moderate)
  {
    1: 2, 2: 1, 3: 2, 4: 1, 5: 2, 6: 1, 7: 0,
    8: 2, 9: 1, 10: 1, 11: 2, 12: 2, 13: 2, 14: 1,
    15: 1, 16: 2, 17: 1, 18: 1, 19: 1, 20: 0, 21: 1,
  }
);
