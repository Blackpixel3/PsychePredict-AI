import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AssessmentAnswers, AssessmentResult, PatientDemographics } from '../types';
import { DEFAULT_SAMPLE_RESULT } from '../data/mockData';
import { submitAssessmentToBackend, checkBackendHealth, checkPredictionContract } from '../services/api';

const INITIAL_DEMOGRAPHICS: PatientDemographics = {
  age: '',
  gender: '',
  occupation: '',
  sleepHours: '',
  physicalActivityDays: '',
  caffeineIntake: '',
  workStressLevel: '',
};

interface AssessmentContextType {
  answers: AssessmentAnswers;
  setDemographics: (data: Partial<PatientDemographics>) => void;
  setPhq9Answer: (questionId: number, value: number) => void;
  setGad7Answer: (questionId: number, value: number) => void;
  setDass21Answer: (questionId: number, value: number) => void;
  fillSampleAnswers: () => void;
  resetAnswers: () => void;
  latestResult: AssessmentResult;
  isSubmitting: boolean;
  submitAssessment: () => Promise<AssessmentResult>;
  setLatestResult: (res: AssessmentResult) => void;
  backendConnected: boolean;
  backendMessage: string;
  refreshBackendStatus: () => Promise<void>;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<AssessmentAnswers>(() => {
    const saved = localStorage.getItem('psyche_current_answers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return {
      demographics: INITIAL_DEMOGRAPHICS,
      phq9: {},
      gad7: {},
      dass21: {},
    };
  });

  const [latestResult, setLatestResult] = useState<AssessmentResult>(() => {
    const saved = localStorage.getItem('psyche_latest_result');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return DEFAULT_SAMPLE_RESULT;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [backendMessage, setBackendMessage] = useState('Checking backend status...');

  const refreshBackendStatus = useCallback(async () => {
    const health = await checkBackendHealth();
    setBackendConnected(health.online);
    if (health.online && health.data) {
      setBackendMessage(`FastAPI Backend Connected (${health.data.database})`);
    } else {
      setBackendMessage(health.error || 'FastAPI backend unavailable (Offline Mode)');
    }
  }, []);

  useEffect(() => {
    refreshBackendStatus();
    const interval = setInterval(refreshBackendStatus, 15000);
    return () => clearInterval(interval);
  }, [refreshBackendStatus]);

  useEffect(() => {
    localStorage.setItem('psyche_current_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('psyche_latest_result', JSON.stringify(latestResult));
  }, [latestResult]);

  const setDemographics = (data: Partial<PatientDemographics>) => {
    setAnswers((prev) => ({
      ...prev,
      demographics: { ...prev.demographics, ...data },
    }));
  };

  const setPhq9Answer = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      phq9: { ...prev.phq9, [questionId]: value },
    }));
  };

  const setGad7Answer = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      gad7: { ...prev.gad7, [questionId]: value },
    }));
  };

  const setDass21Answer = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      dass21: { ...prev.dass21, [questionId]: value },
    }));
  };

  const fillSampleAnswers = () => {
    setAnswers({
      demographics: {
        age: 27,
        gender: 'female',
        occupation: 'Software Engineer',
        sleepHours: 6,
        physicalActivityDays: 2,
        caffeineIntake: 'moderate',
        workStressLevel: 4,
      },
      phq9: {
        1: 2, 2: 2, 3: 1, 4: 2, 5: 1, 6: 2, 7: 1, 8: 0, 9: 0,
      },
      gad7: {
        1: 2, 2: 1, 3: 2, 4: 2, 5: 1, 6: 1, 7: 0,
      },
      dass21: {
        1: 2, 2: 1, 3: 2, 4: 1, 5: 2, 6: 1, 7: 0,
        8: 2, 9: 1, 10: 1, 11: 2, 12: 2, 13: 2, 14: 1,
        15: 1, 16: 2, 17: 1, 18: 1, 19: 1, 20: 0, 21: 1,
      },
    });
  };

  const resetAnswers = () => {
    setAnswers({
      demographics: INITIAL_DEMOGRAPHICS,
      phq9: {},
      gad7: {},
      dass21: {},
    });
  };

  const submitAssessment = async (): Promise<AssessmentResult> => {
    setIsSubmitting(true);
    try {
      const res = await submitAssessmentToBackend(answers);
      setLatestResult(res);
      // Also probe the prediction contract to ensure Module 3 readiness
      try {
        await checkPredictionContract(res.id);
      } catch {
        // non-blocking
      }
      return res;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        setDemographics,
        setPhq9Answer,
        setGad7Answer,
        setDass21Answer,
        fillSampleAnswers,
        resetAnswers,
        latestResult,
        isSubmitting,
        submitAssessment,
        setLatestResult,
        backendConnected,
        backendMessage,
        refreshBackendStatus,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
