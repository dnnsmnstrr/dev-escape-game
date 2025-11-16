import React from 'react';

export const Footer: React.FC = () => {
  const handleAdminClick = () => {
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleHomeClick = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <footer className="bg-terminal-bg border-t border-terminal-border px-6 py-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 font-mono">
            <button 
              onClick={handleHomeClick}
              className="hover:text-cyan-400 transition-colors"
            >
              Home
            </button>
            {' | '}
            <button 
              onClick={handleAdminClick}
              className="hover:text-cyan-400 transition-colors"
            >
              Admin
            </button>
          </div>
          <div className="text-sm text-gray-400 font-mono">
            <span className="cursor">_</span> Developer Escape Game v1.0
          </div>
          <div className="text-xs text-gray-500 font-mono">
            Built with React & TypeScript
          </div>
        </div>
      </div>
    </footer>
  );
};