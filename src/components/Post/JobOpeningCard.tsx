import { useState } from 'react';
import companySample from '../../assets/company_sample.webp'
import wantedLogo from '../../assets/wanted_logo.png'
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";


function JobOpeningCard({ isBookmarkedProps }: { isBookmarkedProps: boolean}) {
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedProps);

  const handleBookmarked = () => {
    setIsBookmarked(isBookmarked => !isBookmarked)
    // supabase 처리
  }

  return (
    <li className='responsive-post-width list-none py-5 px-2'>
      <div className='rounded-md overflow-hidden'>
        <div className='aspect-[7/5] relative'>
          <img className='w-full h-full object-cover' src={companySample} alt="sample 이미지" />
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40'></div>
          <button className='absolute top-2 right-2 text-[1.5rem] cursor-pointer' onClick={handleBookmarked}>
            {
              isBookmarked ? <FaBookmark className='text-brand-sub'/> : <FaRegBookmark className='text-brand-white'/>
            }
          </button>
          <span className='absolute bottom-2 right-3 text-brand-white bg-black rounded-md px-2'>D-5</span>
        </div>
        <div className='border-x border-b border-brand-gray-1 rounded-b-md px-3 py-2'>
          <div className='flex justify-between items-center pb-1'>
            <p className='truncate font-bold'>공고 제목</p>
            <img className='max-h-[2rem] object-cover' src={wantedLogo} alt="wanted logo" />
          </div>
          <div className='flex gap-[6px] text-brand-gray-4 pb-1'>
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
export default JobOpeningCard