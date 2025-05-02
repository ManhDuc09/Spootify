import { Link } from "react-router-dom";

const TopNavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-black border-gray-800">
      <div className="flex flex-wrap items-center justify-start mx-auto p-4 space-x-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse mr-20"
        >
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
            className="h-8 mr-5"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Spootify
          </span>
        </a>

        <form className="max-w-xs flex-grow mr-4">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-white sr-only"
          >
            Search
          </label>
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
              className="block w-full p-4 ps-10 text-sm text-white  rounded-full bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            <li>
              <Link
                to="/login"
                className="block py-2 px-3 text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block py-2 px-3 text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
