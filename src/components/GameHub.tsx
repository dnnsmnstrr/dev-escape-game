import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Terminal } from './ui/Terminal';
import { useGameStore } from '../stores/gameStore';
import { usePuzzleStore } from '../stores/puzzleStore';
import { storyChapters } from '../data/story';

interface ContentPart {
  type: 'text' | 'terminal';
  content: string;
}

const parseContent = (content: string): ContentPart[] => {
  const parts: ContentPart[] = [];
  const regex = /```([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    // Add text before the terminal block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }
    
    // Add terminal block
    const terminalContent = match[1].trim();
    if (terminalContent) {
      parts.push({ type: 'terminal', content: terminalContent });
    }
    
    lastIndex = regex.lastIndex;
  }

  // Add remaining text after the last terminal block
  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex).trim();
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  return parts;
};

const TerminalBlockRenderer: React.FC<{ content: string }> = ({ content }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const timeouts: number[] = [];
    
    // Start with empty lines and progressively add them
    let currentLines: string[] = [];
    
    lines.forEach((line, index) => {
      const timeout = window.setTimeout(() => {
        currentLines = [...currentLines, line];
        setVisibleLines([...currentLines]);
      }, index * 150); // 150ms delay between each line
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [content]);

  return (
    <div className="bg-terminal-bg border border-terminal-border rounded-md p-4 my-4 font-mono text-sm">
      <AnimatePresence mode="popLayout">
        {visibleLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-green-300 leading-relaxed"
          >
            {line}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const StoryContentRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parts = parseContent(content);

  return (
    <div className="space-y-4">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part.type === 'text' ? (
            <div className="text-green-300 font-mono text-sm leading-relaxed whitespace-pre-line">
              {part.content}
            </div>
          ) : (
            <TerminalBlockRenderer content={part.content} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const GameHub: React.FC = () => {
  const { 
    setCurrentPuzzle, 
    completedPuzzles, 
    gameProgress,
    setGameProgress 
  } = useGameStore();
  
  const { puzzles } = usePuzzleStore();
  const [showDebugMenu, setShowDebugMenu] = useState(false);

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

  // Hidden debug menu keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'k') {
        e.preventDefault();
        setShowDebugMenu(prev => !prev);
      }
      // ESC to close
      if (e.key === 'Escape' && showDebugMenu) {
        setShowDebugMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDebugMenu]);

  const currentChapter = getCurrentChapter();
  const uncompletedPuzzles = getUncompletedPuzzles();

  if (gameProgress === 'completed') {
    return null; // Will be handled by CompletionScreen
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hidden Debug Menu */}
      <AnimatePresence>
        {showDebugMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50 w-96"
          >
            <Card variant="terminal" className="space-y-3 shadow-2xl border-2 border-yellow-400">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-mono text-yellow-400">
                  🐛 Debug Menu
                </h3>
                <button
                  onClick={() => setShowDebugMenu(false)}
                  className="text-gray-400 hover:text-yellow-400 text-xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="text-xs text-gray-400 font-mono mb-2">
                Jump to any challenge:
              </div>
              
              <div className="max-h-96 overflow-y-auto space-y-2">
                {puzzles.map((puzzle) => {
                  const isCompleted = completedPuzzles.includes(puzzle.id);
                  return (
                    <button
                      key={puzzle.id}
                      onClick={() => {
                        handlePuzzleSelect(puzzle.id);
                        setShowDebugMenu(false);
                      }}
                      className={`w-full text-left p-2 rounded border font-mono text-xs transition-colors ${
                        isCompleted
                          ? 'border-green-500/30 bg-green-900/10 text-green-400 hover:bg-green-900/20'
                          : 'border-terminal-border bg-black text-green-300 hover:border-yellow-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{puzzle.title}</span>
                        {isCompleted && <span className="text-green-500">✓</span>}
                      </div>
                      <div className="text-gray-500 flex items-center gap-2">
                        <span className="uppercase">{puzzle.type}</span>
                        <span>•</span>
                        <span>{puzzle.points} pts</span>
                        <span>•</span>
                        <span>{'★'.repeat(puzzle.difficulty)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="text-xs text-gray-500 font-mono pt-2 border-t border-gray-700">
                Press ESC to close
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

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
          
          <StoryContentRenderer content={currentChapter.content} />
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
            <div className="text-gray-600 text-xs mt-3 italic">
              Hint: Press Ctrl+Shift+1 for debug menu
            </div>
          </div>
        </Terminal>
      </motion.div>
    </div>
  );
};