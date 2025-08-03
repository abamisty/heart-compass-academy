import React from 'react';

interface AnimatedPenguinLogoProps {
  className?: string;
}

export const AnimatedPenguinLogo: React.FC<AnimatedPenguinLogoProps> = ({ className = "w-40 h-40" }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Mother Penguin Body */}
      <ellipse cx="100" cy="120" rx="45" ry="60" fill="#2D9B9E" />
      
      {/* Mother Penguin Belly */}
      <ellipse cx="100" cy="130" rx="30" ry="45" fill="#B8E6E8" />
      
      {/* Mother Penguin Wings */}
      <ellipse cx="70" cy="110" rx="18" ry="35" fill="#1A7A7D" transform="rotate(-20 70 110)" />
      <ellipse cx="130" cy="110" rx="18" ry="35" fill="#1A7A7D" transform="rotate(20 130 110)" />
      
      {/* Mother Penguin Head */}
      <circle cx="100" cy="70" r="35" fill="#2D9B9E" />
      
      {/* Mother Penguin Face */}
      <ellipse cx="100" cy="75" rx="25" ry="28" fill="#B8E6E8" />
      
      {/* Mother Penguin Eyes */}
      <circle cx="88" cy="65" r="8" fill="white" />
      <circle cx="112" cy="65" r="8" fill="white" />
      
      {/* Animated Eye Pupils */}
      <circle cx="88" cy="65" r="4" fill="black">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 2,1; 0,0; -1,2; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="112" cy="65" r="4" fill="black">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 2,1; 0,0; -1,2; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Eye shine */}
      <circle cx="90" cy="63" r="2" fill="white" opacity="0.8">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 2,1; 0,0; -1,2; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="114" cy="63" r="2" fill="white" opacity="0.8">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 2,1; 0,0; -1,2; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Mother Penguin Beak */}
      <path d="M100 78 L95 85 L105 85 Z" fill="#F4A460" />
      
      {/* Mother Penguin Feet */}
      <ellipse cx="85" cy="175" rx="12" ry="8" fill="#F4A460" />
      <ellipse cx="115" cy="175" rx="12" ry="8" fill="#F4A460" />
      
      {/* Baby Penguin Body */}
      <ellipse cx="65" cy="155" rx="22" ry="30" fill="#F5F5DC" />
      
      {/* Baby Penguin Head */}
      <circle cx="65" cy="135" r="18" fill="#F5F5DC" />
      
      {/* Baby Penguin Eye */}
      <circle cx="65" cy="132" r="5" fill="black" />
      <circle cx="67" cy="130" r="1.5" fill="white" opacity="0.8" />
      
      {/* Baby Penguin Beak */}
      <path d="M65 138 L62 142 L68 142 Z" fill="#FF8C00" />
      
      {/* Animated Baby Penguin Legs */}
      <g>
        <ellipse cx="58" cy="180" rx="6" ry="4" fill="#FF8C00">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 58 180; 5 58 180; 0 58 180; -5 58 180; 0 58 180"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="72" cy="180" rx="6" ry="4" fill="#FF8C00">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 72 180; -5 72 180; 0 72 180; 5 72 180; 0 72 180"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>
      
      {/* Subtle breathing animation for both penguins */}
      <animateTransform
        attributeName="transform"
        type="scale"
        values="1; 1.02; 1"
        dur="4s"
        repeatCount="indefinite"
      />
    </svg>
  );
};