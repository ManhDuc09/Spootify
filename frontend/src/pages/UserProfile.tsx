import React, { useEffect, useState } from "react";
import { getAllPlaylists } from "../api/PlaylistService";

interface Playlist {
  id: number;
  name: string;
  image?: string;
  owner: string;
}

interface User {
  name: string;
  avatar?: string;
}

const UserProfile = () => {
  const storedUser = localStorage.getItem("user");
  let username = "User";

  if (storedUser) {
    try {
      const userObj = JSON.parse(storedUser);
      username = userObj.username || "User";
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }

  const user: User = {
    name: username,
    avatar:
      localStorage.getItem("userAvatar") ||
      "https://cdn.pixabay.com/photo/2021/04/16/09/32/cow-6183083_1280.jpg",
  };

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        let data = await getAllPlaylists();

        data = data.map((playlist, index) => ({
          ...playlist,
          image:
            playlist.image ||
            [
              "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80",
            ][index % 5], // chọn 1 trong 5 ảnh mẫu theo index
        }));

        setPlaylists(data);
      } catch (error) {
        console.error("Không lấy được playlist", error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-700 to-black p-8 flex items-end space-x-6 min-h-[300px]">
        <div className="h-32 w-32 rounded-full bg-gray-800 flex items-center justify-center text-6xl">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A10 10 0 0112 2a10 10 0 016.879 15.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
        <div>
          <p className="uppercase text-sm font-semibold">Profile</p>
          <h1 className="text-5xl font-bold">{user.name}</h1>
          <p className="mt-2 text-sm text-gray-300">
            {playlists.length} Public Playlist
          </p>
        </div>
      </div>

      {/* Public Playlists */}
      <div className="px-8 py-6">
        <h2 className="text-xl font-semibold mb-4">Public Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-neutral-900 p-4 rounded-lg hover:bg-neutral-800 transition"
            >
              <div className="aspect-square bg-gray-700 flex items-center justify-center text-4xl rounded mb-3">
                {playlist.image ? (
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19V6l12-2v13"
                    />
                  </svg>
                )}
              </div>
              <h3 className="text-sm font-bold">{playlist.name}</h3>
              <p className="text-xs text-gray-400">By {playlist.owner}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
