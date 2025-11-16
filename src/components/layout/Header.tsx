import React from 'react';
import { useGameStore } from '../../stores/gameStore';

export const Header: React.FC = () => {
  const { gameProgress, resetGame } = useGameStore();

  return (
    <header className="bg-terminal-bg border-b border-terminal-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-mono text-hacker-green glitch">
            ESCAPE_DEV
          </h1>
          <div className="text-sm text-gray-400 font-mono">
            {gameProgress === 'intro' && 'System Initializing...'}
            {gameProgress === 'playing' && 'Mission in Progress'}
            {gameProgress === 'completed' && 'Mission Complete'}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400 font-mono">
            Status: <span className="text-hacker-green">
              {gameProgress === 'intro' && 'READY'}
              {gameProgress === 'playing' && 'ACTIVE'}
              {gameProgress === 'completed' && 'ESCAPED'}
            </span>
          </div>
          
          {gameProgress !== 'intro' && (
            <button
              onClick={resetGame}
              className="px-3 py-1 text-xs font-mono border border-terminal-border text-gray-400 hover:text-hacker-green hover:border-hacker-green transition-colors"
            >
              RESET
            </button>
          )}
        </div>
      </div>
    </header>
  );
};