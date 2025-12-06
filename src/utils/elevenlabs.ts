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
 * Get recommended voice IDs for different character types
 * Note: These are example voice IDs. Use fetchVoices() to get actual available voices.
 */
export const RECOMMENDED_VOICES = {
  'System AI': {
    description: 'Robotic, authoritative voice for system messages',
    fallback: 'EXAVITQu4vr4xnSDxMaL', // Example voice ID
  },
  'Unknown Ally': {
    description: 'Friendly, helpful voice for the mysterious ally',
    fallback: 'ErXwobaYiN019PkySvjV', // Example voice ID
  },
  'Narrator': {
    description: 'Clear, professional narration voice',
    fallback: 'VR6AewLTigWG4xSOukaG', // Example voice ID
  },
  'Unknown Voice': {
    description: 'Mysterious, slightly distorted voice',
    fallback: 'pNInz6obpgDQGcFmaJgB', // Example voice ID
  },
};
