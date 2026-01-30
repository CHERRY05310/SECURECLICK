
import React from 'react';
import { Theme } from '../types';

interface ThemeWrapperProps {
  theme: Theme;
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ theme, children }) => {
  const getThemeConfig = () => {
    switch (theme) {
      case Theme.DARK:
        return {
          container: 'bg-gray-950 text-gray-100 selection:bg-indigo-500/30',
          border: 'border-indigo-600',
          vars: { '--accent': '#6366f1', '--accent-glow': 'rgba(99, 102, 241, 0.2)' }
        };
      case Theme.CYBER_BLUE:
        return {
          container: 'bg-[#020617] text-blue-100 selection:bg-cyan-500/30',
          border: 'border-cyan-500',
          vars: { '--accent': '#06b6d4', '--accent-glow': 'rgba(6, 182, 212, 0.2)' }
        };
      case Theme.NEON_GREEN:
        return {
          container: 'bg-black text-emerald-400 selection:bg-emerald-500/30 font-mono',
          border: 'border-emerald-500',
          vars: { '--accent': '#10b981', '--accent-glow': 'rgba(16, 185, 129, 0.2)' }
        };
      case Theme.LIGHT:
      default:
        return {
          container: 'bg-slate-50 text-slate-900 selection:bg-blue-200',
          border: 'border-indigo-600',
          vars: { '--accent': '#4f46e5', '--accent-glow': 'rgba(79, 70, 229, 0.1)' }
        };
    }
  };

  const config = getThemeConfig();

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ease-in-out ${config.container}`}
      style={config.vars as React.CSSProperties}
    >
      <div className={`border-t-[6px] ${config.border} shadow-2xl`}>
        {children}
      </div>
    </div>
  );
};
