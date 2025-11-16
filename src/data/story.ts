import { StoryChapter } from '../types';

export const storyChapters: StoryChapter[] = [
  {
    id: 'intro',
    title: 'The System Breach',
    content: `You wake up to find yourself trapped in a mysterious digital realm. The last thing you remember is investigating a strange security breach at your company's server farm.

A terminal flickers to life in front of you:

\`\`\`
> SYSTEM ALERT: Unauthorized access detected
> User: unknown_dev
> Status: QUARANTINED
> Escape route: LOCKED

> To escape, you must prove your worth by solving a series of challenges.
> Each challenge will bring you closer to freedom.
> Fail, and you'll be trapped in this digital prison forever.

> Type 'start' to begin your escape...
\`\`\`

The challenges ahead will test your knowledge of cryptography, code analysis, logical reasoning, and network security. Only the most skilled developers can escape this digital maze.`,
    puzzleIds: ['crypto-001'],
    completed: false
  },
  {
    id: 'chapter-1',
    title: 'Breaking the Encryption',
    content: `You've successfully decoded the first message! The terminal responds with new information:

\`\`\`
> ACCESS GRANTED: Level 1
> Decryption skills confirmed.

> But the system is fighting back. More complex encryption stands in your way.
> The developers who built this prison were clever - they've hidden keys in obfuscated code and left trails of logic puzzles.

> Next challenge: Navigate the code maze...
\`\`\`

The path forward requires understanding not just what code does, but how it thinks. Can you see through the obfuscation to find the hidden keys?`,
    puzzleIds: ['code-001', 'crypto-002'],
    completed: false
  },
  {
    id: 'chapter-2',
    title: 'The Logic Labyrinth',
    content: `Your code analysis skills are impressive! The system acknowledges your progress:

\`\`\`
> ACCESS GRANTED: Level 2
> Code analysis confirmed.

> You're getting closer to the core systems. But first, you must understand the architecture.
> The digital prison is built like a complex software project - with branches, merges, and deployment strategies.

> Navigate the version control maze to find the main path forward...
\`\`\`

The challenges now require understanding not just individual pieces of code, but entire systems and their relationships. Think like a senior architect planning a complex deployment.`,
    puzzleIds: ['logic-001'],
    completed: false
  },
  {
    id: 'chapter-3',
    title: 'Network Navigation',
    content: `Excellent work! You've proven your understanding of software architecture:

\`\`\`
> ACCESS GRANTED: Level 3
> System architecture confirmed.

> You're now approaching the network layer - the final barrier between you and freedom.
> The prison's defenses are strongest here, with firewalls, port scanners, and security protocols.

> Navigate the network maze to find the exit port...
\`\`\`

This is it - the final set of challenges. Your network security knowledge will be put to the ultimate test. Find the right path through the digital infrastructure to escape!`,
    puzzleIds: ['network-001'],
    completed: false
  },
  {
    id: 'escape',
    title: 'Freedom Achieved',
    content: `🎉 **CONGRATULATIONS!** 🎉

\`\`\`
> SYSTEM STATUS: ESCAPE SUCCESSFUL
> User: unknown_dev → ESCAPE_ARTIST
> Status: FREE
> Exit route: OPEN

> You've successfully broken out of the digital prison!
> Your skills in cryptography, code analysis, logic, and network security have proven you worthy.

> The developers who built this system would be proud.
> You've shown that with knowledge, persistence, and creativity, any digital barrier can be overcome.

> Welcome to the other side, Escape Artist.
> May your coding adventures be ever challenging and your solutions ever elegant.
\`\`\`

You've escaped the digital prison and proven your worth as a developer. The skills you've demonstrated - from cracking encryption to analyzing obfuscated code, from logical reasoning to network navigation - are the same skills that make great developers in the real world.

**Final Stats:**
- Puzzles Completed: All
- Time: Your completion time
- Hints Used: Your hint usage
- Score: Your final score

The digital maze is behind you. What challenges will you conquer next?`,
    puzzleIds: [],
    completed: false
  }
];