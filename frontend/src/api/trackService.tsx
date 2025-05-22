import { instance as axios } from "./CustomAxios";

import { Artist, Track } from "../types";

export const fetchAllTrack = async (): Promise<Track[]> => {
  try {
    const tracks = await axios.get<Track[]>("tracks/");
    console.log("Fetched artists:", tracks);
    return tracks as unknown as Track[];
    
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    throw error;
  }
};
export const fetchTrackById = async (trackId: string): Promise<Track> => {
  try {
    const track = await axios.get<Track>(`tracks/${trackId}/`);
    console.log("Fetched track:", track);
    return track as unknown as Track;
  } catch (error) {
    console.error("Failed to fetch track:", error);
    throw error;
  }
}