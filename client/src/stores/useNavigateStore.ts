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
  '/sign-up': 4,
  '/my-page': 4,
};

export const useNavigateStore = create<NavigateType>((set) => ({
  isActive: [true, false, false, false, false],

  actions: {
    setActiveMenu: (url: string) =>
      set((state) => {
        const clickedIdx = clickedIdxList[url as keyof typeof clickedIdxList];
        const newActive = state.isActive.map((_, idx) => idx === clickedIdx);
        return { isActive: newActive };
      }),

    handleNavMenuClick: (url: string, navigate: NavigateFunction) => {
      navigate(url);
      useNavigateStore.getState().actions.setActiveMenu(url);
    },
  },
}));
