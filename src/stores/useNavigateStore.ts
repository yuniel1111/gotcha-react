import { NavigateFunction } from 'react-router-dom';
import { create } from 'zustand';

interface NavigateType {
  isActive: boolean[];
  actions: {
    setActiveMenu: (url: string) => void;
    handleNavMenuClick: (url: string, navigate: NavigateFunction) => void;
  };
}

const clickedIdxList = {
  '/': 0,
  '/bookmark': 1,
  '/note': 2,
  '/resume': 3,
  '/sign-in': 4,
};

export const useNavigateStore = create<NavigateType>((set) => ({
  isActive: (() => {
    const savedNavActiveState = localStorage.getItem('navActiveState');
    return savedNavActiveState
      ? JSON.parse(savedNavActiveState)
      : [true, false, false, false, false];
  })(),

  actions: {
    setActiveMenu: (url: string) =>
      set((state) => {
        const clickedIdx = clickedIdxList[url as keyof typeof clickedIdxList];
        const newActive = state.isActive.map((_, idx) => idx === clickedIdx);

        localStorage.setItem('navActiveState', JSON.stringify(newActive));
        return { isActive: newActive };
      }),

    handleNavMenuClick: (url: string, navigate: NavigateFunction) => {
      navigate(url);
      useNavigateStore.getState().actions.setActiveMenu(url);
    },
  },
}));
