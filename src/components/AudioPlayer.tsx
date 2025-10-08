import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string;
  title: string;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Mock audio functionality for demo
  if (!audioUrl) {
    return (
      <div className={`bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10 rounded-lg p-4 border border-[#B67332]/20 ${className}`}>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="bg-[#EED7C5] border-[#B67332]/30 text-[#93441A] hover:bg-[#B67332]/20"
            onClick={() => alert('Audio narration would play here in a real implementation')}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Écouter la narration
          </Button>
          <span className="text-sm text-[#93441A]">
            Narration audio disponible
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-[#EED7C5] to-[#B67332]/10 rounded-lg p-4 border border-[#B67332]/20 ${className}`}>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={togglePlay}
          className="bg-[#EED7C5] border-[#B67332]/30 text-[#93441A] hover:bg-[#B67332]/20"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#93441A] truncate">
              {title}
            </span>
            <div className="flex gap-1 text-xs text-[#B67332]">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-[#EED7C5] rounded-lg appearance-none cursor-pointer mt-2"
            style={{
              background: `linear-gradient(to right, #B67332 0%, #B67332 ${(currentTime / duration) * 100}%, #EED7C5 ${(currentTime / duration) * 100}%, #EED7C5 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
};