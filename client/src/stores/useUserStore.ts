import { create } from 'zustand';

interface UserType {
  isLoggedIn: boolean;
  userSession: any;
  actions: {
    setUserLogin: (isLoggedIn: boolean) => void;
    setUserSession: (userSession: any) => void;
  };
}

export const useUserStore = create<UserType>((set) => ({
  isLoggedIn: false,
  userSession: null,

  actions: {
    setUserLogin: (isLoggedIn: boolean) => set({ isLoggedIn }),
    setUserSession: (userSession: any) => set({ userSession }),
  },
}));
