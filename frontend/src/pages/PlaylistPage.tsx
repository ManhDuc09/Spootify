import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePlayerStore from "../store/playerStore";
import { Track, PlaylistResponse } from "../types";
import { fetchPlaylistById } from "../api/playlistService";

const PlaylistPage = () => {
  const setTracks = usePlayerStore((state) => state.setTracks);
  const setCurrentIndex = usePlayerStore((state) => state.setCurrentIndex);
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistResponse | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await fetchPlaylistById(Number(playlistId));
        console.log("Fetched Playlist data:", data);
        setPlaylist(data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  if (!playlist) return <div>Loading...</div>;

  return (
    <div className="h-full">
      <div className="h-full rounded-md">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#1DB954]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={playlist.coverUrl}
                alt={playlist.name}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Playlist</p>
                <h1 className="text-7xl font-bold my-4">{playlist.name}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {playlist.creatorName}
                  </span>
                  <span>• {playlist.tracks.length} songs</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4 flex items-center gap-6">
              <button
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all flex items-center justify-center"
                onClick={() => {
                  setTracks(playlist.tracks);
                  setCurrentIndex(0);
                }}
              >
                <span className="text-black text-lg">▶</span>
              </button>
            </div>

            <div className="bg-black/20 backdrop-blur-sm">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr_2fr] gap-2 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Added Date</div>
                <div>🕒</div>
                <div className="pl-7">Playlist</div>
              </div>

              {playlist.tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="grid grid-cols-[16px_4fr_2fr_1fr_2fr] gap-2 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                >
                  <div className="flex items-center justify-center">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <button
                      className="hidden group-hover:block text-xs"
                      onClick={() => {
                        setTracks(playlist.tracks);
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
                      <div>{track.artistName}</div>
                    </div>
                  </div>
                  <div className="flex items-center">2024-01-01</div>
                  <div className="flex items-center">
                    {Math.floor(track.duration / 60)}:
                    {(track.duration % 60).toString().padStart(2, "0")}
                  </div>
                  <div className="flex items-center pl-4">{playlist.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
