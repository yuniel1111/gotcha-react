export interface NavType {
  isActive: boolean[];
  handleNavMenuClick: (url: string, clickedIdx: number) => void;
}
