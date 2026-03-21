import React from 'react';
import { useThemeStore } from '../../lib/store/themeStore';

interface TaperedLineProps {
  direction?: 'center' | 'left' | 'right';
  className?: string;
}

const TaperedLine: React.FC<TaperedLineProps> = ({ direction = 'center', className = "" }) => {
  const { isDark } = useThemeStore();
  
  const getClipPath = () => {
    switch (direction) {
      case 'left': return 'polygon(0% 0%, 100% 50%, 0% 100%)';
      case 'right': return 'polygon(0% 50%, 100% 0%, 100% 100%)'; 
      default: return 'polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)'; 
    }
  };

  const getGradient = () => {
    const gold = isDark ? '#d4af37' : '#a67c52'; 
    
    switch (direction) {
      case 'left': return `linear-gradient(90deg, ${gold} 0%, transparent 100%)`;
      case 'right': return `linear-gradient(90deg, transparent 0%, ${gold} 100%)`;
      default: return `linear-gradient(90deg, transparent 0%, ${gold} 50%, transparent 100%)`;
    }
  };

  return (
    <div 
      className={`h-[2px] opacity-60 shadow-[0_0_10px_rgba(212,175,55,0.4)] ${className}`}
      style={{ 
        clipPath: getClipPath(),
        background: getGradient()
      }}
    />
  );
};

export default TaperedLine;