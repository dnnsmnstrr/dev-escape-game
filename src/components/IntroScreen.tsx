import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useGameStore } from '../stores/gameStore';

export const IntroScreen: React.FC = () => {
  const { startGame } = useGameStore();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card variant="terminal" glow className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-mono text-green-400 mb-2 glitch">
              ESCAPE_DEV
            </h1>
            <div className="text-lg text-green-300 font-mono">
              Digital Prison Break
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-left space-y-4 text-green-400 font-mono text-sm"
          >
            <div className="border border-green-500/30 rounded p-4 bg-black/50">
              <p className="mb-3">
                You find yourself trapped in a mysterious digital realm...
              </p>
              <p className="mb-3">
                <span className="text-yellow-400">&gt;</span> System Status: QUARANTINED
              </p>
              <p className="mb-3">
                <span className="text-yellow-400">&gt;</span> Escape Route: LOCKED
              </p>
              <p className="mb-3">
                <span className="text-yellow-400">&gt;</span> Required Skills:
              </p>
              <ul className="ml-4 space-y-1">
                <li>• Cryptography & Decryption</li>
                <li>• Code Analysis & Debugging</li>
                <li>• Logical Problem Solving</li>
                <li>• Network Security</li>
              </ul>
              <p className="mt-4 text-yellow-300">
                Only developers with elite skills can escape this digital maze.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={startGame}
              size="lg"
              className="w-full text-lg"
            >
              START ESCAPE SEQUENCE
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-green-500/60 font-mono"
          >
            <p>Warning: This mission tests real developer skills</p>
            <p>Prepare to think, code, and hack your way to freedom</p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};