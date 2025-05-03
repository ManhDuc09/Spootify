export interface Track {
    id: number;
    title: string;
    artist: string;
    album: string;
    coverUrl: string;
    duration: number;
    currentTime: number;
    url: string;
    isPlaying: boolean;
  }
  
  export interface Album {
    title: string;
    artist: string;
    coverUrl: string;
    tracks: Track[];
  }
  