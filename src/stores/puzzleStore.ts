import { create } from 'zustand';
import type { Puzzle } from '../types';

interface PuzzleStore {
  puzzles: Puzzle[];
  currentPuzzle: Puzzle | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  loadPuzzles: () => Promise<void>;
  setCurrentPuzzle: (puzzle: Puzzle | null) => void;
  getPuzzleById: (id: string) => Puzzle | undefined;
  getPuzzlesByType: (type: Puzzle['type']) => Puzzle[];
  getNextPuzzle: (currentId: string) => Puzzle | null;
}

export const usePuzzleStore = create<PuzzleStore>((set, get) => ({
  puzzles: [],
  currentPuzzle: null,
  loading: false,
  error: null,

  loadPuzzles: async () => {
    set({ loading: true, error: null });
    
    try {
      // In a real app, this would fetch from an API
      // For now, we'll import the puzzles directly
      const { puzzles } = await import('../data/puzzles');
      set({ 
        puzzles, 
        loading: false,
        totalPossibleScore: puzzles.reduce((sum, puzzle) => sum + puzzle.points, 0)
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load puzzles',
        loading: false 
      });
    }
  },

  setCurrentPuzzle: (puzzle: Puzzle | null) => {
    set({ currentPuzzle: puzzle });
  },

  getPuzzleById: (id: string) => {
    const { puzzles } = get();
    return puzzles.find(puzzle => puzzle.id === id);
  },

  getPuzzlesByType: (type: Puzzle['type']) => {
    const { puzzles } = get();
    return puzzles.filter(puzzle => puzzle.type === type);
  },

  getNextPuzzle: (currentId: string) => {
    const { puzzles } = get();
    const currentIndex = puzzles.findIndex(p => p.id === currentId);
    return currentIndex < puzzles.length - 1 ? puzzles[currentIndex + 1] : null;
  },
}));