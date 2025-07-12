import { useState, useEffect } from "react";

interface AnimatedCharacterProps {
  character: string;
  emotion: "happy" | "sad" | "worried" | "surprised" | "empathetic";
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const AnimatedCharacter = ({ 
  character, 
  emotion, 
  isActive = false, 
  size = "md",
  className = "" 
}: AnimatedCharacterProps) => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (isActive) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const sizeClasses = {
    sm: "w-16 h-20",
    md: "w-20 h-24", 
    lg: "w-24 h-28"
  };

  const getCharacterColor = (char: string) => {
    switch (char) {
      case "Maya": return { primary: "#FFB347", secondary: "#FF8C69" }; // Orange
      case "Alex": return { primary: "#87CEEB", secondary: "#4682B4" }; // Blue  
      case "Sam": return { primary: "#90EE90", secondary: "#32CD32" }; // Green
      case "Lily": return { primary: "#DDA0DD", secondary: "#BA55D3" }; // Purple
      case "Teacher": return { primary: "#F0E68C", secondary: "#DAA520" }; // Yellow
      default: return { primary: "#D3D3D3", secondary: "#A9A9A9" }; // Gray
    }
  };

  const getEmotionPath = (emotion: string) => {
    switch (emotion) {
      case "happy":
        return "M15 18c3 0 6-2 6-5"; // Smile
      case "sad": 
        return "M15 23c3 0 6 2 6 5"; // Frown
      case "worried":
        return "M15 20.5h6"; // Straight line
      case "surprised":
        return "M15 18c0 2 3 4 6 4s6-2 6-4"; // O mouth
      case "empathetic":
        return "M15 18c2 0 4-1 6-2"; // Gentle smile
      default:
        return "M15 20.5h6"; // Neutral
    }
  };

  const getEyeExpression = (emotion: string) => {
    switch (emotion) {
      case "happy":
        return { leftEye: "M8 12c0-1 1-2 2-2s2 1 2 2", rightEye: "M18 12c0-1 1-2 2-2s2 1 2 2" };
      case "sad":
        return { leftEye: "M8 14c0 1 1 2 2 2s2-1 2-2", rightEye: "M18 14c0 1 1 2 2 2s2-1 2-2" };
      case "worried":
        return { leftEye: "M8 11l2 2 2-2", rightEye: "M18 11l2 2 2-2" };
      case "surprised":
        return { leftEye: "M10 12c0-1.5 1-3 2-3s2 1.5 2 3", rightEye: "M20 12c0-1.5 1-3 2-3s2 1.5 2 3" };
      default:
        return { leftEye: "M10 12c0-1 1-2 2-2s2 1 2 2", rightEye: "M20 12c0-1 1-2 2-2s2 1 2 2" };
    }
  };

  const colors = getCharacterColor(character);
  const eyes = getEyeExpression(emotion);

  return (
    <div className={`${sizeClasses[size]} ${className} flex flex-col items-center`}>
      <div className={`relative ${bounce ? 'animate-bounce' : isActive ? 'animate-pulse' : ''} transition-all duration-300`}>
        {/* Character SVG */}
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full drop-shadow-lg"
          style={{ filter: isActive ? 'brightness(1.1)' : 'brightness(1)' }}
        >
          {/* Background glow when active */}
          {isActive && (
            <circle
              cx="20"
              cy="20"
              r="22"
              fill={colors.primary}
              opacity="0.3"
              className="animate-pulse"
            />
          )}
          
          {/* Body */}
          <ellipse
            cx="20"
            cy="32"
            rx="8"
            ry="6"
            fill={colors.secondary}
            className="transition-all duration-300"
          />
          
          {/* Head */}
          <circle
            cx="20"
            cy="18"
            r="12"
            fill={colors.primary}
            className="transition-all duration-300"
          />
          
          {/* Hair/Top */}
          <path
            d="M8 14c0-8 8-10 12-8s12 0 12 8"
            fill={colors.secondary}
            opacity="0.8"
          />
          
          {/* Eyes */}
          <circle cx="15" cy="16" r="1.5" fill="#000" />
          <circle cx="25" cy="16" r="1.5" fill="#000" />
          
          {/* Eye expressions */}
          <path d={eyes.leftEye} stroke="#000" strokeWidth="0.5" fill="none" />
          <path d={eyes.rightEye} stroke="#000" strokeWidth="0.5" fill="none" />
          
          {/* Mouth */}
          <path
            d={getEmotionPath(emotion)}
            stroke="#000"
            strokeWidth="1"
            fill="none"
            className="transition-all duration-300"
          />
          
          {/* Arms */}
          <ellipse cx="10" cy="28" rx="2" ry="5" fill={colors.primary} transform="rotate(-20 10 28)" />
          <ellipse cx="30" cy="28" rx="2" ry="5" fill={colors.primary} transform="rotate(20 30 28)" />
        </svg>
      </div>
      
      {/* Character name */}
      <div className="text-xs font-medium text-white mt-1 text-center opacity-90">
        {character}
      </div>
      
      {/* Speaking indicator */}
      {isActive && (
        <div className="flex space-x-1 mt-1">
          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      )}
    </div>
  );
};