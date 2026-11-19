import type { QuestionnaireScale } from '../types';

/**
 * Official Patient Health Questionnaire-9 (PHQ-9)
 * Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues.
 * Standard clinical assessment for depression severity.
 */
export const phq9Scale: QuestionnaireScale = {
  id: 'phq9',
  name: 'PHQ-9',
  title: 'Patient Health Questionnaire-9 (Depression Screening)',
  instruction: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
  timeframe: 'Past 2 weeks',
  options: [
    { label: 'Not at all', value: 0 },
    { label: 'Several days', value: 1 },
    { label: 'More than half the days', value: 2 },
    { label: 'Nearly every day', value: 3 },
  ],
  questions: [
    { id: 1, text: 'Little interest or pleasure in doing things' },
    { id: 2, text: 'Feeling down, depressed, or hopeless' },
    { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much' },
    { id: 4, text: 'Feeling tired or having little energy' },
    { id: 5, text: 'Poor appetite or overeating' },
    { id: 6, text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down' },
    { id: 7, text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
    { id: 8, text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual' },
    { id: 9, text: 'Thoughts that you would be better off dead, or of hurting yourself in some way' },
  ],
};
