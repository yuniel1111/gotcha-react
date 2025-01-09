import { useEffect, useState } from 'react';
import companySample from '../../assets/company_sample.webp';
import wantedTag from '../../assets/wanted_tag.png';
import { FaBookmark } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';
import { GotchaPostType } from '../../types/gotchaPostType';

function JobPostCard({ post }: { post: GotchaPostType }) {
  console.log('JobPostCard rerendering');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [deadline, setDeadline] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  const handleBookmarked = () => {
    setIsBookmarked((isBookmarked) => !isBookmarked);
    // supabase 처리
  };

  useEffect(() => {
    if (post?.deadline) {
      const deadlineDate = new Date(post.deadline.toLocaleDateString());
      const todayWithoutTimeDate = new Date(new Date().toLocaleDateString());
      const diff = Math.floor(
        (deadlineDate.getTime() - todayWithoutTimeDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (diff > 0 && diff < 10) setDeadline(`D-${diff}`);
      else if (diff < 0) {
        setDeadline('마감');
        setIsExpired(true);
      } else setDeadline(`~${post.deadline.toLocaleDateString('ko-KR')}`);
    }
  }, [post?.deadline]);

  // const checkPostIsBookmarked = async (postId: string) => {
  //   const { data, error } = await supabase
  //     .from('bookmark')
  //     .select('post_id')
  //     .eq('post_id', postId);

  //   if (error) return false;

  //   if (data)
  //     setPost((postDetail: PostType) => ({
  //       ...postDetail,
  //       isBookmarked: true,
  //     }));
  // };

  return (
    <li className='responsive-post-width relative my-3 cursor-pointer list-none px-2 py-2'>
      <img
        className='absolute left-[-0.5rem] top-[-0.5rem] z-20 w-[5rem]'
        src={wantedTag}
        alt='wanted logo'
      />
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
          {deadline && (
            <span className='absolute bottom-2 right-3 rounded-md bg-black px-2 text-sm text-brand-gray-1'>
              {deadline}
            </span>
          )}
        </div>
        <div className='rounded-b-md border-x border-b border-brand-gray-1 px-3 py-2'>
          <p className='font-bol line-clamp-2 truncate text-wrap pb-2 text-base'>
            {post?.title}
          </p>
          <div className='flex gap-[6px] pb-1 text-brand-gray-4'>
            <p className='nowrap flex gap-1 truncate text-nowrap text-[0.875rem]'>
              <span>{post?.company}</span>
              <span>{post?.location && '|'}</span>
              <span className='truncate'>{post?.location}</span>
            </p>
          </div>
          <div className='flex gap-[6px] text-brand-gray-4'>
            <p className='nowrap flex gap-1 truncate text-nowrap text-[0.875rem]'>
              <span>{post?.job}</span>
              <span>{post?.experience && '|'}</span>
              <span className='truncate'>{post?.experience}</span>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
export default JobPostCard;
