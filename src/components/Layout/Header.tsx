import logoImage from '../../assets/gotcha_logo.png';
import { BiSliderAlt } from 'react-icons/bi';
import { NavType } from '../../types/navType';
import NavMenus from './NavMenus';

function Header({ isActive, handleNavMenuClick }: NavType) {
  return (
    <header className='relative h-[60px] border border-b-brand-gray-1 flex items-center px-3 justify-end sm:justify-between sm:static'>
      <div
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer 
               sm:static sm:transform-none sm:-translate-x-0 sm:-translate-y-0'
        onClick={() => handleNavMenuClick('/', 0)}
      >
        <img src={logoImage} alt='GOTCHA' className='w-25 h-4' />
      </div>
      <div className='flex h-[60px]'>
        <nav className='hidden sm:flex items-center'>
          <NavMenus
            isActive={isActive}
            handleNavMenuClick={handleNavMenuClick}
          />
        </nav>
        <div className='flex flex-col h-[60px] w-[60px] items-center justify-center'>
          <BiSliderAlt className='w-[20px] h-[20px]' />
          <span className='text-[10px]'>Filter</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
