# Audio Scripts

This directory contains storyline scripts that can be converted to audio using ElevenLabs text-to-speech.

## Files

- **example-scripts.ts** - Pre-built scripts for the main game storyline

## Script Structure

Each script contains:
- **id**: Unique identifier
- **title**: Human-readable title
- **description**: What the script is for
- **type**: `voice-message`, `phone-call`, `narration`, or `dialogue`
- **chapterId**: Optional link to a story chapter
- **lines**: Array of dialogue lines

Each line contains:
- **id**: Unique identifier
- **speaker**: Character name
- **text**: The dialogue text
- **voiceId**: ElevenLabs voice ID (optional)
- **audioUrl**: Generated audio URL (optional)
- **order**: Position in the script
- **settings**: Voice generation settings (optional)

## Usage

Import and use scripts in your components:

```typescript
import { exampleScripts } from './data/scripts/example-scripts';

// Find a specific script
const introScript = exampleScripts.find(s => s.id === 'intro-voice-message');

// Access lines
introScript?.lines.forEach(line => {
  console.log(`${line.speaker}: ${line.text}`);
});
```

## Creating New Scripts

1. Use the Script Editor in the Admin Panel (`/admin`)
2. Or create them programmatically:

```typescript
const newScript: AudioScript = {
  id: 'my-script',
  title: 'My New Script',
  type: 'voice-message',
  lines: [
    {
      id: 'line-1',
      speaker: 'Character',
      text: 'Dialogue text here',
      order: 1,
    }
  ],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
```

## Generating Audio

Use the utilities from `src/utils/elevenlabs.ts`:

```typescript
import { generateAudio } from '../../utils/elevenlabs';

const result = await generateAudio({
  text: line.text,
  voiceId: 'voice-id-here',
  settings: line.settings,
});

if (result.success) {
  console.log('Audio generated:', result.audioUrl);
}
```

## Example Script Types

### Voice Message
Single-speaker announcements or system messages:
```typescript
{
  type: 'voice-message',
  lines: [
    { speaker: 'System', text: 'Alert: Security breach detected.' }
  ]
}
```

### Phone Call
Simulated phone conversations:
```typescript
{
  type: 'phone-call',
  lines: [
    { speaker: 'Caller', text: 'Hello? Can you hear me?' },
    { speaker: 'Response', text: 'Yes, I can hear you.' }
  ]
}
```

### Narration
Story narration:
```typescript
{
  type: 'narration',
  lines: [
    { speaker: 'Narrator', text: 'As you venture deeper...' }
  ]
}
```

### Dialogue
Multi-character conversations:
```typescript
{
  type: 'dialogue',
  lines: [
    { speaker: 'Character A', text: 'What do we do now?' },
    { speaker: 'Character B', text: 'We keep moving forward.' }
  ]
}
```

## Best Practices

1. **Keep lines concise** - Shorter lines generate faster
2. **Use consistent voices** - Same character = same voice
3. **Add punctuation** - Affects pacing and delivery
4. **Test generation** - Preview audio before finalizing
5. **Version control** - Export scripts as JSON for backup

## See Also

- [Audio Scripts Guide](../../../AUDIO_SCRIPTS_GUIDE.md) - Complete usage guide
- [ElevenLabs Utils](../../utils/elevenlabs.ts) - API integration utilities
- [Audio Types](../../types/audio.ts) - TypeScript type definitions
