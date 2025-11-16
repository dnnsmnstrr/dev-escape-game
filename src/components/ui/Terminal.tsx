import React from 'react';

interface TerminalProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  children,
  title = 'terminal@escape-game:~$',
  className = ''
}) => {
  return (
    <div className={`bg-black border border-green-500/30 rounded-lg overflow-hidden ${className}`}>
      <div className="bg-gray-900 border-b border-green-500/30 px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-green-400 text-sm font-mono">
          {title}
        </div>
      </div>
      <div className="p-4 font-mono text-sm text-green-400">
        {children}
      </div>
    </div>
  );
};