import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Terminal } from './ui/Terminal';
import { useGameStore } from '../stores/gameStore';
import { usePuzzleStore } from '../stores/puzzleStore';
import { storyChapters } from '../data/story';

export const GameHub: React.FC = () => {
  const { 
    currentPuzzle, 
    setCurrentPuzzle, 
    completedPuzzles, 
    gameProgress,
    setGameProgress 
  } = useGameStore();
  
  const { puzzles } = usePuzzleStore();

  const getCurrentChapter = () => {
    const completedCount = completedPuzzles.length;
    if (completedCount === 0) return storyChapters[0]; // intro
    if (completedCount < 3) return storyChapters[1]; // chapter-1
    if (completedCount < 4) return storyChapters[2]; // chapter-2
    if (completedCount < 5) return storyChapters[3]; // chapter-3
    return storyChapters[4]; // escape
  };

  const getAvailablePuzzles = () => {
    const chapter = getCurrentChapter();
    return puzzles.filter(puzzle => chapter.puzzleIds.includes(puzzle.id));
  };

  const getUncompletedPuzzles = () => {
    return getAvailablePuzzles().filter(puzzle => !completedPuzzles.includes(puzzle.id));
  };

  const handlePuzzleSelect = (puzzleId: string) => {
    setCurrentPuzzle(puzzleId);
  };

  const handleCompleteGame = () => {
    setGameProgress('completed');
  };

  const currentChapter = getCurrentChapter();
  const uncompletedPuzzles = getUncompletedPuzzles();

  if (gameProgress === 'completed') {
    return null; // Will be handled by CompletionScreen
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Story Chapter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card variant="terminal" className="space-y-4">
          <h2 className="text-xl font-mono text-green-400">
            {currentChapter.title}
          </h2>
          
          <div className="text-green-300 font-mono text-sm leading-relaxed whitespace-pre-line">
            {currentChapter.content}
          </div>
        </Card>
      </motion.div>

      {/* Available Puzzles */}
      {uncompletedPuzzles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card variant="default" className="space-y-4">
            <h3 className="text-lg font-mono text-hacker-green">Available Challenges</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {uncompletedPuzzles.map((puzzle, index) => (
                <motion.div
                  key={puzzle.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="border border-terminal-border rounded-lg p-4 hover:border-hacker-green transition-colors cursor-pointer"
                  onClick={() => handlePuzzleSelect(puzzle.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-mono text-hacker-green">
                      {puzzle.title}
                    </h4>
                    <span className="text-xs text-yellow-400 font-mono">
                      {puzzle.points} pts
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-400 font-mono mb-2">
                    Type: {puzzle.type.toUpperCase()} | 
                    Difficulty: {'★'.repeat(puzzle.difficulty)}{'☆'.repeat(5 - puzzle.difficulty)}
                  </div>
                  
                  <div className="text-xs text-gray-500 font-mono line-clamp-2">
                    {puzzle.description}
                  </div>
                  
                  <div className="mt-3">
                    <Button size="sm" className="w-full">
                      Start Challenge
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Completed Chapter - Next Chapter Button */}
      {uncompletedPuzzles.length === 0 && currentChapter.id !== 'escape' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card variant="success" className="text-center space-y-4">
            <h3 className="text-lg font-mono text-green-300">
              Chapter Complete! 🎉
            </h3>
            <p className="text-green-400 font-mono text-sm">
              You've completed all challenges in this chapter. Ready for what's next?
            </p>
            <Button onClick={() => window.location.reload()}>
              Continue to Next Chapter
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Game Complete */}
      {uncompletedPuzzles.length === 0 && currentChapter.id === 'escape' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card variant="success" className="text-center space-y-4">
            <h3 className="text-xl font-mono text-green-300">
              🎉 All Challenges Complete! 🎉
            </h3>
            <p className="text-green-400 font-mono">
              You've proven yourself as an elite developer!
            </p>
            <Button onClick={handleCompleteGame} size="lg">
              View Final Results
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Terminal title="mission-progress">
          <div className="space-y-2 text-sm">
            <div className="text-gray-400">$ mission --status</div>
            <div className="text-green-300">
              Progress: {completedPuzzles.length}/{puzzles.length} puzzles completed
            </div>
            <div className="text-green-300">
              Current Chapter: {currentChapter.title}
            </div>
            <div className="text-green-300">
              Remaining Challenges: {uncompletedPuzzles.length}
            </div>
          </div>
        </Terminal>
      </motion.div>
    </div>
  );
};