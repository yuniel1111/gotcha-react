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

function NavMenus() {
  const isActive = useNavigateStore((state) => state.isActive);

  return (
    <ul className='flex h-[60px] items-center justify-between gap-1 font-bold sm:justify-normal'>
      {menuItems.map((menu, idx) => (
        <MenuItem
          key={uuid4()}
          // 로그인 상태면 my-page로 이동하고, 로그아웃 상태면 sign-in으로 이동
          path={menu.path}
          // 로그인 상태면 my-page문구로 표시하고, 로그아웃 상태면 sign-in 문구로 표시
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
