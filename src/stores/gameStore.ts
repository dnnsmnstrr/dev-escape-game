import { create } from 'zustand';
import type { GameState, PuzzleAttempt } from '../types';

interface GameStore extends GameState {
  // Actions
  startGame: () => void;
  setCurrentPuzzle: (puzzleId: string | null) => void;
  completePuzzle: (puzzleId: string, attempt: PuzzleAttempt) => void;
  useHint: (puzzleId: string) => void;
  resetGame: () => void;
  updateElapsedTime: () => void;
  setGameProgress: (progress: 'intro' | 'playing' | 'completed') => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  currentPuzzle: null,
  completedPuzzles: [],
  hintsUsed: {},
  startTime: 0,
  elapsedTime: 0,
  gameProgress: 'intro',
  score: 0,
  totalPossibleScore: 0,

  // Actions
  startGame: () => {
    set({
      startTime: Date.now(),
      gameProgress: 'playing',
      currentPuzzle: null,
      completedPuzzles: [],
      hintsUsed: {},
      score: 0,
      elapsedTime: 0,
    });
  },

  setCurrentPuzzle: (puzzleId: string | null) => {
    set({ currentPuzzle: puzzleId });
  },

  completePuzzle: (puzzleId: string, attempt: PuzzleAttempt) => {
    const state = get();
    const newCompletedPuzzles = [...state.completedPuzzles, puzzleId];
    const hintsUsedForPuzzle = state.hintsUsed[puzzleId] || 0;
    
    // Calculate score based on hints used and time
    const baseScore = 100;
    const hintPenalty = hintsUsedForPuzzle * 10;
    const timeBonus = Math.max(0, 50 - Math.floor(attempt.timeSpent / 60));
    const puzzleScore = Math.max(10, baseScore - hintPenalty + timeBonus);
    
    set({
      completedPuzzles: newCompletedPuzzles,
      score: state.score + puzzleScore,
      currentPuzzle: null,
    });
  },

  useHint: (puzzleId: string) => {
    const state = get();
    const currentHints = state.hintsUsed[puzzleId] || 0;
    set({
      hintsUsed: {
        ...state.hintsUsed,
        [puzzleId]: currentHints + 1,
      },
    });
  },

  resetGame: () => {
    set({
      currentPuzzle: null,
      completedPuzzles: [],
      hintsUsed: {},
      startTime: 0,
      elapsedTime: 0,
      gameProgress: 'intro',
      score: 0,
    });
  },

  updateElapsedTime: () => {
    const state = get();
    if (state.startTime > 0) {
      set({
        elapsedTime: Math.floor((Date.now() - state.startTime) / 1000),
      });
    }
  },

  setGameProgress: (progress: 'intro' | 'playing' | 'completed') => {
    set({ gameProgress: progress });
  },
}));