import {
  BiHome,
  BiBookmark,
  BiEditAlt,
  BiFileBlank,
  BiUser,
  BiSolidHome,
  BiSolidBookmark,
  BiSolidEditAlt,
  BiSolidFileBlank,
  BiSolidUser,
} from 'react-icons/bi';
import { NavType } from '../../types/navType';
import MenuItem from './MenuItem';

const menuItems = [
  { path: '/', label: 'Home', Icon: BiHome, ActiveIcon: BiSolidHome },
  {
    path: '/bookmark',
    label: 'Bookmark',
    Icon: BiBookmark,
    ActiveIcon: BiSolidBookmark,
  },
  {
    path: '/note',
    label: 'Memo',
    Icon: BiEditAlt,
    ActiveIcon: BiSolidEditAlt,
  },
  {
    path: '/resume',
    label: 'Resume',
    Icon: BiFileBlank,
    ActiveIcon: BiSolidFileBlank,
  },
  {
    path: '/sign-in',
    label: 'My Page',
    Icon: BiUser,
    ActiveIcon: BiSolidUser,
  },
];

function NavMenus({ isActive, handleNavMenuClick }: NavType) {
  return (
    <ul className='flex h-[60px] items-center justify-between gap-1 font-bold sm:justify-normal'>
      {menuItems.map((menu, idx) => (
        <MenuItem
          key={idx}
          path={menu.path}
          label={menu.label}
          isActive={isActive[idx]}
          Icon={menu.Icon}
          ActiveIcon={menu.ActiveIcon}
          handleClick={handleNavMenuClick}
        />
      ))}
    </ul>
  );
}

export default NavMenus;
