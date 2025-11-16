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

export const LogicPuzzle: React.FC<PuzzleComponentProps> = ({ puzzle, onComplete }) => {
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

  const renderBranchData = () => {
    if (!puzzle.data?.branches) return null;
    
    return (
      <div className="space-y-3">
        {Object.entries(puzzle.data.branches).map(([branch, commits]: [string, string[]]) => (
          <div key={branch} className="border border-green-500/20 rounded p-3">
            <div className="text-yellow-300 font-mono mb-2">
              {branch}/
            </div>
            {commits.map((commit, index) => (
              <div key={index} className="text-gray-400 font-mono text-sm ml-4">
                {index === commits.length - 1 ? '└── ' : '├── '}
                <span className="text-green-300">{commit}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
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

        {puzzle.data?.branches && (
          <Terminal title="git-branch-analysis">
            <div className="space-y-2">
              <div className="text-gray-400">$ git branch -a</div>
              <div className="text-gray-400">$ git log --oneline --graph --all</div>
              {renderBranchData()}
            </div>
          </Terminal>
        )}
      </Card>

      <Card variant="default" className="space-y-4">
        <h3 className="text-lg font-mono text-hacker-green">Logic Analysis Terminal</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              What's your analysis of the repository structure?
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-terminal-border text-hacker-green font-mono focus:outline-none focus:border-hacker-green h-24 resize-none"
              placeholder="Describe which branch contains the main codebase and the latest commit..."
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
              {isSubmitting ? <LoadingSpinner size="sm" /> : 'Submit Analysis'}
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
            <Terminal title="logic-hint">
              <div className="space-y-2">
                <div className="text-gray-400">$ git hint</div>
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