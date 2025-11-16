# Developer Escape Game

A React-based escape game designed for developers, featuring cryptography challenges, code analysis puzzles, logical problems, and network security scenarios.

## 🎮 Game Features

- **Developer-Themed Puzzles**: Cryptography, code analysis, logic, and network security challenges
- **Progressive Difficulty**: 5 levels of difficulty across different puzzle types
- **Story-Driven Gameplay**: Engaging narrative that progresses as you solve puzzles
- **Hint System**: Contextual hints available when you're stuck
- **Score Tracking**: Points based on speed, accuracy, and hint usage
- **Terminal Aesthetic**: Immersive hacker-themed UI design

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom terminal theme
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Deployment**: Vercel/Netlify ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dev-escape-game

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/            # Reusable UI components
│   ├── puzzles/       # Puzzle-specific components
│   └── layout/        # Layout components
├── pages/             # Main game pages
├── hooks/             # Custom React hooks
├── stores/            # Zustand state management
├── types/             # TypeScript definitions
├── utils/             # Helper functions
├── puzzles/           # Puzzle definitions
└── assets/            # Static assets
```

## 🧩 Puzzle Types

### Cryptography Puzzles
- Base64 decoding challenges
- Caesar cipher variations
- Hash cracking simulations
- Encryption concept puzzles

### Code Analysis Puzzles
- Obfuscated JavaScript challenges
- Regex pattern matching
- Algorithm optimization
- Bug finding exercises

### Terminal Scavenging Puzzles
- File system navigation challenges
- Hidden data extraction from system files
- Command-line exercises with intelligent autocompletion

### Network Security Puzzles
- Port scanning simulations
- Packet capture analysis
- API endpoint discovery
- Security protocol puzzles

## 🎯 Game Mechanics

### Scoring System
- **Base Score**: 100 points per puzzle
- **Hint Penalty**: -10 points per hint used
- **Time Bonus**: Up to 50 points for quick completion
- **Minimum Score**: 10 points (always get something for trying!)

### Progression
- Complete puzzles to unlock story chapters
- Each chapter contains 1-2 related puzzles
- Complete all puzzles to escape the digital prison

### Hints
- Each puzzle has 3 contextual hints
- Hints are revealed progressively
- Using hints reduces your score

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect and build the React app
3. Deploy with one click

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Manual Deployment
```bash
npm run build
# Upload the `dist` folder to your hosting provider
```

## 🎨 Customization

### Adding New Puzzles
1. Create puzzle definition in `src/data/puzzles.ts`
2. Implement puzzle component in `src/components/puzzles/`
3. Add puzzle type to `PuzzleRenderer.tsx`
4. Update story chapters as needed

### Theming
- Modify `tailwind.config.js` for color schemes
- Update `src/index.css` for custom animations
- Adjust component styles in individual files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by escape room games and CTF challenges
- Created for the developer community

---

**Ready to escape the digital prison?** 🚀
