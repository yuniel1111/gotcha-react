import { create } from 'zustand';

interface UserType {
  isLoggedIn: boolean;
  userProfile: any;
  actions: {
    setUserLogin: (isLoggedIn: boolean) => void;
    setUserProfile: (userSession: any) => void;
  };
}

export const useUserStore = create<UserType>((set) => ({
  isLoggedIn: false,
  userProfile: null,

  actions: {
    setUserLogin: (isLoggedIn: boolean) => set({ isLoggedIn }),
    setUserProfile: (userProfile: any) => set({ userProfile }),
  },
}));
