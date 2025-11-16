# Admin Panel Guide

## Accessing the Admin Panel

Navigate to `/admin` in your browser or click the "Admin" link in the footer of the game.

## Challenge Builder Features

### 1. Basic Configuration

- **Puzzle ID**: Unique identifier (e.g., `crypto-001`, `code-002`)
- **Puzzle Type**: Select from 5 types:
  - Cryptography: Encoding/decoding challenges
  - Code Analysis: Reverse engineering and debugging
  - Logic Puzzle: Pattern recognition and problem-solving
  - Network Security: Network protocols and security
  - Terminal Commands: Command-line navigation

- **Title**: Display name for the challenge
- **Description**: Instructions and context for the player
- **Difficulty**: 1-5 star rating
- **Points**: Score value (typically 100-500)
- **Time Limit**: Optional time constraint in seconds

### 2. Solution & Validation

- **Solution**: The correct answer players must provide
- The validator function is auto-generated based on puzzle type

### 3. Hints System

- Add multiple hints with the "+ Add Hint" button
- Remove unwanted hints with the × button
- Hints appear in order to help players progressively

### 4. Puzzle-Specific Data

The data fields change based on the selected puzzle type:

#### Cryptography Puzzles
- **Encoded Text**: Base64 or other encoded strings

#### Code Analysis
- **Code Snippet**: JavaScript or other code to analyze

#### Terminal Puzzles
- **File System**: JSON structure representing directories and files
- **Initial Directory**: Starting path for the terminal

#### Network Puzzles
- **Network Packets**: JSON array of packet data

#### Logic Puzzles
- **Pattern/Rules**: Description of the logical pattern
- **Question**: The specific question to answer

### 5. Preview & Export

The right panel shows:
- **Generated Code**: TypeScript puzzle object ready to paste
- **Preview**: Visual summary of your challenge configuration

### 6. Copy to Project

1. Fill in all the challenge fields
2. Click "Copy Code" button
3. Open `src/data/puzzles.ts`
4. Paste the code into the `puzzles` array
5. Save and test your new challenge!

## Example Workflow

1. Navigate to `/admin`
2. Select puzzle type (e.g., "Cryptography")
3. Fill in ID: `crypto-003`
4. Add title: "Caesar Cipher Challenge"
5. Write description
6. Set difficulty and points
7. Add 3 hints
8. Enter solution
9. Fill puzzle data (encoded text)
10. Click "Copy Code"
11. Paste into puzzles.ts
12. Test in game!

## Tips

- Use consistent ID naming (type-###)
- Test validators with different inputs
- Balance difficulty with point values
- Provide helpful hints that don't give away the answer
- Preview your challenge before copying
- Keep descriptions clear and engaging
