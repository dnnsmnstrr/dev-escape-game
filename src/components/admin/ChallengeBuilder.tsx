import { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PuzzleRenderer } from '../puzzles/PuzzleRenderer';
import type { Puzzle } from '../../types';

type PuzzleType = 'crypto' | 'code' | 'logic' | 'network' | 'terminal';

interface ChallengeForm {
  id: string;
  type: PuzzleType;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  hints: string[];
  solution: string;
  points: number;
  timeLimit?: number;
  data: Record<string, string>;
}

const PUZZLE_TYPES: { value: PuzzleType; label: string; description: string }[] = [
  { value: 'crypto', label: 'Cryptography', description: 'Encoding, decoding, and cipher challenges' },
  { value: 'code', label: 'Code Analysis', description: 'Reverse engineering and code debugging' },
  { value: 'logic', label: 'Logic Puzzle', description: 'Problem-solving and pattern recognition' },
  { value: 'network', label: 'Network Security', description: 'Network protocols and security' },
  { value: 'terminal', label: 'Terminal Commands', description: 'Command-line navigation and scripting' },
];

const ChallengeBuilder = () => {
  const [form, setForm] = useState<ChallengeForm>({
    id: '',
    type: 'crypto',
    title: '',
    description: '',
    difficulty: 1,
    hints: ['', '', ''],
    solution: '',
    points: 100,
    timeLimit: undefined,
    data: {},
  });

  const [copied, setCopied] = useState(false);

  const updateForm = (field: keyof ChallengeForm, value: ChallengeForm[keyof ChallengeForm]) => {
    setForm({ ...form, [field]: value });
  };

  const updateHint = (index: number, value: string) => {
    const newHints = [...form.hints];
    newHints[index] = value;
    setForm({ ...form, hints: newHints });
  };

  const addHint = () => {
    setForm({ ...form, hints: [...form.hints, ''] });
  };

  const removeHint = (index: number) => {
    const newHints = form.hints.filter((_, i) => i !== index);
    setForm({ ...form, hints: newHints });
  };

  const updateData = (field: string, value: string) => {
    setForm({
      ...form,
      data: { ...form.data, [field]: value },
    });
  };

  const generatePuzzleCode = (): string => {
    const dataStr = Object.keys(form.data).length > 0
      ? JSON.stringify(form.data, null, 6).split('\n').map((line, i) => i === 0 ? line : `      ${line}`).join('\n')
      : '{}';

    const hintsStr = form.hints
      .filter(h => h.trim())
      .map(hint => `      '${hint.replace(/'/g, "\\'")}'`)
      .join(',\n');

    const validatorCode = generateValidator(form.type, form.solution);

    return `  {
    id: '${form.id}',
    type: '${form.type}',
    title: '${form.title}',
    description: '${form.description}',
    difficulty: ${form.difficulty},
    hints: [
${hintsStr}
    ],
    solution: '${form.solution}',
    validator: ${validatorCode},
    data: ${dataStr},${form.timeLimit ? `\n    timeLimit: ${form.timeLimit},` : ''}
    points: ${form.points}
  }`;
  };

  const generateValidator = (type: PuzzleType, solution: string): string => {
    switch (type) {
      case 'crypto':
        return `(answer: string) => {
      return answer.toLowerCase().trim() === '${solution.toLowerCase()}';
    }`;
      case 'code':
        return `(answer: string) => {
      return answer.toLowerCase().includes('${solution.toLowerCase()}');
    }`;
      case 'terminal':
        return `(answer: string) => {
      return answer.toLowerCase().trim() === '${solution.toLowerCase()}';
    }`;
      case 'network':
        return `(answer: string) => {
      return answer.toLowerCase().includes('${solution.toLowerCase()}');
    }`;
      case 'logic':
        return `(answer: string) => {
      return answer.toLowerCase().trim() === '${solution.toLowerCase()}';
    }`;
      default:
        return `(answer: string) => answer.toLowerCase() === '${solution.toLowerCase()}'`;
    }
  };

  const copyToClipboard = async () => {
    const code = generatePuzzleCode();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetForm = () => {
    setForm({
      id: '',
      type: 'crypto',
      title: '',
      description: '',
      difficulty: 1,
      hints: ['', '', ''],
      solution: '',
      points: 100,
      timeLimit: undefined,
      data: {},
    });
  };

  // Convert form data to a Puzzle object for preview
  const previewPuzzle = useMemo((): Puzzle | null => {
    if (!form.title || !form.description) {
      return null;
    }

    // Parse data fields based on type
    const parsedData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(form.data)) {
      if (!value) continue;
      try {
        // Try to parse as JSON first
        parsedData[key] = JSON.parse(value);
      } catch {
        // If parsing fails, use as string
        parsedData[key] = value;
      }
    }

    return {
      id: form.id || 'preview',
      type: form.type,
      title: form.title,
      description: form.description,
      difficulty: form.difficulty,
      hints: form.hints.filter(h => h.trim()),
      solution: form.solution,
      validator: (input: string) => input.toLowerCase().includes(form.solution.toLowerCase()),
      data: parsedData,
      timeLimit: form.timeLimit,
      points: form.points,
    };
  }, [form]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <div className="space-y-6">
        <Card>
          <h2 className="text-2xl font-bold mb-6">Challenge Configuration</h2>

            {/* Basic Info */}
            <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Puzzle ID</label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => updateForm('id', e.target.value)}
                placeholder="e.g., crypto-001"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Puzzle Type</label>
              <select
                value={form.type}
                onChange={(e) => updateForm('type', e.target.value as PuzzleType)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                {PUZZLE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateForm('title', e.target.value)}
                placeholder="Challenge title"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => updateForm('description', e.target.value)}
                placeholder="Describe the challenge..."
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={form.difficulty}
                  onChange={(e) => updateForm('difficulty', parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Points</label>
                <input
                  type="number"
                  value={form.points}
                  onChange={(e) => updateForm('points', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time Limit (seconds, optional)</label>
              <input
                type="number"
                value={form.timeLimit || ''}
                onChange={(e) => updateForm('timeLimit', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="Leave empty for no limit"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Solution</label>
              <input
                type="text"
                value={form.solution}
                onChange={(e) => updateForm('solution', e.target.value)}
                placeholder="Expected answer"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4">Hints</h3>
          <div className="space-y-3">
            {form.hints.map((hint, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={hint}
                  onChange={(e) => updateHint(index, e.target.value)}
                  placeholder={`Hint ${index + 1}`}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                {form.hints.length > 1 && (
                  <button
                    onClick={() => removeHint(index)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <Button onClick={addHint} variant="secondary" className="w-full">
              + Add Hint
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4">Puzzle Data</h3>
          <div className="space-y-3">
            {form.type === 'crypto' && (
              <div>
                <label className="block text-sm font-medium mb-2">Encoded Text</label>
                <textarea
                  value={form.data.encoded || ''}
                  onChange={(e) => updateData('encoded', e.target.value)}
                  placeholder="Base64 or other encoded text"
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                />
              </div>
            )}

            {form.type === 'code' && (
              <div>
                <label className="block text-sm font-medium mb-2">Code Snippet</label>
                <textarea
                  value={form.data.code || ''}
                  onChange={(e) => updateData('code', e.target.value)}
                  placeholder="JavaScript or other code"
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                />
              </div>
            )}

            {form.type === 'terminal' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">File System (JSON)</label>
                  <textarea
                    value={form.data.filesystem || ''}
                    onChange={(e) => updateData('filesystem', e.target.value)}
                    placeholder='{"home": {"user": {"file.txt": "content"}}}'
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Initial Directory</label>
                  <input
                    type="text"
                    value={form.data.initialDirectory || '/'}
                    onChange={(e) => updateData('initialDirectory', e.target.value)}
                    placeholder="/home/user"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {form.type === 'network' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Network Packets (JSON Array)</label>
                  <textarea
                    value={form.data.packets || ''}
                    onChange={(e) => updateData('packets', e.target.value)}
                    placeholder='[{"source": "192.168.1.1", "dest": "192.168.1.2"}]'
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                  />
                </div>
              </>
            )}

            {form.type === 'logic' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Pattern/Rules</label>
                  <textarea
                    value={form.data.pattern || ''}
                    onChange={(e) => updateData('pattern', e.target.value)}
                    placeholder="Describe the pattern or logic rules"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Question</label>
                  <input
                    type="text"
                    value={form.data.question || ''}
                    onChange={(e) => updateData('question', e.target.value)}
                    placeholder="What comes next?"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Preview Section */}
      <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Generated Code</h2>
            <div className="flex gap-2">
              <Button onClick={resetForm} variant="secondary">
                Reset
              </Button>
              <Button onClick={copyToClipboard} variant="primary">
                {copied ? '✓ Copied!' : 'Copy Code'}
              </Button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-cyan-400 font-mono whitespace-pre-wrap">
              {generatePuzzleCode()}
            </pre>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4">Metadata Preview</h3>
          <div className="space-y-3 bg-gray-900 p-4 rounded-lg">
            <div>
              <span className="text-sm text-gray-400">Type:</span>
              <p className="text-cyan-400 font-medium">{form.type}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Title:</span>
              <p className="text-white font-medium">{form.title || '(No title)'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-400">Description:</span>
              <p className="text-gray-300 text-sm">{form.description || '(No description)'}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <span className="text-sm text-gray-400">Difficulty:</span>
                <p className="text-yellow-400 font-medium">{'★'.repeat(form.difficulty)}{'☆'.repeat(5 - form.difficulty)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Points:</span>
                <p className="text-green-400 font-medium">{form.points}</p>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-400">Hints:</span>
              <p className="text-purple-400 font-medium">{form.hints.filter(h => h.trim()).length} hints</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4">Live Challenge Preview</h3>
          {previewPuzzle ? (
            <div className="bg-terminal-bg rounded-lg overflow-hidden">
              <PuzzleRenderer 
                puzzle={previewPuzzle} 
                onComplete={() => alert('Preview mode - completion disabled')}
              />
            </div>
          ) : (
            <div className="bg-terminal-bg border border-terminal-border rounded-lg p-6 text-center">
              <p className="text-gray-400 font-mono">
                Fill in at least the title and description to see a live preview
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChallengeBuilder;
