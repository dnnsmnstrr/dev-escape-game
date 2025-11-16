import { Puzzle } from '../types';

export const puzzles: Puzzle[] = [
  {
    id: 'crypto-001',
    type: 'crypto',
    title: 'Base64 Deception',
    description: 'You found a strange encoded message in the server logs. It looks like Base64, but something seems off. Decode it to reveal the next clue.',
    difficulty: 1,
    hints: [
      'This looks like standard Base64 encoding',
      'Try using an online Base64 decoder or the atob() function',
      'The decoded message might contain a flag or instruction'
    ],
    solution: 'FLAG: first-blood',
    validator: (answer: string) => {
      return answer.toLowerCase().includes('first-blood') || 
             answer.toLowerCase().includes('flag');
    },
    data: {
      encoded: 'RkxBRzogZmlyc3QtYmxvb2Q='
    },
    points: 100
  },
  {
    id: 'code-001',
    type: 'code',
    title: 'Obfuscated JavaScript',
    description: 'You intercepted a piece of JavaScript code that seems to be heavily obfuscated. Find the hidden function that reveals the access key.',
    difficulty: 2,
    hints: [
      'Look for patterns in the obfuscated code',
      'Try to identify variable assignments and function calls',
      'The code might use string manipulation or character codes'
    ],
    solution: 'ACCESS_KEY: dev-mode-42',
    validator: (answer: string) => {
      return answer.toLowerCase().includes('access_key') || 
             answer.toLowerCase().includes('dev-mode');
    },
    data: {
      code: `var _0x1a2b=['YWNjZXNzX2tleQ==','ZGV2LW1vZGUtNDI=','bG9n'];function _0x3c4d(_0x5e6f){return atob(_0x5e6f);}console[_0x1a2b[2]](_0x3c4d(_0x1a2b[0])+': '+_0x3c4d(_0x1a2b[1]));`
    },
    points: 150
  },
  {
    id: 'logic-001',
    type: 'logic',
    title: 'Git Branch Mystery',
    description: 'You\'re looking at a Git repository with multiple branches. Based on the commit history and branch structure, determine which branch contains the main codebase and what the latest commit message is.',
    difficulty: 2,
    hints: [
      'Look for the branch with the most commits',
      'Main branches are usually named main, master, or develop',
      'The latest commit will be at the tip of the branch'
    ],
    solution: 'main branch: "Fix critical security vulnerability"',
    validator: (answer: string) => {
      return answer.toLowerCase().includes('main') && 
             (answer.toLowerCase().includes('security') || 
              answer.toLowerCase().includes('vulnerability'));
    },
    data: {
      branches: {
        'main': ['Initial commit', 'Add user auth', 'Fix critical security vulnerability'],
        'feature/login': ['Initial commit', 'Add user auth', 'Start OAuth implementation'],
        'hotfix/patch': ['Initial commit', 'Add user auth', 'Quick bug fix'],
        'develop': ['Initial commit', 'Add user auth', 'Merge feature branch']
      }
    },
    points: 125
  },
  {
    id: 'network-001',
    type: 'network',
    title: 'Port Scanner Results',
    description: 'You ran a port scan on a target server and found several open ports. Based on the services running on these ports, identify which port is running the web server and what framework it\'s using.',
    difficulty: 3,
    hints: [
      'Common web server ports include 80, 443, 8080, 3000',
      'Look for HTTP headers or service banners',
      'Different frameworks have default port configurations'
    ],
    solution: 'Port 3000: Express.js',
    validator: (answer: string) => {
      return answer.includes('3000') && 
             (answer.toLowerCase().includes('express') || 
              answer.toLowerCase().includes('node'));
    },
    data: {
      scanResults: [
        { port: 22, service: 'SSH', banner: 'OpenSSH 7.4' },
        { port: 80, service: 'HTTP', banner: 'nginx/1.18.0' },
        { port: 3000, service: 'HTTP', banner: 'Express.js' },
        { port: 5432, service: 'PostgreSQL', banner: 'PostgreSQL 13.3' },
        { port: 6379, service: 'Redis', banner: 'Redis 6.2.6' }
      ]
    },
    points: 175
  },
  {
    id: 'crypto-002',
    type: 'crypto',
    title: 'Caesar Cipher Challenge',
    description: 'You found an encrypted message that appears to use a Caesar cipher. The shift is unknown, but we know it contains the word "SECRET". Find the original message.',
    difficulty: 2,
    hints: [
      'Caesar cipher shifts each letter by a fixed number of positions',
      'Try all possible shifts (1-25) or look for patterns',
      'The word "SECRET" might help you identify the correct shift'
    ],
    solution: 'The secret password is HACKER2023',
    validator: (answer: string) => {
      return answer.toLowerCase().includes('hacker2023') || 
             answer.toLowerCase().includes('secret password');
    },
    data: {
      encrypted: 'Wkh vhfuhw sdvvzrug lv kdfnhu2023'
    },
    points: 140
  }
];