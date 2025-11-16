import React from 'react';
import { CryptoPuzzle } from './CryptoPuzzle';
import { CodePuzzle } from './CodePuzzle';
import { LogicPuzzle } from './LogicPuzzle';
import { NetworkPuzzle } from './NetworkPuzzle';
import { Puzzle } from '../../types';

interface PuzzleRendererProps {
  puzzle: Puzzle;
  onComplete: () => void;
}

export const PuzzleRenderer: React.FC<PuzzleRendererProps> = ({ puzzle, onComplete }) => {
  switch (puzzle.type) {
    case 'crypto':
      return <CryptoPuzzle puzzle={puzzle} onComplete={onComplete} />;
    case 'code':
      return <CodePuzzle puzzle={puzzle} onComplete={onComplete} />;
    case 'logic':
      return <LogicPuzzle puzzle={puzzle} onComplete={onComplete} />;
    case 'network':
      return <NetworkPuzzle puzzle={puzzle} onComplete={onComplete} />;
    default:
      return (
        <div className="text-center text-red-400 font-mono">
          Unknown puzzle type: {puzzle.type}
        </div>
      );
  }
};