import { use, useEffect, useRef, useState } from 'react';
import usePlayerStore from '../store/playerStore';
import ProgressSlider from './ProgressSlider';

const MusicPlayer = () => {
  const tracks = usePlayerStore((state) => state.tracks);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const album = usePlayerStore((state) => state.album);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  
  const track = tracks ? tracks[currentIndex] : null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    if (audioRef.current && track?.url) {
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [track?.url]);

  useEffect(() => {
	const interval = setInterval(() => {
		if (audioRef.current) {                   
		  setCurrentTime(audioRef.current.currentTime); 
		}
	  }, 1000)
	return () => clearInterval(interval);


  });
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', updateTime);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const handleSliderChange = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value; 
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
      a.download = `${track?.name}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  

  if (!tracks ) return null;

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        <audio ref={audioRef} controls className="hidden">
          <source src={track?.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          <img
            src="https://via.placeholder.com/56"
            alt="Song Title"
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

        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="hidden sm:inline-flex hover:text-white text-zinc-400">
              🎲
            </button>

            <button
              className="hover:text-white text-zinc-400"
              onClick={handlePreviousTrack} // Go to previous track
            >
              ⏮
            </button>

            <button
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
              onClick={() => {
                const audio = audioRef.current;
                if (!audio) return;

                if (isPlaying) {
                  audio.pause();
                  setIsPlaying(false);
                } else {
                  audio.play();
                  setIsPlaying(true);
                }
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button
              className="hover:text-white text-zinc-400"
              onClick={handleNextTrack} // Go to next track
            >
              ⏭
            </button>

            <button className="hidden sm:inline-flex hover:text-white text-zinc-400">
              🔁
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">{formatTime(currentTime)}</div>
            <ProgressSlider
              value={currentTime}
              max={track?.duration ?? 0}
              onChange={handleSliderChange}
            />
            <div className="text-xs text-zinc-400">{formatTime(track?.duration ?? 0)}</div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <button className="hover:text-white text-zinc-400">🎤</button>
          <button className="hover:text-white text-zinc-400">🎵</button>
          <button className="hover:text-white text-zinc-400">💻</button>
           <button
            className="hover:text-white text-zinc-400"
            onClick={handleDownload}
          >
            ⬇️ 
          </button>   
          <div className="flex items-center gap-2">
            <button className="hover:text-white text-zinc-400">🔊</button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              defaultValue={0.75}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.volume = parseFloat(e.target.value);
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
