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

export const fetchTracksByArtist = async (artistId: string): Promise<Track[]> => {
  return await axios.get<Track[]>(`artists/${artistId}/tracks/`);
};
