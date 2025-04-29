import { create } from 'zustand';

interface Track {
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number;
  currentTime: number;
}

interface Album {
  title: string;
  coverUrl: string;
}

interface PlayerState {
  track: Track | null;
  album: Album | null;
  setTrack: (track: Track) => void;
  setAlbum: (album: Album) => void;
  updateCurrentTime: (time: number) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  track: null,
  album: null,
  setTrack: (track) => set({ track }),
  setAlbum: (album) => set({ album }),
  updateCurrentTime: (time) =>
    set((state) => ({
      track: state.track ? { ...state.track, currentTime: time } : null,
    })),
}));

export default usePlayerStore;
