import { instance as axios } from "./CustomAxios";

import { Album } from "../types";

export const fetchAlbumById = async (albumId: string): Promise<Album> => {
  const response = await axios.get<Album>(`albums/${albumId}/`);
  console.log("Album response:", response);
  const transformed: Album = {
    name: response.name,
    artist: response.artist,
    coverUrl: response.coverUrl,
    tracks: response.tracks.map((t: any) => ({
      id: t.id,
      name: t.name,
      artist: t.artist,
      album: response.name,
      coverUrl: t.cover_url,
      duration: t.duration,
      currentTime: 0,
      url: t.audio_url,
      isPlaying: false,
    })),
  };

  return transformed;
};
export const fetchAllAlbums = async (): Promise<Album[]> => {
  try {
    const albums = await axios.get<Album[]>("albums/");
    return albums;
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    throw error;
  }
};
