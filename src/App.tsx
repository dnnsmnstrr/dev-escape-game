import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GameStats } from './components/layout/GameStats';
import { IntroScreen } from './components/IntroScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { GameHub } from './components/GameHub';
import { PuzzleRenderer } from './components/puzzles/PuzzleRenderer';
import { useGameStore } from './stores/gameStore';
import { usePuzzleStore } from './stores/puzzleStore';
import { useTimer } from './hooks/useTimer';

function App() {
  const { 
    gameProgress, 
    currentPuzzle, 
    setCurrentPuzzle, 
    completePuzzle,
    updateElapsedTime 
  } = useGameStore();
  
  const { loadPuzzles, getPuzzleById } = usePuzzleStore();
  const { formatTime } = useTimer(gameProgress === 'playing');

  useEffect(() => {
    loadPuzzles();
  }, [loadPuzzles]);

  useEffect(() => {
    if (gameProgress === 'playing') {
      const interval = setInterval(updateElapsedTime, 1000);
      return () => clearInterval(interval);
    }
  }, [gameProgress, updateElapsedTime]);

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