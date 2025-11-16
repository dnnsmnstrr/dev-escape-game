import { useState, useCallback } from 'react';
import { Puzzle } from '../types';

export const usePuzzleSolver = (puzzle: Puzzle | null) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'hint' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateAnswer = useCallback(() => {
    if (!puzzle || !answer.trim()) return false;
    
    try {
      return puzzle.validator(answer.trim());
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  }, [puzzle, answer]);

  const submitAnswer = useCallback(async () => {
    if (!puzzle || !answer.trim()) {
      setFeedback({
        type: 'error',
        message: 'Please provide an answer before submitting.'
      });
      return false;
    }

    setIsSubmitting(true);
    
    // Simulate validation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const isCorrect = validateAnswer();
    
    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: '🎉 Correct! Well done, developer!'
      });
    } else {
      setFeedback({
        type: 'error',
        message: '❌ Incorrect. Try again or use a hint if needed.'
      });
    }
    
    setIsSubmitting(false);
    return isCorrect;
  }, [puzzle, answer, validateAnswer]);

  const resetFeedback = useCallback(() => {
    setFeedback({ type: null, message: '' });
  }, []);

  const clearAnswer = useCallback(() => {
    setAnswer('');
    resetFeedback();
  }, [resetFeedback]);

  return {
    answer,
    setAnswer,
    isSubmitting,
    feedback,
    submitAnswer,
    resetFeedback,
    clearAnswer,
    validateAnswer
  };
};