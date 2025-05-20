export interface Track {
  audioUrl: string;
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
  artist: {
    name: string;
    id: number;
  };
  coverUrl: string;
  tracks: Track[];
}

export interface Artist {
  id: number;
  name: string;
  image: string;
  genre: string;
}

export interface PlaylistResponse {
  id: string;
  name: string;
  tracks: Track[];
}
