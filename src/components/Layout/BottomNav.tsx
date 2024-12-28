import { NavType } from '../../types/navType';
import NavMenus from './NavMenus';

function BottomNav({ isActive, handleNavMenuClick }: NavType) {
  return (
    <nav className='shadow-2xl fixed bottom-0 w-full sm:hidden'>
      <NavMenus isActive={isActive} handleNavMenuClick={handleNavMenuClick} />
    </nav>
  );
}

export default BottomNav;
