import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchArtistById, fetchTracksByArtist } from '../api/artistService';
import { Track } from '../types';
import usePlayerStore from '../store/playerStore';

const ArtistPage = () => {
  const { artistId } = useParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const setStoreTracks = usePlayerStore((state) => state.setTracks);
  const setCurrentIndex = usePlayerStore((state) => state.setCurrentIndex);
  const [artist, setArtist] = useState<Artist | null>(null);

   useEffect(() => {
    const loadData = async () => {
      try {
        const [trackData, artistData] = await Promise.all([
          fetchTracksByArtist(artistId!),
          fetchArtistById(artistId!)
        ]);
        setTracks(trackData.results);
        setArtist(artistData);
      } catch (error) {
        console.error("Error loading artist data:", error);
      }
    };

    if (artistId) loadData();
  }, [artistId]);

  const firstTrack = tracks[0];
  
  console.log("Tracks:", tracks);

  return (
    <div className='h-full pb'>
      <div className='h-full rounded-md '>
        <div className='relative min-h-full pb-100'>
          <div
            className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none'
            aria-hidden='true'
          />
          <div className='relative z-10'>
            <div className='flex p-6 gap-6 pb-8'>
              <img
                src={artist?.image || firstTrack?.coverUrl}
                alt={artist?.name || 'Artist'}
                className='w-[240px] h-[240px] shadow-xl rounded object-cover'
              />
              <div className='flex flex-col justify-end'>
                <p className='text-sm font-medium'>Artist</p>
                <h1 className='text-7xl font-bold my-4'>{artist?.name}</h1>
                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                  <span className='font-medium text-white'>{tracks.length} songs</span>
                </div>
                
                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                  <span className='font-medium text-white'>{artist?.genre} </span>
                </div>
              </div>
            </div>

            <div className='px-6 pb-4 flex items-center gap-6'>
              <button
                className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all flex items-center justify-center'
                 onClick={() => {
                    if (tracks.length > 0) {
                      setStoreTracks(tracks); 
                      setCurrentIndex(0);
                    }
                  }}
                  disabled={tracks.length === 0}
                >
              
                <span className='text-black text-lg'>▶</span>
              </button>
            </div>

            <div className="bg-black/20 backdrop-blur-sm">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr_2fr] gap-2 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>🕒</div>
                <div className="pl-7">Album</div>
              </div>

              {
                
              tracks.map((track, index) => (
                
                <div
                  key={track.id}
                  className="grid grid-cols-[16px_4fr_2fr_1fr_2fr] gap-2 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <button
                      className="hidden group-hover:block text-xs"
                      onClick={() => {
                        setStoreTracks(tracks)
                        setCurrentIndex(index);

                      }

                      }
                    >
                      ▶
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <img src={track.cover_url} alt={track.name} className="size-10 object-cover" />
                    <div>
                      <div className="font-medium text-white">{track.name}</div>
                      <div>{track.artists.map(a => a.name).join(', ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center">{track.release_date}</div>
                  <div className="flex items-center">
                    {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="flex items-center pl-4">{track.album.name}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
