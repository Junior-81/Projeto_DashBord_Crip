import React from 'react';

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => {  // Adiciona um ID único para evitar conflitos em caso de múltiplas instâncias
  const gradientId = React.useId();
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100"
      className={className}
      width="36"
      height="36"
      role="img"
      aria-label="CryptoBoard Logo"
    >
      <defs>
        <linearGradient id={`logoGradient-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        fill={`url(#logoGradient-${gradientId})`}
        stroke="white" 
        strokeWidth="2"
      />
      <path 
        d="M60 35 L45 35 C40 35 35 40 35 50 C35 60 40 65 45 65 L60 65" 
        fill="none" 
        stroke="white" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      <line 
        x1="55" 
        y1="30" 
        x2="55" 
        y2="70" 
        stroke="white" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />
    </svg>
  );
};

export default LogoIcon;
