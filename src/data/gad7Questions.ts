import type { QuestionnaireScale } from '../types';

/**
 * Official Generalized Anxiety Disorder 7-item (GAD-7) scale
 * Developed by Drs. Robert L. Spitzer, Kurt Kroenke, Janet B.W. Williams, and Bernd Löwe.
 * Standard clinical assessment for anxiety severity.
 */
export const gad7Scale: QuestionnaireScale = {
  id: 'gad7',
  name: 'GAD-7',
  title: 'Generalized Anxiety Disorder-7 (Anxiety Screening)',
  instruction: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
  timeframe: 'Past 2 weeks',
  options: [
    { label: 'Not at all', value: 0 },
    { label: 'Several days', value: 1 },
    { label: 'More than half the days', value: 2 },
    { label: 'Nearly every day', value: 3 },
  ],
  questions: [
    { id: 1, text: 'Feeling nervous, anxious, or on edge' },
    { id: 2, text: 'Not being able to stop or control worrying' },
    { id: 3, text: 'Worrying too much about different things' },
    { id: 4, text: 'Trouble relaxing' },
    { id: 5, text: 'Being so restless that it is hard to sit still' },
    { id: 6, text: 'Becoming easily annoyed or irritable' },
    { id: 7, text: 'Feeling afraid, as if something awful might happen' },
  ],
};
