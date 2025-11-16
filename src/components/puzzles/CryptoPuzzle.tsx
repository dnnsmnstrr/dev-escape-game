import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Terminal } from '../ui/Terminal';
import { usePuzzleSolver } from '../../hooks/usePuzzleSolver';
import { useGameStore } from '../../stores/gameStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface PuzzleComponentProps {
  puzzle: any;
  onComplete: () => void;
}

export const CryptoPuzzle: React.FC<PuzzleComponentProps> = ({ puzzle, onComplete }) => {
  const { useHint } = useGameStore();
  const { answer, setAnswer, isSubmitting, feedback, submitAnswer, clearAnswer } = usePuzzleSolver(puzzle);
  const [showHint, setShowHint] = React.useState(false);
  const [currentHintIndex, setCurrentHintIndex] = React.useState(0);

  const handleSubmit = async () => {
    const isCorrect = await submitAnswer();
    if (isCorrect) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  const handleHint = () => {
    if (currentHintIndex < puzzle.hints.length) {
      setShowHint(true);
      useHint(puzzle.id);
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card variant="terminal" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-mono text-green-400">
            {puzzle.title}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-yellow-400 font-mono">
              Difficulty: {'★'.repeat(puzzle.difficulty)}{'☆'.repeat(5 - puzzle.difficulty)}
            </span>
            <span className="text-sm text-green-400 font-mono">
              {puzzle.points} pts
            </span>
          </div>
        </div>
        
        <div className="text-green-300 font-mono text-sm leading-relaxed">
          {puzzle.description}
        </div>

        {puzzle.data?.encoded && (
          <Terminal title="encoded-message.txt">
            <div className="space-y-2">
              <div className="text-gray-400">$ cat encoded-message.txt</div>
              <div className="text-yellow-300 font-mono">
                {puzzle.data.encoded}
              </div>
            </div>
          </Terminal>
        )}
      </Card>

      <Card variant="default" className="space-y-4">
        <h3 className="text-lg font-mono text-hacker-green">Solution Terminal</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              Enter your solution:
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-2 bg-black border border-terminal-border text-hacker-green font-mono focus:outline-none focus:border-hacker-green"
              placeholder="Type your answer here..."
              disabled={isSubmitting}
            />
          </div>

          {feedback.type && (
            <div className={`p-3 rounded font-mono text-sm ${
              feedback.type === 'success' ? 'bg-green-900/30 text-green-300 border border-green-500/30' :
              feedback.type === 'error' ? 'bg-red-900/30 text-red-300 border border-red-500/30' :
              'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30'
            }`}>
              {feedback.message}
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !answer.trim()}
              className="flex-1"
            >
              {isSubmitting ? <LoadingSpinner size="sm" /> : 'Submit Solution'}
            </Button>
            
            <Button
              onClick={clearAnswer}
              variant="secondary"
              disabled={isSubmitting}
            >
              Clear
            </Button>
            
            <Button
              onClick={handleHint}
              variant="secondary"
              disabled={currentHintIndex >= puzzle.hints.length}
            >
              Hint ({currentHintIndex}/{puzzle.hints.length})
            </Button>
          </div>

          {showHint && currentHintIndex > 0 && (
            <Terminal title="hint-system">
              <div className="space-y-2">
                <div className="text-gray-400">$ hint --show</div>
                <div className="text-yellow-300">
                  {puzzle.hints[currentHintIndex - 1]}
                </div>
              </div>
            </Terminal>
          )}
        </div>
      </Card>
    </div>
  );
};