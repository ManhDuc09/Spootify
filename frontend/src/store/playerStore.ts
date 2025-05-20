import { create } from 'zustand';
import { Track, Album } from '../types';

interface PlayerState {
  tracks: Track[] | null;
  album: Album | null;
  currentIndex: number;
  setTracks: (tracks: Track[]) => void;
  setCurrentIndex: (index: number) => void;
  setAlbum: (album: Album) => void;
  updateCurrentTime: (time: number) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  tracks: null,
  album: null,
  currentIndex: 0,
  setTracks: (tracks) => {
    set({ tracks })
    console.log("Tracks set in store:", tracks);
  },
  setCurrentIndex: (index) => {
    console.log("Current index set in store:", index);

    set({ currentIndex: index })
  },
  setAlbum: (album) => set({ album }),
  updateCurrentTime: (time) =>
    set((state) => ({
      tracks: state.tracks
        ? state.tracks.map((track, idx) =>
            idx === state.currentIndex ? { ...track, currentTime: time } : track
          )
        : null,
    })),
  
}));

export default usePlayerStore;
