import { Card } from '../ui/Card';
import { puzzles } from '../../data/puzzles';

const ChallengeList = () => {
  const getPuzzleTypeColor = (type: string) => {
    switch (type) {
      case 'crypto': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'code': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'terminal': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'network': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'logic': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty === 1) return 'text-green-400';
    if (difficulty === 2) return 'text-yellow-400';
    if (difficulty === 3) return 'text-orange-400';
    if (difficulty === 4) return 'text-red-400';
    return 'text-red-600';
  };

  const totalPoints = puzzles.reduce((sum, p) => sum + p.points, 0);
  const avgDifficulty = (puzzles.reduce((sum, p) => sum + p.difficulty, 0) / puzzles.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20">
          <div className="text-sm text-gray-400 mb-1">Total Challenges</div>
          <div className="text-3xl font-bold text-cyan-400">{puzzles.length}</div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <div className="text-sm text-gray-400 mb-1">Total Points</div>
          <div className="text-3xl font-bold text-purple-400">{totalPoints}</div>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <div className="text-sm text-gray-400 mb-1">Avg Difficulty</div>
          <div className="text-3xl font-bold text-yellow-400">{avgDifficulty}</div>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <div className="text-sm text-gray-400 mb-1">Puzzle Types</div>
          <div className="text-3xl font-bold text-green-400">
            {new Set(puzzles.map(p => p.type)).size}
          </div>
        </Card>
      </div>

      {/* Challenges List */}
      <Card>
        <h2 className="text-2xl font-bold mb-6">All Challenges</h2>
        <div className="space-y-4">
          {puzzles.map((puzzle) => (
            <div
              key={puzzle.id}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white truncate">
                      {puzzle.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-mono uppercase border ${getPuzzleTypeColor(puzzle.type)}`}>
                      {puzzle.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {puzzle.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">ID:</span>
                      <code className="text-cyan-400 font-mono">{puzzle.id}</code>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className={`font-bold ${getDifficultyColor(puzzle.difficulty)}`}>
                        {'★'.repeat(puzzle.difficulty)}{'☆'.repeat(5 - puzzle.difficulty)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Points:</span>
                      <span className="text-green-400 font-bold">{puzzle.points}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Hints:</span>
                      <span className="text-purple-400 font-bold">{puzzle.hints.length}</span>
                    </div>
                    {puzzle.timeLimit && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">Time:</span>
                        <span className="text-orange-400 font-bold">{puzzle.timeLimit}s</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      const puzzleCode = JSON.stringify(puzzle, null, 2);
                      navigator.clipboard.writeText(puzzleCode);
                      alert('Puzzle data copied to clipboard!');
                    }}
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm transition-colors whitespace-nowrap"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>

              {/* Collapsible details */}
              <details className="mt-3 pt-3 border-t border-gray-700">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  View Details
                </summary>
                <div className="mt-3 space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500 font-semibold">Solution:</span>
                    <code className="ml-2 text-cyan-400 font-mono">
                      {typeof puzzle.solution === 'string' ? puzzle.solution : JSON.stringify(puzzle.solution)}
                    </code>
                  </div>
                  
                  {puzzle.hints.length > 0 && (
                    <div>
                      <span className="text-gray-500 font-semibold">Hints:</span>
                      <ul className="ml-4 mt-2 space-y-1">
                        {puzzle.hints.map((hint, idx) => (
                          <li key={idx} className="text-gray-400">
                            {idx + 1}. {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {puzzle.data && Object.keys(puzzle.data).length > 0 && (
                    <div>
                      <span className="text-gray-500 font-semibold">Data Fields:</span>
                      <div className="ml-4 mt-2">
                        {Object.keys(puzzle.data).map((key) => (
                          <div key={key} className="text-gray-400">
                            • <code className="text-purple-400">{key}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </details>
            </div>
          ))}
        </div>
      </Card>

      {/* Type Distribution */}
      <Card>
        <h3 className="text-xl font-bold mb-4">Challenge Distribution by Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {['crypto', 'code', 'terminal', 'network', 'logic'].map((type) => {
            const count = puzzles.filter(p => p.type === type).length;
            const percentage = ((count / puzzles.length) * 100).toFixed(0);
            return (
              <div key={type} className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className={`text-2xl font-bold mb-1 ${getPuzzleTypeColor(type).split(' ')[1]}`}>
                  {count}
                </div>
                <div className="text-xs text-gray-400 uppercase mb-1">{type}</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ChallengeList;
