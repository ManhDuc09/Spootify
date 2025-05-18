import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const SideBar = () => {
  const { isLoggedIn } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Trạng thái hiển thị popup

  return (
    <>
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

            {/* Create Playlist Block */}
            <li>
              <div className="p-3 mt-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                <h4 className="text-sm font-bold mb-1">
                  Create your first playlist
                </h4>
                <p className="text-xs mb-2">It's easy, we'll help you</p>

                {isLoggedIn ? (
                  <button
                    className="px-3 py-1 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-900"
                    onClick={() => console.log("Tạo Playlist")}
                  >
                    Create playlist
                  </button>
                ) : (
                  <div className="relative">
                    <button
                      className="px-3 py-1 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-900"
                      onClick={() => setIsPopupOpen(!isPopupOpen)} // Toggle popup
                    >
                      Create playlist
                    </button>

                    {/* Hiển thị popup nếu isPopupOpen === true */}
                    {isPopupOpen && (
                      <div className="absolute left-1/2 top-full mt-1 transform -translate-x-1/2 w-60 p-3 text-sm text-black bg-blue-400 rounded shadow-lg z-50">
                        <strong className="block mb-1">
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
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
