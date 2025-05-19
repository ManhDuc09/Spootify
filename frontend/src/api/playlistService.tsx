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
