import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useGameStore } from '../stores/gameStore';
import { useTimer } from '../hooks/useTimer';

export const CompletionScreen: React.FC = () => {
  const { score, resetGame, completedPuzzles, hintsUsed } = useGameStore();
  const { formatTime } = useTimer(false);

  const totalHints = Object.values(hintsUsed).reduce((sum, count) => sum + count, 0);
  const timeBonus = Math.max(0, 1000 - (parseInt(formatTime.split(':')[0]) * 60 + parseInt(formatTime.split(':')[1])));
  const finalScore = score + timeBonus;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card variant="success" glow className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-mono text-green-300 mb-2">
              🎉 ESCAPE SUCCESSFUL 🎉
            </h1>
            <div className="text-xl text-green-400 font-mono">
              You've Broken Free!
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-left space-y-4"
          >
            <div className="border border-green-500/30 rounded p-4 bg-black/50">
              <h3 className="text-lg font-mono text-green-400 mb-3">Mission Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                <div>
                  <span className="text-gray-400">Puzzles Solved:</span>
                  <span className="text-green-300 ml-2">{completedPuzzles.length}</span>
                </div>
                <div>
                  <span className="text-gray-400">Time Taken:</span>
                  <span className="text-green-300 ml-2">{formatTime}</span>
                </div>
                <div>
                  <span className="text-gray-400">Hints Used:</span>
                  <span className="text-yellow-300 ml-2">{totalHints}</span>
                </div>
                <div>
                  <span className="text-gray-400">Time Bonus:</span>
                  <span className="text-green-300 ml-2">+{timeBonus}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-green-500/30">
                <div className="text-lg font-mono">
                  <span className="text-gray-400">Base Score:</span>
                  <span className="text-green-300 ml-2">{score}</span>
                </div>
                <div className="text-xl font-mono mt-2">
                  <span className="text-gray-400">Final Score:</span>
                  <span className="text-green-300 ml-2 font-bold">{finalScore}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="text-green-400 font-mono">
              <p className="text-lg mb-2">🏆 Elite Developer Status Unlocked! 🏆</p>
              <p className="text-sm text-green-300">
                You've proven your skills in cryptography, code analysis, logic, and network security.
                The digital prison couldn't hold you!
              </p>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <Button onClick={resetGame} variant="secondary">
                Play Again
              </Button>
              <Button variant="primary">
                Share Results
              </Button>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};