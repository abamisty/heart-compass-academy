import React from 'react';
import { PENGUIN_FAMILY, HUMAN_CHARACTERS } from '@/types/characters';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CharacterAvatarProps {
  characterId: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  characterId,
  size = 'md',
  showName = false,
  className = ''
}) => {
  const character = [...PENGUIN_FAMILY, ...HUMAN_CHARACTERS].find(c => c.id === characterId);
  
  if (!character) {
    return null;
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage 
          src={`/character-avatars/${characterId}.png`} 
          alt={character.name}
        />
        <AvatarFallback className="bg-primary/10 text-primary font-bold">
          {character.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <div>
          <p className={`font-medium text-foreground ${textSizeClasses[size]}`}>
            {character.name}
          </p>
          <p className={`text-muted-foreground ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
            {character.specialization}
          </p>
        </div>
      )}
    </div>
  );
};

export default CharacterAvatar;