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
import MenuItem from './MenuItem';
import { useNavigateStore } from '../../stores/useNavigateStore';
import { v4 as uuid4 } from 'uuid';
import { useUserStore } from '../../stores/useUserStore';

function NavMenus() {
  const isActive = useNavigateStore((state) => state.isActive);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

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
      path: isLoggedIn ? '/my-page' : '/sign-in',
      label: isLoggedIn ? 'My Page' : 'Sign In',
      Icon: BiUser,
      ActiveIcon: BiSolidUser,
    },
  ];

  return (
    <ul className='flex h-[60px] items-center justify-between gap-1 font-bold sm:justify-normal'>
      {menuItems.map((menu, idx) => (
        <MenuItem
          key={uuid4()}
          path={menu.path}
          label={menu.label}
          isActive={isActive[idx]}
          Icon={menu.Icon}
          ActiveIcon={menu.ActiveIcon}
        />
      ))}
    </ul>
  );
}

export default NavMenus;
