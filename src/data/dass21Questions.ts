import type { QuestionnaireScale } from '../types';

/**
 * Official Depression, Anxiety and Stress Scale - 21 Items (DASS-21)
 * Developed by P.F. Lovibond & S.H. Lovibond (1995), Psychology Foundation of Australia.
 * Standard short-form version measuring the core symptoms of depression, anxiety, and stress.
 */
export const dass21Scale: QuestionnaireScale = {
  id: 'dass21',
  name: 'DASS-21',
  title: 'Depression Anxiety Stress Scales (DASS-21)',
  instruction: 'Please read each statement and select a rating which indicates how much the statement applied to you over the past week.',
  timeframe: 'Past week',
  options: [
    { label: 'Did not apply to me at all', value: 0, description: 'Never' },
    { label: 'Applied to me to some degree, or some of the time', value: 1, description: 'Sometimes' },
    { label: 'Applied to me to a considerable degree, or a good part of time', value: 2, description: 'Often' },
    { label: 'Applied to me very much, or most of the time', value: 3, description: 'Almost Always' },
  ],
  questions: [
    { id: 1, text: 'I found it hard to wind down', category: 'stress' },
    { id: 2, text: 'I was aware of dryness of my mouth', category: 'anxiety' },
    { id: 3, text: 'I couldn’t seem to experience any positive feeling at all', category: 'depression' },
    { id: 4, text: 'I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)', category: 'anxiety' },
    { id: 5, text: 'I found it difficult to work up the initiative to do things', category: 'depression' },
    { id: 6, text: 'I tended to over-react to situations', category: 'stress' },
    { id: 7, text: 'I experienced trembling (e.g., in the hands)', category: 'anxiety' },
    { id: 8, text: 'I felt that I was using a lot of nervous energy', category: 'stress' },
    { id: 9, text: 'I was worried about situations in which I might panic and make a fool of myself', category: 'anxiety' },
    { id: 10, text: 'I felt that I had nothing to look forward to', category: 'depression' },
    { id: 11, text: 'I found myself getting agitated', category: 'stress' },
    { id: 12, text: 'I found it difficult to relax', category: 'stress' },
    { id: 13, text: 'I felt down-hearted and blue', category: 'depression' },
    { id: 14, text: 'I was intolerant of anything that kept me from getting on with what I was doing', category: 'stress' },
    { id: 15, text: 'I felt I was close to panic', category: 'anxiety' },
    { id: 16, text: 'I was unable to become enthusiastic about anything', category: 'depression' },
    { id: 17, text: 'I felt I wasn’t worth much as a person', category: 'depression' },
    { id: 18, text: 'I felt that I was rather touchy', category: 'stress' },
    { id: 19, text: 'I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)', category: 'anxiety' },
    { id: 20, text: 'I felt scared without any good reason', category: 'anxiety' },
    { id: 21, text: 'I felt that life was meaningless', category: 'depression' },
  ],
};

export const DASS21_SUBGROUPS = {
  depression: [3, 5, 10, 13, 16, 17, 21],
  anxiety: [2, 4, 7, 9, 15, 19, 20],
  stress: [1, 6, 8, 11, 12, 14, 18],
};
