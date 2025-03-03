import { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { useToggleBookmark } from '../../hooks/useToggleBookmark';
import { GotchaPostType } from '../../types/gotchaPostType';
import { useProfileIdTestStore } from '../../stores/useProfileIdTestStore';
import ConfirmModal from '../Common/ConfirmModal';
import { useNavigateStore } from '../../stores/useNavigateStore';
import { useQueryClient } from '@tanstack/react-query';

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
  const profile_id = useProfileIdTestStore((state) => state.profile_id);

  const currentPage = useNavigateStore((state) => state.isActive);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const { addMutation, deleteMutation } = useToggleBookmark(
    post.post_id,
    profile_id,
    post,
  );

  const handleBookmarked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (currentPage[1]) {
      setIsConfirmModalOpen(!isConfirmModalOpen);
    } else {
      if (isBookmarked) {
        try {
          setIsBookmarked(false);
          await deleteMutation.mutateAsync();
        } catch (error) {
          console.error('북마크 삭제 중 에러:', error);
        }
      } else {
        try {
          setIsBookmarked(true);
          await addMutation.mutateAsync();
        } catch (error) {
          console.error('북마크 추가 중 에러:', error);
        }
      }
    }
  };

  const queryClient = useQueryClient();

  const handleUnbookmark = async () => {
    try {
      setIsBookmarked(false);
      await deleteMutation.mutateAsync();
    } catch (error) {
      console.error('북마크 삭제 중 에러:', error);
    }

    queryClient.invalidateQueries({
      queryKey: ['bookmark', 'created_at', true, 10],
    });

    setIsConfirmModalOpen(false);
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

          {isConfirmModalOpen && (
            <ConfirmModal
              setIsConfirmModalOpen={setIsConfirmModalOpen}
              iconName={'bookmark'}
              confirmText={'북마크를 해제하시겠습니까?'}
              rightText={'해제'}
              rightHandle={handleUnbookmark}
            />
          )}
        </button>
      )}
    </>
  );
}

export default JobPostBookmarkButton;
