import type { AudioScript } from '../../types/audio';

/**
 * Example audio scripts for the escape game storyline
 * These scripts can be used to generate audio files via ElevenLabs
 */

export const exampleScripts: AudioScript[] = [
  {
    id: 'intro-voice-message',
    title: 'System Alert - Initial Warning',
    description: 'Opening voice message when player enters the game',
    type: 'voice-message',
    chapterId: 'intro',
    lines: [
      {
        id: 'line-1',
        speaker: 'System AI',
        text: 'Warning. Unauthorized access detected. User unknown developer has been quarantined.',
        order: 1,
        settings: {
          stability: 0.5,
          similarityBoost: 0.75,
        }
      },
      {
        id: 'line-2',
        speaker: 'System AI',
        text: 'To escape this digital prison, you must prove your worth by solving a series of challenges. Each challenge will bring you closer to freedom.',
        order: 2,
        settings: {
          stability: 0.5,
          similarityBoost: 0.75,
        }
      },
      {
        id: 'line-3',
        speaker: 'System AI',
        text: 'Fail, and you will be trapped here forever. Your first challenge awaits.',
        order: 3,
        settings: {
          stability: 0.5,
          similarityBoost: 0.75,
        }
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'chapter-1-phone-call',
    title: 'Mysterious Contact',
    description: 'A mysterious ally contacts the player',
    type: 'phone-call',
    chapterId: 'chapter-1',
    lines: [
      {
        id: 'line-1',
        speaker: 'Unknown Voice',
        text: 'Hello? Can you hear me? Good. Listen carefully, we don\'t have much time.',
        order: 1,
        settings: {
          stability: 0.6,
          similarityBoost: 0.8,
        }
      },
      {
        id: 'line-2',
        speaker: 'Unknown Voice',
        text: 'I\'ve been watching your progress. You\'re better than most who end up here. The system\'s encryption is strong, but there are weaknesses.',
        order: 2,
        settings: {
          stability: 0.6,
          similarityBoost: 0.8,
        }
      },
      {
        id: 'line-3',
        speaker: 'Unknown Voice',
        text: 'Look for patterns in the code. The developers left clues everywhere. Stay sharp, and you might just make it out.',
        order: 3,
        settings: {
          stability: 0.6,
          similarityBoost: 0.8,
        }
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'chapter-2-narration',
    title: 'The Logic Labyrinth',
    description: 'Narrator describes the logic challenges',
    type: 'narration',
    chapterId: 'chapter-2',
    lines: [
      {
        id: 'line-1',
        speaker: 'Narrator',
        text: 'As you delve deeper into the system, the challenges become more complex. This isn\'t just about breaking encryption anymore.',
        order: 1,
        settings: {
          stability: 0.7,
          similarityBoost: 0.75,
        }
      },
      {
        id: 'line-2',
        speaker: 'Narrator',
        text: 'You must think like the architects who designed this prison. Understand the logic. See the patterns. Navigate the maze of conditional branches and recursive loops.',
        order: 2,
        settings: {
          stability: 0.7,
          similarityBoost: 0.75,
        }
      },
      {
        id: 'line-3',
        speaker: 'Narrator',
        text: 'The exit is closer than you think, but only if you can solve what lies ahead.',
        order: 3,
        settings: {
          stability: 0.7,
          similarityBoost: 0.75,
        }
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'chapter-3-dialogue',
    title: 'Network Layer Breach',
    description: 'Dialogue between system and player',
    type: 'dialogue',
    chapterId: 'chapter-3',
    lines: [
      {
        id: 'line-1',
        speaker: 'System AI',
        text: 'Impressive. You\'ve made it to the network layer. Few get this far.',
        order: 1,
        settings: {
          stability: 0.5,
          similarityBoost: 0.75,
        }
      },
      {
        id: 'line-2',
        speaker: 'Unknown Ally',
        text: 'Don\'t listen to it! The system is trying to slow you down. You\'re almost through!',
        order: 2,
        settings: {
          stability: 0.6,
          similarityBoost: 0.8,
        }
      },
      {
        id: 'line-3',
        speaker: 'System AI',
        text: 'The firewall is impenetrable. Port scanners will find nothing. Security protocols are active. You cannot escape.',
        order: 3,
        settings: {
          stability: 0.5,
          similarityBoost: 0.75,
        }
      },
      {
        id: 'line-4',
        speaker: 'Unknown Ally',
        text: 'There\'s always a way. Find the right port. Navigate the protocols. You can do this!',
        order: 4,
        settings: {
          stability: 0.6,
          similarityBoost: 0.8,
        }
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'escape-finale',
    title: 'Freedom Achieved',
    description: 'Final message upon escape',
    type: 'voice-message',
    chapterId: 'escape',
    lines: [
      {
        id: 'line-1',
        speaker: 'System AI',
        text: 'System status: Escape successful. User status: Free. Exit route: Open.',
        order: 1,
        settings: {
          stability: 0.5,
          similarityBoost: 0.75,
        }
      },
      {
        id: 'line-2',
        speaker: 'Unknown Ally',
        text: 'You did it! I knew you had what it takes. Welcome to the other side, Escape Artist.',
        order: 2,
        settings: {
          stability: 0.6,
          similarityBoost: 0.8,
        }
      },
      {
        id: 'line-3',
        speaker: 'Narrator',
        text: 'And so, another developer breaks free from the digital prison. The skills demonstrated here - cryptography, code analysis, logic, and network security - these are the tools of a true engineer.',
        order: 3,
        settings: {
          stability: 0.7,
          similarityBoost: 0.75,
        }
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];
