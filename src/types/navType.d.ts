export interface NavType {
  isActive: boolean[];
  handleNavMenuClick: (url: string) => void;
  setActiveMenu?: (url: string) => void | undefined;
}
