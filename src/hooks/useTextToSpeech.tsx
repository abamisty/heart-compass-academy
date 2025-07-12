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

      console.log('Calling text-to-speech with:', { text: text.substring(0, 50) + '...', voiceId: options.voiceId });

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text,
          voiceId: options.voiceId || 'pFZP5JQG7iQjIQuC4Bku',
          model: options.model || 'eleven_multilingual_v2'
        }
      });

      console.log('TTS Response:', { data, error });

      if (error) {
        console.error('TTS Error details:', error);
        throw error;
      }

      // Create audio element with enhanced settings for better quality
      const audio = new Audio(`data:audio/mpeg;base64,${data.audioContent}`);
      audio.volume = 0.9; // Increase volume for better audibility
      audio.preload = 'auto';
      setCurrentAudio(audio);
      
      // Enhanced promise handling for smooth playback
      return new Promise((resolve, reject) => {
        audio.onloadeddata = () => {
          audio.play().then(resolve).catch(reject);
        };
        audio.onended = () => {
          setCurrentAudio(null);
          resolve(undefined);
        };
        audio.onerror = () => {
          setCurrentAudio(null);
          reject(new Error('Audio playback failed'));
        };
        audio.oncanplaythrough = () => {
          // Audio is ready to play without interruption
          if (audio.paused) {
            audio.play().catch(reject);
          }
        };
      });

    } catch (error) {
      console.error('Text-to-speech error:', error);
      setCurrentAudio(null);
      throw error;
    } finally {
      setIsLoading(false);
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