import { useParams } from "react-router-dom";
import React from "react";

const UserProfile = () => {
  const user = {
    name: "Lê",
    avatar: "", // nếu có link avatar thì để ở đây
    playlists: [
      {
        id: 1,
        name: "My Playlist #1",
        image: "", // nếu có ảnh playlist thì để ở đây
        owner: "Lê",
      },
    ],
  };
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
            {user.playlists.length} Public Playlist
          </p>
        </div>
      </div>

      {/* Public Playlists */}
      <div className="px-8 py-6">
        <h2 className="text-xl font-semibold mb-4">Public Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {user.playlists.map((playlist) => (
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
