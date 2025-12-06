import type { AudioGenerationRequest, AudioGenerationResult, ElevenLabsVoice, VoiceSettings } from '../types/audio';

/**
 * ElevenLabs API Integration
 * 
 * This module provides utilities for generating audio using ElevenLabs API.
 * 
 * Setup:
 * 1. Get an API key from https://elevenlabs.io
 * 2. Set the VITE_ELEVENLABS_API_KEY environment variable
 * 3. Use the functions below to generate audio from scripts
 */

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

/**
 * Get the ElevenLabs API key from environment variables
 */
function getApiKey(): string | undefined {
  return import.meta.env.VITE_ELEVENLABS_API_KEY;
}

/**
 * Check if ElevenLabs is configured
 */
export function isElevenLabsConfigured(): boolean {
  return !!getApiKey();
}

/**
 * Fetch available voices from ElevenLabs
 */
export async function fetchVoices(): Promise<ElevenLabsVoice[]> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('ElevenLabs API key not configured. Set VITE_ELEVENLABS_API_KEY environment variable.');
  }

  try {
    const response = await fetch(`${ELEVENLABS_API_BASE}/voices`, {
      method: 'GET',
      headers: {
        'xi-api-key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.statusText}`);
    }

    const data = await response.json();
    return data.voices || [];
  } catch (error) {
    console.error('Error fetching ElevenLabs voices:', error);
    throw error;
  }
}

/**
 * Generate audio from text using ElevenLabs
 */
export async function generateAudio(
  request: AudioGenerationRequest
): Promise<AudioGenerationResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      success: false,
      error: 'ElevenLabs API key not configured. Set VITE_ELEVENLABS_API_KEY environment variable.',
    };
  }

  try {
    const { text, voiceId, settings } = request;

    // Default settings
    const voiceSettings: VoiceSettings = {
      stability: settings?.stability ?? 0.5,
      similarityBoost: settings?.similarityBoost ?? 0.75,
      style: settings?.style ?? 0,
      useSpeakerBoost: settings?.useSpeakerBoost ?? true,
    };

    const response = await fetch(
      `${ELEVENLABS_API_BASE}/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: voiceSettings.stability,
            similarity_boost: voiceSettings.similarityBoost,
            style: voiceSettings.style,
            use_speaker_boost: voiceSettings.useSpeakerBoost,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate audio: ${response.statusText} - ${errorText}`);
    }

    // Get the audio blob
    const audioBlob = await response.blob();
    
    // Create a URL for the audio blob
    const audioUrl = URL.createObjectURL(audioBlob);

    return {
      success: true,
      audioUrl,
    };
  } catch (error) {
    console.error('Error generating audio:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Download audio blob as a file
 */
export function downloadAudio(audioUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = audioUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Get recommended voice characteristics for different character types
 * Use fetchVoices() to get actual available voices for your account,
 * then select voices that match these characteristics.
 */
export const RECOMMENDED_VOICE_CHARACTERISTICS = {
  'System AI': {
    description: 'Robotic, authoritative voice for system messages',
    suggestions: ['Look for deep, neutral voices with clear articulation'],
  },
  'Unknown Ally': {
    description: 'Friendly, helpful voice for the mysterious ally',
    suggestions: ['Choose warm, approachable voices with medium pitch'],
  },
  'Narrator': {
    description: 'Clear, professional narration voice',
    suggestions: ['Select voices designed for storytelling or audiobooks'],
  },
  'Unknown Voice': {
    description: 'Mysterious, slightly distorted voice',
    suggestions: ['Try varied or character voices with unique qualities'],
  },
};

/**
 * Validate if a voice ID exists in the available voices
 */
export async function validateVoiceId(voiceId: string): Promise<boolean> {
  try {
    const voices = await fetchVoices();
    return voices.some(v => v.voice_id === voiceId);
  } catch {
    return false;
  }
}
