import { create } from 'zustand';
import { Track, Album } from '../types';
import normalizeTrack from '../utils/normalizeTrack';

interface PlayerState {
  tracks: Track[] | null;
  
  currentIndex: number;
  setTracks: (tracks: Track[]) => void;
  setCurrentIndex: (index: number) => void;
  
  updateCurrentTime: (time: number) => void;
}

const usePlayerStore = create<PlayerState>((set) => ({
  tracks: null,
  album: null,
  currentIndex: 0,
  setTracks: (tracks) => {
    const normalized = tracks.map(normalizeTrack);
    set({ tracks: normalized });
    console.log("Tracks set in store:", normalized);
  },
  setCurrentIndex: (index) => {
    console.log("Current index set in store:", index);

    set({ currentIndex: index })
  },
 
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
