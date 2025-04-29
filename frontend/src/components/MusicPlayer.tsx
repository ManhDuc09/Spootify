// MusicPlayer.tsx
import usePlayerStore from '../store/playerStore';

const MusicPlayer = () => {
  const track = usePlayerStore((state) => state.track);
  const album = usePlayerStore((state) => state.album);

  if (!track || !album) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = (track.currentTime / track.duration) * 100;

  return (
    <div className="w-full">
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
                <button key={idx} className="text-gray-600 text-lg">
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <p>{formatTime(track.currentTime)}</p>
                <p>{formatTime(track.duration)}</p>
              </div>
              <div className="h-1 bg-gray-300 rounded-full relative">
                <div
                  className="h-1 bg-red-400 rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  <span className="w-3 h-3 bg-red-400 absolute right-0 -top-1 rounded-full shadow"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
