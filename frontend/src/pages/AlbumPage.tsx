import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePlayerStore from "../store/playerStore";
import { Track, Album } from "../types";
import { getAllPlaylists, Playlist } from "../api/PlaylistService";
import { fetchAlbumById } from "../api/albumService";
import { addTrackToPlaylist } from "../api/playlistService";

const AlbumPage = () => {
  const setTracks = usePlayerStore((state) => state.setTracks);
  const setCurrentIndex = usePlayerStore((state) => state.setCurrentIndex);
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getAllPlaylists();
        console.log("Playlists:", data);
        setPlaylists(data);
      } catch (error) {
        console.error("Không lấy được playlist", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleAddClick = (track: Track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const handlePlaylistSelect = async (playlistId: string) => {
    if (selectedTrack) {
      await addTrackToPlaylist(Number(playlistId), selectedTrack.id);
      console.log(`Thêm bài ${selectedTrack.id} vào playlist ${playlistId}`);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumData = await fetchAlbumById(albumId as string);
        console.log("Fetched album data:", albumData);
        setAlbum(albumData);
      } catch (err) {
        console.error("Error loading album:", err);
      }
    };

    if (albumId) fetchAlbum();
  }, [albumId]);

  if (!album) return <div>Loading...</div>;

  return (
    <div className="h-full">
      <div className="h-full rounded-md">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={album.coverUrl}
                alt={album.name}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">{album.name}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {album.artist.name}
                  </span>
                  <span>• {album.tracks.length} songs</span>
                  <span>• 2024</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4 flex items-center gap-6">
              <button
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all flex items-center justify-center"
                onClick={() => {
                  setTracks(album.tracks);
                  setCurrentIndex(0);
                }}
              >
                <span className="text-black text-lg">▶</span>
              </button>
            </div>

            <div className="bg-black/20 backdrop-blur-sm">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr_2fr_32px] gap-2 px-4 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>🕒</div>
                <div className="pl-7">Album</div>
                <div></div>
              </div>

              {album.tracks.map((track, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[16px_4fr_2fr_1fr_2fr_32px] gap-2 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <button
                      className="hidden group-hover:block text-xs"
                      onClick={() => {
                        setTracks(album.tracks);
                        setCurrentIndex(index);
                      }}
                    >
                      ▶
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={track.coverUrl}
                      alt={track.name}
                      className="size-10"
                    />
                    <div>
                      <div className="font-medium text-white">{track.name}</div>
                      <div>{track.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center">2024-01-01</div>

                  <div className="flex items-center">
                    {Math.floor(track.duration / 60)}:
                    {(track.duration % 60).toString().padStart(2, "0")}
                  </div>

                  <div className="flex items-center pl-4">{album.name}</div>

                  <div className="flex items-center justify-center">
                    <button
                      title="Thêm vào playlist"
                      className="w-8 h-8 flex items-center justify-center bg-white text-black text-lg font-bold rounded-full"
                      onClick={() => handleAddClick(track)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div
            className="text-white p-4 rounded-md w-72"
            style={{ backgroundColor: "var(--color-gray-800)" }}
          >
            <h3 className="text-lg font-semibold mb-3">Select playlist</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {playlists.map((playlist) => (
                <li
                  key={playlist.id}
                  className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer"
                  onClick={() => handlePlaylistSelect(playlist.id)}
                >
                  <span className="text-xl me-3">🎵</span>
                  {playlist.name}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full py-2 rounded text-white"
              style={{ backgroundColor: "var(--color-gray-700)" }}
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
