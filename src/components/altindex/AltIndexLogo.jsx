import React from 'react';

export const AltIndexLogo = ({ size = 'default', showText = true, className = '' }) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const iconSize = isSmall ? 'w-6 h-6' : isLarge ? 'w-9 h-9' : 'w-7 h-7';
  const textSize = isSmall ? 'text-base' : isLarge ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* AltIndex Stylized Geometric Purple Icon */}
      <div className={`${iconSize} relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform hover:scale-105"
        >
          <defs>
            <linearGradient id="altGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="altGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          {/* Stylized polygon "A" / Diamond prism */}
          <path
            d="M18 3L32 28H23L18 19L13 28H4L18 3Z"
            fill="url(#altGrad1)"
          />
          <path
            d="M18 13L26 28H20L18 24L16 28H10L18 13Z"
            fill="url(#altGrad2)"
            opacity="0.9"
          />
          <circle cx="18" cy="27" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-baseline">
          <span className={`${textSize} font-extrabold tracking-tight text-slate-900 dark:text-white`}>
            Alt<span className="text-indigo-600 dark:text-indigo-400">Index</span>
          </span>
          <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse hidden sm:inline-block" />
        </div>
      )}
    </div>
  );
};
