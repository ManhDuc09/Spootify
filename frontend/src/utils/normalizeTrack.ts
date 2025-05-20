import { Track } from "../types";

const normalizeTrack = (raw: any): Track => ({
  id: raw.id,
  name: raw.name,
  audioUrl: raw.audio_url || raw.url || "",
  url: raw.audio_url || raw.url || "", // keep both for compatibility
  coverUrl: raw.cover_url || raw.coverUrl || "",
  artist: raw.artists
    ? raw.artists.map((a: any) => a.name).join(", ")
    : raw.artist || "Unknown",
  album: typeof raw.album === "object" ? raw.album.name : raw.album || "Unknown",
  duration: raw.duration || 0,
  currentTime: 0,
  isPlaying: false,
});
export default normalizeTrack;