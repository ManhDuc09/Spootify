import axios from "./CustomAxios";

export interface Playlist {
  id: number;
  name: string;
  image?: string; // hoặc kiểu phù hợp với backend trả về
}

export const getAllPlaylists = async (): Promise<Playlist[]> => {
  return axios.get("playlists/");
};
