import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import {
  getAllPlaylists,
  Playlist,
  createPlaylist,
} from "../../api/playlistService";

const SideBar = () => {
  const { isLoggedIn, user } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistName, setPlaylistName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!isLoggedIn || !user) {
        setPlaylists([]);
        return;
      }

      try {
        const data = await getAllPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error("Không lấy được playlist", error);
      }
    };

    fetchPlaylists();
  }, [isLoggedIn, user]);

  const handleCreatePlaylist = async () => {
    if (!user || !playlistName.trim()) {
      alert("Playlist name is required");
      return;
    }

    try {
      const userId = Number(user.id);
      const newPlaylist = await createPlaylist(userId, playlistName.trim());
      setPlaylists((prev) => [...prev, newPlaylist]);
      setPlaylistName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Không tạo được playlist:", error);
      alert("Failed to create playlist");
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className="fixed top-21 left-0 z-40 w-75 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {/* Your Library */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Your Library</span>
              </a>
            </li>

            {/* Nếu chưa có playlist thì hiển thị block tạo playlist */}
            {playlists.length === 0 ? (
              <li>
                <div className="p-3 mt-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                  <h4 className="text-sm font-bold mb-1">
                    Create your first playlist
                  </h4>
                  <p className="text-xs mb-2">It's easy, we'll help you</p>

                  {isLoggedIn ? (
                    <button
                      className="px-3 py-1 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-900"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Create playlist
                    </button>
                  ) : (
                    <div className="relative">
                      <button
                        className="px-3 py-1 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-900"
                        onClick={() => setIsPopupOpen(!isPopupOpen)}
                      >
                        Create playlist
                      </button>

                      {isPopupOpen && (
                        <div className="absolute left-1/2 top-full mt-1 transform -translate-x-1/2 w-60 p-3 text-sm text-black bg-blue-400 rounded shadow-lg z-50">
                          <strong
                            className="block mb-1 cursor-pointer"
                            onClick={() => {
                              setIsModalOpen(true);
                              setIsPopupOpen(false);
                            }}
                          >
                            Create a playlist
                          </strong>
                          <p className="text-xs mb-2">
                            Log in to create and share playlists.
                          </p>
                          <div className="flex justify-end space-x-2">
                            <button
                              className="text-xs font-semibold"
                              onClick={() => setIsPopupOpen(false)}
                            >
                              Not now
                            </button>
                            <a
                              className="px-2 py-1 text-xs font-semibold bg-black text-white rounded-full"
                              href="/login"
                            >
                              Log in
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ) : (
              // load playlist
              playlists.map((playlist) => (
                <li key={playlist.id} className="mb-5">
                  <a
                    href={`/playlist/${playlist.id}`}
                    className="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-blue-500"
                  >
                    {/* Icon âm nhạc nhỏ bên trái */}
                    <span className="text-xl">🎵</span>

                    {/* Tên playlist */}
                    <span>{playlist.name}</span>
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>
      </aside>

      {/* Modal: NÊN ĐẶT Ở ĐÂY — ngoài aside */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div
            className="text-white w-[320px] p-5 rounded-lg shadow-lg"
            style={{ backgroundColor: "var(--color-gray-800)" }}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Create a Playlist
            </h2>

            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter playlist name..."
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  handleCreatePlaylist();
                  setIsModalOpen(false);
                  setPlaylistName(""); // clear input sau khi tạo
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
