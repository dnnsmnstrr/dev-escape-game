import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-terminal-bg border-t border-terminal-border px-6 py-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-sm text-gray-400 font-mono">
          <span className="cursor">_</span> Developer Escape Game v1.0
        </div>
        <div className="text-xs text-gray-500 mt-2 font-mono">
          Built with React, TypeScript, and Terminal Aesthetics
        </div>
      </div>
    </footer>
  );
};