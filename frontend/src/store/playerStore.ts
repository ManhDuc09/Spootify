import { create } from 'zustand';
import { Track,Album } from '../types';


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
