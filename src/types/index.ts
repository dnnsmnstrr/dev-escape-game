export interface Puzzle {
  id: string;
  type: 'crypto' | 'code' | 'logic' | 'network' | 'terminal';
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  hints: string[];
  solution: string | object;
  validator: (answer: any) => boolean;
  data?: any;
  timeLimit?: number; // in seconds
  points: number;
}

export interface GameState {
  currentPuzzle: string | null;
  completedPuzzles: string[];
  hintsUsed: Record<string, number>;
  startTime: number;
  elapsedTime: number;
  gameProgress: 'intro' | 'playing' | 'completed';
  score: number;
  totalPossibleScore: number;
}

export interface StoryChapter {
  id: string;
  title: string;
  content: string;
  puzzleIds: string[];
  completed: boolean;
}

export interface GameStats {
  puzzlesCompleted: number;
  totalPuzzles: number;
  hintsUsed: number;
  timeSpent: number;
  score: number;
  completionRate: number;
}

export interface PuzzleAttempt {
  puzzleId: string;
  answer: string;
  correct: boolean;
  timestamp: number;
  hintsUsed: number;
  timeSpent: number;
}

export * from './audio';