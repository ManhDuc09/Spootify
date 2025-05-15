export interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number;
  currentTime: number;
  url: string;
  isPlaying: boolean;
}

export interface Album {
  name: string;
  artist: string;
  coverUrl: string;
  tracks: Track[];
}
