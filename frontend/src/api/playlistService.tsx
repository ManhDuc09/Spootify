import { PlaylistResponse } from "../types";
import { authInstance as axios } from "./CustomAxios";

export interface Playlist {
  id: number;
  name: string;
  image?: string;
}

export const getAllPlaylists = async (): Promise<Playlist[]> => {
  const response = await axios.get("playlists/");
  return response.results;
};

export const createPlaylist = async (
  user: number,
  name: string = "New Playlist"
): Promise<Playlist> => {
  console.log("playlisif", user);
  const response = await axios.post("playlists/", { name, user });
  return response.data;
};

export const fetchPlaylistById = async (
  id: string
): Promise<PlaylistResponse> => {
  const response = await axios.get(`playlists/${id}/`);
  console.log("Playlist response raw:", response);
  const transformed: Playlist = {
    id: response.id,
    name: response.name,
    tracks: response.tracks.map((t: any) => ({
      id: t.id,
      name: t.name,
      artist: t.artists.map((a: any) => a.name).join(", "),
      album: t.album?.name || "Unknown Album",
      coverUrl: t.cover_url,
      duration: t.duration,
      currentTime: 0,
      url: t.audio_url,
      isPlaying: false,
    })),
  };

  return transformed;
};
