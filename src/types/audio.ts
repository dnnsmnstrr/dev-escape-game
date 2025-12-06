/**
 * Types for audio script management and ElevenLabs integration
 */

export interface AudioScript {
  id: string;
  title: string;
  description?: string;
  type: 'voice-message' | 'phone-call' | 'narration' | 'dialogue';
  chapterId?: string;
  lines: AudioLine[];
  createdAt: number;
  updatedAt: number;
}

export interface AudioLine {
  id: string;
  speaker: string;
  text: string;
  voiceId?: string; // ElevenLabs voice ID
  audioUrl?: string; // Path to generated audio file
  order: number;
  settings?: VoiceSettings;
}

export interface VoiceSettings {
  stability?: number; // 0-1
  similarityBoost?: number; // 0-1
  style?: number; // 0-1
  useSpeakerBoost?: boolean;
}

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category?: string;
  description?: string;
  preview_url?: string;
}

export interface AudioGenerationRequest {
  text: string;
  voiceId: string;
  settings?: VoiceSettings;
}

export interface AudioGenerationResult {
  success: boolean;
  audioUrl?: string;
  error?: string;
}
