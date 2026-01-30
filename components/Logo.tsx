
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const SafeClickLogo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
      {/* Refractive Glow Backdrop */}
      <div className="absolute inset-0 bg-[var(--accent)] opacity-20 blur-xl rounded-full animate-pulse"></div>
      
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <filter id="glass">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>
        
        {/* Main Shield Path */}
        <path
          d="M50 5L15 20V50C15 75 50 95 50 95C50 95 85 75 85 50V20L50 5Z"
          fill="url(#shieldGradient)"
          fillOpacity="0.1"
          stroke="url(#shieldGradient)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        
        {/* Inner Geometric 'S' */}
        <path
          d="M65 35H45C40 35 35 40 35 45C35 50 40 55 45 55H55C60 55 65 60 65 65C65 70 60 75 55 75H35"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_var(--accent-glow)]"
        />
        
        {/* Refractive Accents */}
        <path
          d="M50 15L25 25V45"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeLinecap="round"
        />
      </svg>

      {/* Outer Rotating Data Ring */}
      <div className="absolute inset-[-10%] rounded-full border border-dashed border-[var(--accent)] opacity-10 animate-[spin_20s_linear_infinite]"></div>
    </div>
  );
};
