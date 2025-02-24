// import { useId } from 'react';
import { create } from 'zustand';

const initialProfileId = '118bc36e-b549-4b63-b8c1-2fbc9b7586f5';
// const initialProfileId = useId();

interface ProfileState {
  profile_id: string;
  setProfileId: (id: string) => void;
}

export const useProfileIdTestStore = create<ProfileState>((set) => ({
  profile_id: initialProfileId,
  setProfileId: (id) => set({ profile_id: id }),
}));
