import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTracksByArtist } from '../api/artistService';
import { Track } from '../types';
import usePlayerStore from '../store/playerStore';

const ArtistPage = () => {
  const { artistId } = useParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const setTrack = usePlayerStore((state) => state.setTrack);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await fetchTracksByArtist(artistId as string);
        setTracks(data);
      } catch (error) {
        console.error("Failed to load artist tracks:", error);
      }
    };

    if (artistId) loadTracks();
  }, [artistId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tracks by Artist</h1>
      <div className="bg-black/20 backdrop-blur-sm">
        <div className="grid grid-cols-[16px_4fr_1fr] gap-2 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
          <div>#</div>
          <div>Title</div>
          <div>🕒</div>
        </div>

        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="grid grid-cols-[16px_4fr_1fr] gap-2 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
          >
            <div className="flex items-center justify-center">
              <span className="group-hover:hidden">{index + 1}</span>
              <button
                className="hidden group-hover:block text-xs"
                onClick={() => setTrack(track)}
              >
                ▶
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img src={track.coverUrl} alt={track.name} className="size-10" />
              <div className="text-white">{track.name}</div>
            </div>
            <div className="flex items-center">
              {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistPage;
