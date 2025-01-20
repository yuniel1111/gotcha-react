import { useId, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { useToggleBookmark } from '../../hooks/useToggleBookmark';
import { GotchaPostType } from '../../types/gotchaPostType';

interface JobPostBookmarkButtonPropsType {
  post: GotchaPostType;
  isHovered: boolean;
  isExpired: boolean;
}
function JobPostBookmarkButton({
  post,
  isHovered,
  isExpired,
}: JobPostBookmarkButtonPropsType) {
  // 임시
  const profile_id = useId();

  const [isBookmarked, setIsBookmarked] = useState(false);
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

  return (
    <>
      {!isExpired && (
        <button
          className={twMerge(
            'absolute right-0 top-0 cursor-pointer p-2.5 text-[1.5rem]',
            isHovered ? 'z-50 opacity-25' : '',
          )}
          onClick={handleBookmarked}
          onMouseOver={(e) => e.stopPropagation()} // 호버 이벤트 전파 방지
          onMouseOut={(e) => e.stopPropagation()} // 마우스 아웃 이벤트 전파 방지
        >
          {isBookmarked ? (
            <FaBookmark className='text-brand-sub' />
          ) : (
            <FaRegBookmark className='text-brand-white' />
          )}
        </button>
      )}
    </>
  );
}

export default JobPostBookmarkButton;
