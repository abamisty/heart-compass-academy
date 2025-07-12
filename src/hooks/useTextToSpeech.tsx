import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TTSOptions {
  voiceId?: string;
  model?: string;
}

export const useTextToSpeech = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string, options: TTSOptions = {}) => {
    if (!text.trim()) return;

    setIsLoading(true);

    try {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text,
          voiceId: options.voiceId,
          model: options.model
        }
      });

      if (error) throw error;

      // Create audio element and play
      const audio = new Audio(`data:audio/mpeg;base64,${data.audioContent}`);
      setCurrentAudio(audio);
      
      await new Promise((resolve, reject) => {
        audio.onended = resolve;
        audio.onerror = reject;
        audio.play();
      });

    } catch (error) {
      console.error('Text-to-speech error:', error);
    } finally {
      setIsLoading(false);
      setCurrentAudio(null);
    }
  }, [currentAudio]);

  const stop = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
  }, [currentAudio]);

  return { speak, stop, isLoading, isPlaying: !!currentAudio };
};