import { useState, useEffect } from 'react';
import type { AudioScript, AudioLine, ElevenLabsVoice } from '../../types/audio';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { fetchVoices, generateAudio, downloadAudio, isElevenLabsConfigured } from '../../utils/elevenlabs';
import { exampleScripts } from '../../data/scripts/example-scripts';

const ScriptEditor = () => {
  const [scripts, setScripts] = useState<AudioScript[]>(exampleScripts);
  const [selectedScript, setSelectedScript] = useState<AudioScript | null>(null);
  const [voices, setVoices] = useState<ElevenLabsVoice[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    setIsConfigured(isElevenLabsConfigured());
    if (isElevenLabsConfigured()) {
      loadVoices();
    }
  }, []);

  const loadVoices = async () => {
    try {
      setLoading('voices');
      const availableVoices = await fetchVoices();
      setVoices(availableVoices);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load voices');
    } finally {
      setLoading(null);
    }
  };

  const handleGenerateAudio = async (line: AudioLine) => {
    if (!line.voiceId) {
      setError('Please select a voice for this line');
      return;
    }

    try {
      setLoading(line.id);
      setError(null);

      const result = await generateAudio({
        text: line.text,
        voiceId: line.voiceId,
        settings: line.settings,
      });

      if (result.success && result.audioUrl) {
        // Update the script with the audio URL
        if (selectedScript) {
          const updatedLines = selectedScript.lines.map(l =>
            l.id === line.id ? { ...l, audioUrl: result.audioUrl } : l
          );
          const updatedScript = { ...selectedScript, lines: updatedLines };
          setSelectedScript(updatedScript);
          
          // Update in scripts list
          setScripts(scripts.map(s => s.id === updatedScript.id ? updatedScript : s));
        }
      } else {
        setError(result.error || 'Failed to generate audio');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate audio');
    } finally {
      setLoading(null);
    }
  };

  const handleDownloadAudio = (line: AudioLine) => {
    if (!line.audioUrl) return;
    
    const filename = `${selectedScript?.id}_${line.id}.mp3`;
    downloadAudio(line.audioUrl, filename);
  };

  const handleGenerateAllAudio = async () => {
    if (!selectedScript) return;

    setError(null);
    for (const line of selectedScript.lines) {
      if (!line.voiceId) {
        setError(`Line ${line.order} is missing a voice selection`);
        return;
      }
    }

    for (const line of selectedScript.lines) {
      await handleGenerateAudio(line);
    }
  };

  const handleVoiceChange = (lineId: string, voiceId: string) => {
    if (!selectedScript) return;

    const updatedLines = selectedScript.lines.map(l =>
      l.id === lineId ? { ...l, voiceId } : l
    );
    const updatedScript = { ...selectedScript, lines: updatedLines };
    setSelectedScript(updatedScript);
    setScripts(scripts.map(s => s.id === updatedScript.id ? updatedScript : s));
  };

  const handleTextChange = (lineId: string, text: string) => {
    if (!selectedScript) return;

    const updatedLines = selectedScript.lines.map(l =>
      l.id === lineId ? { ...l, text } : l
    );
    const updatedScript = { ...selectedScript, lines: updatedLines };
    setSelectedScript(updatedScript);
    setScripts(scripts.map(s => s.id === updatedScript.id ? updatedScript : s));
  };

  const createNewScript = () => {
    const newScript: AudioScript = {
      id: `script-${Date.now()}`,
      title: 'New Script',
      type: 'voice-message',
      lines: [
        {
          id: `line-${Date.now()}`,
          speaker: 'Speaker',
          text: 'Enter your script text here...',
          order: 1,
        }
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setScripts([...scripts, newScript]);
    setSelectedScript(newScript);
  };

  const addLine = () => {
    if (!selectedScript) return;

    const newLine: AudioLine = {
      id: `line-${Date.now()}`,
      speaker: 'Speaker',
      text: 'New line...',
      order: selectedScript.lines.length + 1,
    };
    const updatedScript = {
      ...selectedScript,
      lines: [...selectedScript.lines, newLine],
    };
    setSelectedScript(updatedScript);
    setScripts(scripts.map(s => s.id === updatedScript.id ? updatedScript : s));
  };

  const deleteLine = (lineId: string) => {
    if (!selectedScript) return;

    const updatedLines = selectedScript.lines
      .filter(l => l.id !== lineId)
      .map((l, idx) => ({ ...l, order: idx + 1 }));
    const updatedScript = { ...selectedScript, lines: updatedLines };
    setSelectedScript(updatedScript);
    setScripts(scripts.map(s => s.id === updatedScript.id ? updatedScript : s));
  };

  const exportScript = () => {
    if (!selectedScript) return;

    const json = JSON.stringify(selectedScript, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedScript.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isConfigured) {
    return (
      <Card>
        <div className="p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">⚠️ ElevenLabs Not Configured</h3>
          <p className="text-gray-300 mb-4">
            To use the audio generation features, you need to configure ElevenLabs:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-4">
            <li>Sign up for an ElevenLabs account at <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">elevenlabs.io</a></li>
            <li>Get your API key from the ElevenLabs dashboard</li>
            <li>Create a <code className="bg-gray-800 px-2 py-1 rounded">.env</code> file in the project root</li>
            <li>Add: <code className="bg-gray-800 px-2 py-1 rounded">VITE_ELEVENLABS_API_KEY=your_api_key_here</code></li>
            <li>Restart the development server</li>
          </ol>
          <p className="text-sm text-gray-400">
            You can still create and edit scripts without ElevenLabs configured. Audio generation will be available once configured.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400">Audio Script Editor</h2>
        <Button onClick={createNewScript}>
          + New Script
        </Button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Script List */}
        <Card className="lg:col-span-1">
          <div className="p-4">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Scripts</h3>
            <div className="space-y-2">
              {scripts.map(script => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScript(script)}
                  className={`w-full text-left p-3 rounded transition-colors ${
                    selectedScript?.id === script.id
                      ? 'bg-purple-600/30 border border-purple-500'
                      : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  <div className="font-semibold text-white">{script.title}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {script.type} • {script.lines.length} lines
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Script Editor */}
        <Card className="lg:col-span-2">
          {selectedScript ? (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-cyan-400">{selectedScript.title}</h3>
                <div className="flex gap-2">
                  <Button onClick={exportScript} variant="secondary" size="sm">
                    Export JSON
                  </Button>
                  <Button onClick={handleGenerateAllAudio} size="sm" disabled={!!loading}>
                    {loading ? 'Generating...' : 'Generate All Audio'}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {selectedScript.lines.map(line => (
                  <div key={line.id} className="bg-gray-800 rounded p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={line.speaker}
                          onChange={e => {
                            const updatedLines = selectedScript.lines.map(l =>
                              l.id === line.id ? { ...l, speaker: e.target.value } : l
                            );
                            setSelectedScript({ ...selectedScript, lines: updatedLines });
                          }}
                          className="bg-gray-700 text-white px-3 py-1 rounded w-full"
                          placeholder="Speaker name"
                        />
                        <textarea
                          value={line.text}
                          onChange={e => handleTextChange(line.id, e.target.value)}
                          className="bg-gray-700 text-white px-3 py-2 rounded w-full min-h-[80px]"
                          placeholder="Script text..."
                        />
                      </div>
                      <button
                        onClick={() => deleteLine(line.id)}
                        className="ml-2 text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={line.voiceId || ''}
                        onChange={e => handleVoiceChange(line.id, e.target.value)}
                        className="bg-gray-700 text-white px-3 py-2 rounded flex-1"
                      >
                        <option value="">Select voice...</option>
                        {voices.map(voice => (
                          <option key={voice.voice_id} value={voice.voice_id}>
                            {voice.name}
                          </option>
                        ))}
                      </select>
                      <Button
                        onClick={() => handleGenerateAudio(line)}
                        size="sm"
                        disabled={!line.voiceId || loading === line.id}
                      >
                        {loading === line.id ? 'Generating...' : 'Generate'}
                      </Button>
                      {line.audioUrl && (
                        <Button
                          onClick={() => handleDownloadAudio(line)}
                          size="sm"
                          variant="secondary"
                        >
                          Download
                        </Button>
                      )}
                    </div>

                    {line.audioUrl && (
                      <audio controls className="w-full">
                        <source src={line.audioUrl} type="audio/mpeg" />
                      </audio>
                    )}
                  </div>
                ))}
              </div>

              <Button onClick={addLine} variant="secondary">
                + Add Line
              </Button>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              Select a script to edit or create a new one
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ScriptEditor;
