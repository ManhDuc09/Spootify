import { instance as axios } from "./CustomAxios";

import { Artist, Track } from "../types";

export const fetchAllArtists = async (): Promise<Artist[]> => {
  try {
    const artists = await axios.get<Artist[]>("artists/");
    console.log("Fetched artists:", artists);
    return artists as unknown as Artist[];
    
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    throw error;
  }
};

export const fetchArtistById = async (artistId: string): Promise<Artist> => {
  try {
    const artist = await axios.get<Artist>(`artists/${artistId}/`);
    console.log("Fetched artist:", artist);
    return artist as unknown as Artist;
  } catch (error) {
    console.error("Failed to fetch artist:", error);
    throw error;
  }
}

export const fetchTracksByArtist = async (artistId: string): Promise<Track[]> => {
  return await axios.get<Track[]>(`artists/${artistId}/tracks/`);
};
