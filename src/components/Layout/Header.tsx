import logoImage from '../../assets/gotcha_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  BiHome,
  BiBookmark,
  BiEditAlt,
  BiFileBlank,
  BiUser,
  BiSliderAlt,
} from 'react-icons/bi';
import { useState } from 'react';

function Header() {
  const [isActive, setIsActive] = useState<boolean[]>(
    Array.from({ length: 5 }, () => false),
  );
  const navigate = useNavigate();

  const handleNavMenuClick = (url: string, clickedIdx: number) => {
    navigate(url);
    const newActive = isActive.map((_, idx) =>
      idx === clickedIdx ? true : false,
    );

    setIsActive(newActive);
  };

  return (
    <header className='h-[60px] border border-b-brand-gray-1 flex items-center justify-between px-3'>
      <Link to='/'>
        <img src={logoImage} alt='GOTCHA' className='w-25 h-4' />
      </Link>
      <nav>
        <ul className='flex gap-1'>
          <li
            className='cursor-pointer px-2 py-3'
            onClick={() => handleNavMenuClick('/', 0)}
          >
            <BiHome
              className={`w-[20px] h-[20px] ${isActive[0] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          <li
            className='cursor-pointer px-2 py-3'
            onClick={() => handleNavMenuClick('/bookmark', 1)}
          >
            <BiBookmark
              className={`w-[20px] h-[20px] ${isActive[1] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          <li
            className='cursor-pointer px-2 py-3'
            onClick={() => handleNavMenuClick('/note', 2)}
          >
            <BiEditAlt
              className={`w-[20px] h-[20px] ${isActive[2] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          <li
            className='cursor-pointer px-2 py-3'
            onClick={() => handleNavMenuClick('/resume', 3)}
          >
            <BiFileBlank
              className={`w-[20px] h-[20px] ${isActive[3] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          {
            // 유저가 로그인 상태면 마이페이지("/my-page")로 이동하고, 로그아웃 상태면 로그인("/sign-in") 페이지로 이동
          }
          <li
            className='cursor-pointer px-2 py-3'
            onClick={() => handleNavMenuClick('/sign-in', 4)}
          >
            <BiUser
              className={`w-[20px] h-[20px] ${isActive[4] ? 'text-brand-sub' : 'text-brand-black'}`}
            />
          </li>
          <li className='cursor-pointer px-2 py-3'>
            <BiSliderAlt className='w-[20px] h-[20px]' />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
