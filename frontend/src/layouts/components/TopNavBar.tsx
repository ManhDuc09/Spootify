import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchStore } from "../../store/searchStore";

const TopNavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { query, setQuery } = useSearchStore();
  
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const storedUser = localStorage.getItem("user");
  let userId = "User";
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  if (storedUser) {
    try {
      const userObj = JSON.parse(storedUser);
      userId = userObj.id || "User";
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-black border-gray-800">
      <div className="flex flex-wrap items-center justify-start mx-auto p-4 space-x-4">
        <Link to="/" className="flex items-center">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
            className="h-8 mr-5"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Spootify
          </span>
        </Link>

        <form className="max-w-xs flex-grow ml-17 mr-5  w-full max-w-sm" onSubmit={handleSubmit} >
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
             
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-white rounded-full bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for artists, songs, albums..."
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2"
            >
              Search
            </button>
            
          </div>
        </form>

        <div className="hidden w-full md:block md:w-auto ml-auto mr-9">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/chat" title="Chat">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mb-2 text-white cursor-pointer hover:opacity-80"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.956 9.956 0 01-4.684-1.18L3 20l1.18-4.684A9.956 9.956 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </Link>
                </li>
                <li className="relative">
                  <img
                    src="https://some-spotify-clone-bucket.s3.ap-southeast-2.amazonaws.com/guts_over_fear_cover.jpg"
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  />
                  {isMenuOpen && (
                    <ul
                      className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg"
                      style={{ backgroundColor: "#242424" }}
                    >
                      <li className="rounded-lg">
                        <Link
                          to={`/user/${userId}`}
                          className="block px-4 py-2 text-white hover:bg-neutral-900 rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li className="rounded-lg">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-neutral-900 rounded-lg"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
