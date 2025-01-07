import { useState } from 'react';
import companySample from '../../assets/company_sample.webp';
import wantedLogo from '../../assets/wanted_logo.png';
import { FaBookmark } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';

function JobPostCard({ isBookmarkedProps }: { isBookmarkedProps: boolean }) {
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedProps);

  const handleBookmarked = () => {
    setIsBookmarked((isBookmarked) => !isBookmarked);
    // supabase 처리
  };

  return (
    <li className='responsive-post-width list-none px-2 py-5'>
      <div className='overflow-hidden rounded-md'>
        <div className='relative aspect-[7/5]'>
          <img
            className='h-full w-full object-cover'
            src={companySample}
            alt='sample 이미지'
          />
          <div className='absolute left-0 top-0 h-full w-full bg-black opacity-40'></div>
          <button
            className='absolute right-2 top-2 cursor-pointer text-[1.5rem]'
            onClick={handleBookmarked}
          >
            {isBookmarked ? (
              <FaBookmark className='text-brand-sub' />
            ) : (
              <FaRegBookmark className='text-brand-white' />
            )}
          </button>
          <span className='absolute bottom-2 right-3 rounded-md bg-black px-2 text-brand-white'>
            D-5
          </span>
        </div>
        <div className='rounded-b-md border-x border-b border-brand-gray-1 px-3 py-2'>
          <div className='flex items-center justify-between pb-1'>
            <p className='truncate font-bold'>공고 제목</p>
            <img
              className='max-h-[2rem] object-cover'
              src={wantedLogo}
              alt='wanted logo'
            />
          </div>
          <div className='flex gap-[6px] pb-1 text-brand-gray-4'>
            <p className='truncate text-[0.875rem]'>회사명 | 서울 강남구</p>
          </div>
          <div className='flex gap-[6px] text-brand-gray-4'>
            <p className='truncate text-[0.875rem]'>Software Engineer | 신입</p>
          </div>
        </div>
      </div>
    </li>
  );
}
export default JobPostCard;
