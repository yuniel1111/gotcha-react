import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import BottomNav from '../components/Layout/BottomNav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Layout() {
  const [isActive, setIsActive] = useState<boolean[]>(() => {
    const savedNavActiveState = localStorage.getItem('navActiveState');
    return savedNavActiveState
      ? JSON.parse(savedNavActiveState)
      : [true, false, false, false, false];
  });

  const navigate = useNavigate();

  const handleNavMenuClick = (url: string, clickedIdx: number) => {
    navigate(url);
    const newActive = isActive.map((_, idx) =>
      idx === clickedIdx ? true : false,
    );

    setIsActive(newActive);
    localStorage.setItem('navActiveState', JSON.stringify(newActive));
  };

  return (
    <>
      <Header isActive={isActive} handleNavMenuClick={handleNavMenuClick} />
      <Outlet />
      <BottomNav isActive={isActive} handleNavMenuClick={handleNavMenuClick} />
    </>
  );
}

export default Layout;
