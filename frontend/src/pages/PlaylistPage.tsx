import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePlayerStore from "../store/playerStore";
import { Track, PlaylistResponse } from "../types";
import {
  fetchPlaylistById,
  removeTrackFromPlaylist,
} from "../api/playlistService";

const PlaylistPage = () => {
  const setTracks = usePlayerStore((state) => state.setTracks);
  const setCurrentIndex = usePlayerStore((state) => state.setCurrentIndex);
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await fetchPlaylistById(Number(playlistId));
        setPlaylist(data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  if (!playlist) return <div>Loading...</div>;

  const handleDeleteClick = (track: Track) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const confirmDeleteTrack = async () => {
    if (!selectedTrack || !playlist) return;

    try {
      await removeTrackFromPlaylist(Number(playlistId), selectedTrack.id);
      console.log(
        `Đã xoá track ${selectedTrack.id} khỏi playlist ${playlistId}`
      );

      const updatedTracks = playlist.tracks.filter(
        (t) => t.id !== selectedTrack.id
      );

      setPlaylist({ ...playlist, tracks: updatedTracks });
    } catch (error) {
      console.error("Lỗi khi xoá track:", error);
    } finally {
      setIsModalOpen(false);
      setSelectedTrack(null);
    }
  };

  return (
    <>
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
                {/* Header Row */}
                <div className="grid grid-cols-[16px_3fr_3fr_1fr_2fr_32px] gap-2 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                  <div className="text-center">#</div>
                  <div className="pl-3">Title</div>
                  <div>Added Date</div>
                  <div className="text-center">🕒</div>
                  <div className="pl-4">Playlist</div>
                  <div className="text-center"> </div>
                </div>

                {playlist.tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="grid grid-cols-[16px_3fr_3fr_1fr_2fr_32px] gap-2 px-10 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
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
                        className="size-10 rounded-sm"
                      />
                      <div>
                        <div className="font-medium text-white">
                          {track.name}
                        </div>
                        <div>{track.artistName}</div>
                      </div>
                    </div>

                    <div className="flex items-center">2024-01-01</div>

                    <div className="flex items-center justify-center">
                      {Math.floor(track.duration / 60)}:
                      {(track.duration % 60).toString().padStart(2, "0")}
                    </div>

                    <div className="flex items-center pl-4">
                      {playlist.name}
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        title="Xoá bài hát"
                        onClick={() => handleDeleteClick(track)}
                        className="text-white hover:text-red-500 transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="bg-zinc-900 text-white w-[320px] p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Delete song
            </h2>
            <p className="text-sm mb-6 text-center">
              Are you sure you want to delete the song?{" "}
              <strong className="text-red-400">{selectedTrack.name}</strong>{" "}
              from playlist?
            </p>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-600"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedTrack(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                onClick={confirmDeleteTrack}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistPage;
