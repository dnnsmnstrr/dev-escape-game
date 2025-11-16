import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useTimer } from '../../hooks/useTimer';
import { ProgressBar } from '../ui/ProgressBar';

export const GameStats: React.FC = () => {
  const { 
    completedPuzzles, 
    hintsUsed, 
    score, 
    gameProgress,
    totalPossibleScore 
  } = useGameStore();
  
  const { formatTime } = useTimer(gameProgress === 'playing');

  const totalHints = Object.values(hintsUsed).reduce((sum, count) => sum + count, 0);
  const progressPercentage = totalPossibleScore > 0 ? (score / totalPossibleScore) * 100 : 0;

  return (
    <div className="bg-terminal-bg border border-terminal-border rounded-lg p-4 space-y-3">
      <h3 className="text-hacker-green font-mono text-lg mb-3">Mission Stats</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Puzzles Solved:</span>
            <span className="text-hacker-green font-mono">{completedPuzzles.length}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Hints Used:</span>
            <span className="text-yellow-400 font-mono">{totalHints}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Time Elapsed:</span>
            <span className="text-hacker-green font-mono">{formatTime}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Score:</span>
            <span className="text-hacker-green font-mono">{score}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Max Score:</span>
            <span className="text-gray-500 font-mono">{totalPossibleScore}</span>
          </div>
        </div>
      </div>
      
      <div className="pt-2">
        <div className="text-sm text-gray-400 mb-1">Progress</div>
        <ProgressBar 
          progress={progressPercentage} 
          color="green"
          showPercentage={false}
        />
      </div>
    </div>
  );
};