import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'terminal' | 'success' | 'error';
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  glow = false
}) => {
  const baseClasses = 'border rounded-lg p-6 transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-terminal-bg border-terminal-border text-hacker-green',
    terminal: 'bg-black border-green-500/30 text-green-400 font-mono',
    success: 'bg-green-900/20 border-green-500/50 text-green-300',
    error: 'bg-red-900/20 border-red-500/50 text-red-300'
  };

  const glowClasses = glow ? 'shadow-lg shadow-hacker-green/20' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${glowClasses} ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={classes}
      style={{
        boxShadow: glow ? '0 0 20px rgba(0, 255, 65, 0.3)' : undefined
      }}
    >
      {children}
    </motion.div>
  );
};