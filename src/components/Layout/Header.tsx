import logoImage from '../../assets/gotcha_logo.png';
import { BiSliderAlt } from 'react-icons/bi';
import { NavType } from '../../types/navType';
import NavMenus from './NavMenus';

function Header({ isActive, handleNavMenuClick }: NavType) {
  return (
    <header className='relative flex h-[60px] items-center justify-end border border-b-brand-gray-1 sm:static sm:justify-between'>
      <div
        className='absolute left-1/2 top-1/2 ml-4 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer sm:static sm:-translate-x-0 sm:-translate-y-0 sm:transform-none'
        onClick={() => handleNavMenuClick('/', 0)}
      >
        <img src={logoImage} alt='GOTCHA' className='w-25 h-4' />
      </div>
      <div className='flex h-[60px]'>
        <nav className='hidden items-center sm:flex'>
          <NavMenus
            isActive={isActive}
            handleNavMenuClick={handleNavMenuClick}
          />
        </nav>
        <div className='flex h-[60px] w-[60px] flex-col items-center justify-center'>
          <BiSliderAlt className='h-[20px] w-[20px]' />
          <span className='text-[10px]'>Filter</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
