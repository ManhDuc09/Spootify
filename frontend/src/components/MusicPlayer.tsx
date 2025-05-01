import { useEffect, useRef, useState } from 'react';
import usePlayerStore from '../store/playerStore';

const MusicPlayer = () => {
  const track = usePlayerStore((state) => state.track);
  const album = usePlayerStore((state) => state.album);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    if (audioRef.current && track?.url) {
      audioRef.current.load();
      audioRef.current.play()
    }
  }, [track?.url]);

  if (!track || !album) return null;


  return (
    <div className="w-full">
      <audio ref={audioRef} controls className="hidden">
        <source src={track.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="bg-white shadow-lg w-full px-4 py-2">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded hidden md:block mr-4 object-cover"
            src={album.coverUrl}
            alt={album.title}
          />

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{track.title}</h3>
                <p className="text-xs text-gray-500">{album.title}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              {['⏮', '⏯', '⏭'].map((label, idx) => (
                <button
                  key={idx}
                  className="text-gray-600 text-lg"
                  onClick={() => {
                    if (label === '⏯') {
                      audioRef.current?.play();;
                    } else {
                      // ⏮ and ⏭ can be wired for playlist functionality
                      console.log(`${label} not implemented`);
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
