import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GameStats } from './components/layout/GameStats';
import { IntroScreen } from './components/IntroScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { GameHub } from './components/GameHub';
import { PuzzleRenderer } from './components/puzzles/PuzzleRenderer';
import { Card } from './components/ui/Card';
import { useGameStore } from './stores/gameStore';
import { usePuzzleStore } from './stores/puzzleStore';
import { useTimer } from './hooks/useTimer';

function App() {
  const { 
    gameProgress, 
    currentPuzzle, 
    setCurrentPuzzle, 
    completePuzzle,
    completedPuzzles,
    updateElapsedTime 
  } = useGameStore();
  
  const { loadPuzzles, getPuzzleById, puzzles } = usePuzzleStore();
  const { formatTime } = useTimer(gameProgress === 'playing');
  const [showDebugMenu, setShowDebugMenu] = useState(false);

  useEffect(() => {
    loadPuzzles();
  }, [loadPuzzles]);

  useEffect(() => {
    if (gameProgress === 'playing') {
      const interval = setInterval(updateElapsedTime, 1000);
      return () => clearInterval(interval);
    }
  }, [gameProgress, updateElapsedTime]);

  // Global debug menu keyboard shortcut
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

  const handlePuzzleComplete = (puzzleId: string) => {
    const attempt = {
      puzzleId,
      answer: 'correct',
      correct: true,
      timestamp: Date.now(),
      hintsUsed: 0,
      timeSpent: 0
    };
    
    completePuzzle(puzzleId, attempt);
    setCurrentPuzzle(null);
  };

  const currentPuzzleData = currentPuzzle ? getPuzzleById(currentPuzzle) : null;

  return (
    <div className="min-h-screen bg-terminal-bg text-hacker-green flex flex-col">
      <Header />
      
      {/* Global Debug Menu */}
      <AnimatePresence>
        {showDebugMenu && gameProgress === 'playing' && (
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
                        setCurrentPuzzle(puzzle.id);
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

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {gameProgress === 'intro' && <IntroScreen />}
            {gameProgress === 'playing' && !currentPuzzle && <GameHub />}
            {gameProgress === 'playing' && currentPuzzle && currentPuzzleData && (
              <PuzzleRenderer 
                puzzle={currentPuzzleData} 
                onComplete={() => handlePuzzleComplete(currentPuzzle)}
              />
            )}
            {gameProgress === 'completed' && <CompletionScreen />}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <GameStats />
              
              {gameProgress === 'playing' && (
                <div className="bg-terminal-bg border border-terminal-border rounded-lg p-4">
                  <h3 className="text-hacker-green font-mono text-sm mb-2">Mission Time</h3>
                  <div className="text-2xl font-mono text-hacker-green">
                    {formatTime}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;