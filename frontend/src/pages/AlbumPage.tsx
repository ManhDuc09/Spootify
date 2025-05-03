import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePlayerStore from "../store/playerStore";
import { Track, Album } from "../types";



const mockAlbumData = (albumId: string): Album => ({
  title: `Album Title ${albumId}`,
  artist: `Artist ${albumId}`,
  coverUrl: `https://via.placeholder.com/150?text=Album+${albumId}`,
  tracks: [
    {
      id: 1,
      title: `Die with a Smile`,
      artist: `Bruno Mars ,Lady Gaga`, 
      album: `Album Title ${albumId}`,
      coverUrl: `https://via.placeholder.com/150?text=Track+1`,
      duration: 200,
      currentTime: 0,
      url :"https://some-spotify-clone-bucket.s3.ap-southeast-2.amazonaws.com/Lady+Gaga%2C+Bruno+Mars+-+Die+With+A+Smile+(Official+Music+Video).mp3",
      isPlaying: false,
    },
    {
      id: 2,
      title: `Guts Over Fear`,
      artist: `Eminem , Sia`,
      album: `Album Title ${albumId}`,
      coverUrl: `https://some-spotify-clone-bucket.s3.ap-southeast-2.amazonaws.com/guts_over_fear_cover.jpg`,
      duration: 180,
      currentTime: 0,
      url :"https://some-spotify-clone-bucket.s3.ap-southeast-2.amazonaws.com/Eminem+-+Guts+Over+Fear+ft.+Sia+(Lyric+Video).mp3",
      isPlaying: false,
    },
  ],
});

const AlbumPage = () => {
  const setTrack = usePlayerStore((state) => state.setTrack);
  const setCurrentAlbum = usePlayerStore((state) => state.setAlbum);
  const { albumId } = useParams(); 
  const [album, setAlbum] = useState<Album | null>(null);
  


  useEffect(() => {
    if (albumId) {
 
      const data = mockAlbumData(albumId);
      setAlbum(data);
    }
  }, [albumId]);

  if (!album) return <div>Loading...</div>;

  return  (
		<div className='h-full'>
			<div className='h-full rounded-md'>
		
				<div className='relative min-h-full'>
		
					<div
						className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none'
						aria-hidden='true'
					/>

					<div className='relative z-10'>
						<div className='flex p-6 gap-6 pb-8'>
            <img
                src={album.coverUrl}
                alt={album.title}
                className='w-[240px] h-[240px] shadow-xl rounded'
              />
              <div className='flex flex-col justify-end'>
                <p className='text-sm font-medium'>Album</p>
                <h1 className='text-7xl font-bold my-4'>{album.title}</h1>
                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                  <span className='font-medium text-white'>{album.artist}</span>
                  <span>• {album.tracks.length} songs</span>
                  <span>• 2024</span>
                </div>
              </div>
						</div>

				
						<div className='px-6 pb-4 flex items-center gap-6'>
							<button
								className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all flex items-center justify-center'
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

            {/* Track Data Rows */}
            {album.tracks.map((track, index) => (
              <div
                key={index}
                className="grid grid-cols-[16px_4fr_2fr_1fr_2fr] gap-2 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <button
                    className="hidden group-hover:block text-xs"
                    onClick={() => {
                      console.log("Setting track:", track);
                      setTrack(track);
                      if (album) setCurrentAlbum(album);
                    }}
                  >
                    ▶
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <img src={track.coverUrl} alt={track.title} className="size-10" />
                  <div>
                    <div className="font-medium text-white">{track.title}</div>
                    <div>{album.artist}</div>
                  </div>
                </div>
                <div className="flex items-center">2024-01-01</div>
                <div className="flex items-center">
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex items-center pl-4">{album.title}</div> {/* Ensure this is aligned by adding padding */}
              </div>
            ))}
          </div>

							</div>
						</div>
					</div>
				</div>
		
	);
};

export default AlbumPage;
