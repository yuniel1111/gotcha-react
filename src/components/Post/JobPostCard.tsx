import { useEffect, useState } from 'react';
import { GotchaPostType } from '../../types/gotchaPostType';
import { twMerge } from 'tailwind-merge';
import JobPostDetailCard from './JobPostDetailCard';
import JobPostBookmarkButton from './JobPostBookmarkButton';
import PlatformTagImage from './PlatformTagImage';

interface JobPostCardPropsType {
  post: GotchaPostType;
  companyImage: string;
}

function JobPostCard({ post, companyImage }: JobPostCardPropsType) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDetailFixed, setIsDetailFixed] = useState(false);

  const [deadline, setDeadline] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  const handleHoverToOpenDetail = () => {
    if (isDetailFixed) return;
    setIsHovered((isHovered) => !isHovered);
  };

  const handleClickToOpenDetail = () => {
    setIsDetailFixed((isDetailFixed) => !isDetailFixed);
    if (!isDetailFixed) setIsHovered(true);
  };

  useEffect(() => {
    if (post?.deadline) {
      const deadlineDate = new Date(post.deadline);
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
        // setDeadline(`~ ${month}.${day}(${weekday})`);
        setDeadline('마감');
        setIsExpired(true);
      } else setDeadline(`~ ${month}.${day}(${weekday})`);
    }
  }, [post?.deadline]);

  const handlePostLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    setIsHovered(true);
    setIsDetailFixed(true);
  };

  return (
    <li className='responsive-post-width relative my-3 cursor-pointer list-none px-2 py-2'>
      <div
        className='relative'
        onClick={handleClickToOpenDetail}
        onMouseOver={handleHoverToOpenDetail}
        onMouseOut={handleHoverToOpenDetail}
      >
        {/* 공고 이미지 */}
        <div className='relative'>
          <img
            className='aspect-[7/4] w-full rounded-t-md object-cover'
            src={companyImage}
            alt='sample 이미지'
          />
          <div
            className={twMerge(
              'absolute left-0 top-0 aspect-[7/4] w-full rounded-t-md bg-black',
              isExpired ? 'opacity-65' : 'opacity-30',
            )}
          ></div>
          <span
            className={twMerge(
              'absolute rounded-md bg-black px-2 py-1 text-sm tracking-wide text-brand-white',
              isExpired
                ? 'text-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap bg-transparent'
                : 'bottom-2 right-3 opacity-70',
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
        <JobPostBookmarkButton
          post={post}
          isHovered={isHovered}
          isExpired={isExpired}
        />

        {/* 공고 정보 */}
        <article className='rounded-b-md border-x border-b border-brand-gray-1 px-3 py-2'>
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
        </article>
      </div>

      {/* 플랫폼 종류 */}
      <PlatformTagImage
        platform_type={post.platform_type}
        isHovered={isHovered}
      />
    </li>
  );
}
export default JobPostCard;
