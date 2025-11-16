import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Terminal } from '../ui/Terminal';
import { usePuzzleSolver } from '../../hooks/usePuzzleSolver';
import { useGameStore } from '../../stores/gameStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { Puzzle } from '../../types';

interface PuzzleComponentProps {
  puzzle: Puzzle;
  onComplete: () => void;
}

export const TerminalPuzzle: React.FC<PuzzleComponentProps> = ({ puzzle, onComplete }) => {
  const gameStore = useGameStore();
  const { answer, setAnswer, isSubmitting, feedback, submitAnswer, clearAnswer } = usePuzzleSolver(puzzle);
  const [showHint, setShowHint] = React.useState(false);
  const [currentHintIndex, setCurrentHintIndex] = React.useState(0);
  
  // Terminal state for filesystem navigation
  const [currentPath, setCurrentPath] = React.useState('/');
  const [terminalOutput, setTerminalOutput] = React.useState<string[]>([
    'Terminal initialized. Type "help" for available commands.',
    'Your mission: Find and read the file "secret_key.txt"'
  ]);
  const [commandInput, setCommandInput] = React.useState('');

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
      gameStore.useHint(puzzle.id);
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  // Get current directory from filesystem
  const getCurrentDirectory = (path: string) => {
    if (!puzzle.data?.filesystem) return null;
    
    const parts = path.split('/').filter(p => p);
    let current = puzzle.data.filesystem['/'];
    
    for (const part of parts) {
      if (current?.children?.[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    
    return current;
  };

  // Handle terminal commands
  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const output = [`$ ${trimmedCmd}`];
    
    if (!trimmedCmd) {
      setTerminalOutput(prev => [...prev, ...output]);
      return;
    }
    
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    switch (command) {
      case 'help':
        output.push('Available commands:');
        output.push('  ls          - List files and directories');
        output.push('  cd <dir>    - Change directory');
        output.push('  cat <file>  - Display file contents');
        output.push('  pwd         - Print working directory');
        output.push('  clear       - Clear terminal output');
        break;
        
      case 'pwd':
        output.push(currentPath);
        break;
        
      case 'clear':
        setTerminalOutput([]);
        setCommandInput('');
        return;
        
      case 'ls': {
        const currentDir = getCurrentDirectory(currentPath);
        if (currentDir?.children) {
          const entries = Object.entries(currentDir.children);
          if (entries.length === 0) {
            output.push('(empty directory)');
          } else {
            entries.forEach(([name, item]) => {
              const typedItem = item as { type: string };
              const prefix = typedItem.type === 'directory' ? 'd' : '-';
              const display = typedItem.type === 'directory' ? `${name}/` : name;
              output.push(`${prefix}rw-r--r--  ${display}`);
            });
          }
        } else {
          output.push('Error: Not a directory');
        }
        break;
      }
        
      case 'cd': {
        if (args.length === 0) {
          setCurrentPath('/');
          output.push('Changed to root directory');
        } else {
          const target = args[0];
          let newPath = currentPath;
          
          if (target === '..') {
            // Go up one level
            const parts = currentPath.split('/').filter(p => p);
            parts.pop();
            newPath = parts.length > 0 ? '/' + parts.join('/') : '/';
          } else if (target === '/') {
            newPath = '/';
          } else if (target.startsWith('/')) {
            newPath = target;
          } else {
            // Relative path
            newPath = currentPath === '/' ? `/${target}` : `${currentPath}/${target}`;
          }
          
          const targetDir = getCurrentDirectory(newPath);
          if (targetDir && targetDir.type === 'directory') {
            setCurrentPath(newPath);
            output.push(`Changed directory to ${newPath}`);
          } else {
            output.push(`cd: ${target}: No such directory`);
          }
        }
        break;
      }
        
      case 'cat': {
        if (args.length === 0) {
          output.push('cat: missing file operand');
        } else {
          const filename = args[0];
          const currentDir = getCurrentDirectory(currentPath);
          const file = currentDir?.children?.[filename];
          
          if (file && file.type === 'file') {
            output.push(file.content);
            // Auto-fill answer if it's the secret file
            if (file.content.includes('ACCESS_KEY')) {
              setAnswer(file.content);
            }
          } else if (file && file.type === 'directory') {
            output.push(`cat: ${filename}: Is a directory`);
          } else {
            output.push(`cat: ${filename}: No such file`);
          }
        }
        break;
      }
        
      default:
        output.push(`${command}: command not found`);
        output.push('Type "help" for available commands');
        break;
    }
    
    setTerminalOutput(prev => [...prev, ...output]);
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

        {puzzle.data?.filesystem && (
          <Terminal title="terminal-navigator">
            <div className="space-y-2">
              <div className="max-h-96 overflow-y-auto mb-3 space-y-1">
                {terminalOutput.map((line, index) => (
                  <div key={index} className={line.startsWith('$') ? 'text-gray-400' : 'text-green-300'}>
                    {line}
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2 border-t border-green-500/20 pt-2">
                <span className="text-green-400">user@server:{currentPath}$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCommand(commandInput);
                      setCommandInput('');
                    }
                  }}
                  className="flex-1 bg-transparent border-none text-green-300 font-mono focus:outline-none"
                  placeholder="Type a command..."
                  autoFocus
                />
              </div>
            </div>
          </Terminal>
        )}
      </Card>

      <Card variant="default" className="space-y-4">
        <h3 className="text-lg font-mono text-hacker-green">
          {puzzle.data?.filesystem ? 'Submit Your Finding' : 'Terminal'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              {puzzle.data?.filesystem 
                ? 'Paste the secret key you found:' 
                : "What's your analysis of the repository structure?"}
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-terminal-border text-hacker-green font-mono focus:outline-none focus:border-hacker-green h-24 resize-none"
              placeholder={puzzle.data?.filesystem 
                ? 'ACCESS_KEY: ...' 
                : 'Describe which branch contains the main codebase and the latest commit...'}
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