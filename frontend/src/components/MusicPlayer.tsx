// Add this with your other imports
import { useEffect, useRef, useState } from 'react';
import usePlayerStore from '../store/playerStore';
import ProgressSlider from './ProgressSlider';

const MusicPlayer = () => {
  const tracks = usePlayerStore((state) => state.tracks);
  const currentIndex = usePlayerStore((state) => state.currentIndex);

  const mediaRef = useRef<HTMLMediaElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const track = tracks ? tracks[currentIndex] : null;
  const isVideo = track?.url?.toLowerCase().endsWith('.mp4');

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    const currentTrack = tracks ? tracks[currentIndex] : null;

    if (mediaRef.current && currentTrack?.url) {
      mediaRef.current.load();
      mediaRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [tracks, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mediaRef.current) {
        setCurrentTime(mediaRef.current.currentTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => {
      setCurrentTime(media.currentTime);
    };

    media.addEventListener('timeupdate', updateTime);
    return () => {
      media.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const handleSliderChange = (value: number) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleNextTrack = () => {
    if (tracks && tracks.length > 0) {
      const nextIndex = (currentIndex + 1) % tracks.length;
      usePlayerStore.getState().setCurrentIndex(nextIndex);
    }
  };

  const handlePreviousTrack = () => {
    if (tracks && tracks.length > 0) {
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      usePlayerStore.getState().setCurrentIndex(prevIndex);
    }
  };

  const handleDownload = async () => {
    if (!track?.url) {
      console.error('No track URL available for download');
      return;
    }
    try {
      const response = await fetch(track.url);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${track?.name}.${isVideo ? 'mp4' : 'mp3'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  if (!tracks) return null;

  return (
    <footer className="h-auto bg-zinc-900 border-t border-zinc-800 px-4 pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center h-full max-w-[1800px] mx-auto pt-4">
        
        {/* Render audio or video */}
        {isVideo ? (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={track?.url}
            controls
            className="w-full max-w-[720px] aspect-video rounded-lg shadow-lg"
          />
        ) : (
          <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} controls className="hidden">
            <source src={track?.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}

        {/* Track info */}
        {!isVideo && (
          <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
            <img
              src={track?.coverUrl || 'https://via.placeholder.com/56'}
              alt={track?.name}
              className="w-14 h-14 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate hover:underline cursor-pointer">
                {track?.name}
              </div>
              <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                {track?.artist}
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 w-full sm:max-w-[45%] mt-4 sm:mt-0">
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hidden sm:inline-flex hover:text-white text-zinc-400">🎲</button>

            <button className="hover:text-white text-zinc-400" onClick={handlePreviousTrack}>⏮</button>

            <button
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
              onClick={() => {
                if (!mediaRef.current) return;

                if (isPlaying) {
                  mediaRef.current.pause();
                  setIsPlaying(false);
                } else {
                  mediaRef.current.play();
                  setIsPlaying(true);
                }
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button className="hover:text-white text-zinc-400" onClick={handleNextTrack}>⏭</button>

            <button className="hidden sm:inline-flex hover:text-white text-zinc-400">🔁</button>
          </div>

          {/* Progress bar */}
          {!isVideo && (
            <div className="hidden sm:flex items-center gap-2 w-full">
              <div className="text-xs text-zinc-400">{formatTime(currentTime)}</div>
              <ProgressSlider
                value={currentTime}
                max={track?.duration ?? 0}
                onChange={handleSliderChange}
              />
              <div className="text-xs text-zinc-400">{formatTime(track?.duration ?? 0)}</div>
            </div>
          )}
        </div>

        {/* Extra buttons */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <button className="hover:text-white text-zinc-400">🎤</button>
          <button className="hover:text-white text-zinc-400">🎵</button>
          <button className="hover:text-white text-zinc-400">💻</button>
          <button className="hover:text-white text-zinc-400" onClick={handleDownload}>⬇️</button>
          <div className="flex items-center gap-2">
            <button className="hover:text-white text-zinc-400">🔊</button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              defaultValue={0.75}
              onChange={(e) => {
                if (mediaRef.current) {
                  mediaRef.current.volume = parseFloat(e.target.value);
                }
              }}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayer;
