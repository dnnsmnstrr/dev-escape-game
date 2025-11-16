import type { Puzzle } from '../types';

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
      code: `var _0x1a2b=['YWNjZXNzX2tleQ==','ZGV2LW1vZGUtNDI=','bG9n'];function _0x3c4d(_0x5e6f){return atob(_0x5e6f);}console[_0x1a2b[2]];(_0x3c4d(_0x1a2b[0])+': '+_0x3c4d(_0x1a2b[1]));`
    },
    points: 150
  },
  {
    id: 'terminal-001',
    type: 'terminal',
    title: 'Terminal Navigator',
    description: 'You\'ve gained access to a server with a complex directory structure. Navigate through the filesystem using terminal commands to find the hidden file "secret_key.txt" and reveal its contents.',
    difficulty: 2,
    hints: [
      'Use "ls" to list files in the current directory',
      'Use "cd <directory>" to change directories',
      'Use "cat <filename>" to read file contents',
      'The file might be hidden deep in the folder structure'
    ],
    solution: 'ACCESS_KEY: xK9mP2qR8nL5wJ',
    validator: (answer: string) => {
      return answer.toLowerCase().includes('xk9mp2qr8nl5wj') || 
             (answer.toLowerCase().includes('access_key') && answer.includes('xK9mP2qR8nL5wJ'));
    },
    data: {
      filesystem: {
        '/': {
          type: 'directory',
          children: {
            'home': {
              type: 'directory',
              children: {
                'user': {
                  type: 'directory',
                  children: {
                    'documents': {
                      type: 'directory',
                      children: {
                        'notes.txt': {
                          type: 'file',
                          content: 'Remember to check the backup server regularly.'
                        },
                        'todo.txt': {
                          type: 'file',
                          content: '1. Update security protocols\n2. Check logs directory'
                        }
                      }
                    },
                    'downloads': {
                      type: 'directory',
                      children: {
                        'readme.md': {
                          type: 'file',
                          content: 'Nothing interesting here. Try the var directory.'
                        }
                      }
                    }
                  }
                }
              }
            },
            'var': {
              type: 'directory',
              children: {
                'www': {
                  type: 'directory',
                  children: {
                    'index.html': {
                      type: 'file',
                      content: '<html>Empty website</html>'
                    }
                  }
                },
                'log': {
                  type: 'directory',
                  children: {
                    'syslog.txt': {
                      type: 'file',
                      content: '[INFO] System running normally\n[WARN] Check backup folder for important files'
                    },
                    'backup': {
                      type: 'directory',
                      children: {
                        'old_configs': {
                          type: 'directory',
                          children: {
                            'config.ini': {
                              type: 'file',
                              content: '[Server]\nPort=8080\nHost=localhost'
                            }
                          }
                        },
                        'secret_key.txt': {
                          type: 'file',
                          content: 'ACCESS_KEY: xK9mP2qR8nL5wJ'
                        }
                      }
                    }
                  }
                }
              }
            },
            'etc': {
              type: 'directory',
              children: {
                'config': {
                  type: 'directory',
                  children: {
                    'app.conf': {
                      type: 'file',
                      content: 'Configuration file - nothing useful here'
                    }
                  }
                }
              }
            }
          }
        }
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