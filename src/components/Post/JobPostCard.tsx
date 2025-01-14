import { useEffect, useState } from 'react';
import companySample from '../../assets/company_sample.webp';
import wantedTag from '../../assets/wanted_tag.png';
import { FaBookmark } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';
import { GotchaPostType } from '../../types/gotchaPostType';
import { twMerge } from 'tailwind-merge';
import { useToggleBookmark } from '../../hooks/useToggleBookmark';
import JobPostDetailCard from './JobPostDetailCard';

function JobPostCard({ post }: { post: GotchaPostType }) {
  // 임시
  const profile_id = '1';

  const [isHovered, setIsHovered] = useState(false);
  const [isDetailFixed, setIsDetailFixed] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [deadline, setDeadline] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);
  const { addMutation, deleteMutation } = useToggleBookmark(
    post.post_id,
    profile_id,
    post,
  );

  const handleBookmarked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isBookmarked) {
      try {
        await deleteMutation.mutateAsync(post.post_id);
        setIsBookmarked(false);
      } catch (error) {
        console.error('북마크 삭제 중 에러:', error);
      }
    } else {
      try {
        await addMutation.mutateAsync(post.post_id);
        setIsBookmarked(true);
      } catch (error) {
        console.error('북마크 추가 중 에러:', error);
      }
    }
  };

  const handleHoverToOpenDetail = (eventType: string) => {
    if (isDetailFixed) return;
    if (eventType === 'mouseover') setIsHovered(true);
    if (eventType === 'mouseout') setIsHovered(false);
  };

  const handleClickToOpenDetail = () => {
    setIsDetailFixed((isDetailFixed) => !isDetailFixed);
    if (!isDetailFixed) setIsHovered(true);
  };

  useEffect(() => {
    if (post?.deadline) {
      const deadlineDate = new Date(post.deadline.toLocaleDateString());
      const todayWithoutTimeDate = new Date(new Date().toLocaleDateString());
      const diff = Math.floor(
        (deadlineDate.getTime() - todayWithoutTimeDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      const month = deadlineDate.getMonth() + 1;
      const day = deadlineDate.getDate();
      const weekday = deadlineDate.toLocaleDateString('ko-KR', {
        weekday: 'short',
      });

      if (diff > 0 && diff < 10) setDeadline(`D-${diff}`);
      else if (diff < 0) {
        setDeadline(`~ ${month}.${day}(${weekday})`);
        // setDeadline('마감');
        // setIsExpired(true);
      } else setDeadline(`~ ${month}.${day}(${weekday})`);
    }
  }, [post?.deadline]);

  const handlePostLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    setIsHovered(true);
    setIsDetailFixed(true);
  };

  return (
    <>
      <li
        className='responsive-post-width relative my-3 cursor-pointer list-none px-2 py-2'
        onMouseOver={() => handleHoverToOpenDetail('mouseover')}
        onMouseOut={() => handleHoverToOpenDetail('mouseout')}
        onClick={handleClickToOpenDetail}
      >
        <div className='relative'>
          {/* 공고 이미지 */}
          <div className='relative'>
            <img
              className='aspect-[7/5] w-full rounded-t-md object-cover'
              src={companySample}
              alt='sample 이미지'
            />
            <div
              className={twMerge(
                'absolute left-0 top-0 aspect-[7/5] w-full rounded-t-md bg-black',
                isExpired ? 'opacity-65' : 'opacity-30',
              )}
            ></div>
            <span
              className={twMerge(
                'absolute bg-gray-900 px-2 text-sm tracking-wide text-brand-white',
                isExpired
                  ? 'text-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap bg-transparent'
                  : 'bottom-2 right-3',
                // isHovered ? '' : 'z-50',
              )}
            >
              {isExpired ? '마감된 공고' : deadline}
            </span>
          </div>

          {/* 상세 정보 팝업 */}
          {isHovered && (
            <JobPostDetailCard post={post} handlePostLink={handlePostLink} />
          )}

          {/* 북마크 버튼 */}
          {!isExpired && (
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
          )}

          {/* 공고 정보 */}
          <div className='rounded-b-md border-x border-b border-brand-gray-1 px-3 py-2'>
            <p className='font-bol truncate text-nowrap pb-1 text-base'>
              {post?.title}
            </p>
            <div className='flex flex-col gap-0.5 truncate pb-1 text-[0.875rem] text-brand-gray-4'>
              <p className='nowrap flex truncate text-nowrap text-[0.875rem] text-brand-gray-4'>
                <span className='text-brand-black'>{post?.company}</span>
                {post?.company && post?.location && (
                  <span className='px-[6px]'>|</span>
                )}
                <span className='truncate'>{post?.location}</span>
              </p>
              <p className='nowrap flex truncate text-nowrap text-[0.875rem] text-brand-gray-4'>
                <span>{post?.job}</span>
                {post?.job && post?.experience && (
                  <span className='px-[6px]'>|</span>
                )}
                <span className='truncate'>{post?.experience}</span>
              </p>
            </div>
          </div>
        </div>
        <img
          className={twMerge(
            'absolute -left-1.5 -top-1.5 w-20',
            isHovered && 'z-20',
          )}
          src={wantedTag}
          alt='wanted logo'
        />
      </li>
    </>
  );
}
export default JobPostCard;
