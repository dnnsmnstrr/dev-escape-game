import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showPercentage?: boolean;
  color?: 'green' | 'yellow' | 'red';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  showPercentage = true,
  color = 'green'
}) => {
  const colorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };

  const bgColorClasses = {
    green: 'bg-green-900/30',
    yellow: 'bg-yellow-900/30',
    red: 'bg-red-900/30'
  };

  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="text-sm text-gray-400 mb-1 font-mono">
          {Math.round(progress)}%
        </div>
      )}
      <div className={`w-full h-2 ${bgColorClasses[color]} rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full ${colorClasses[color]} transition-all duration-300`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};