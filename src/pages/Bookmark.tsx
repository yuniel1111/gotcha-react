import { useState } from 'react';
import ConfirmModal from '../components/Common/ConfirmModal';
import JobPostList from '../components/Post/JobPostList';
import { useBookmarkPost } from '../hooks/useBookmarkPost';
import { useProfileIdTestStore } from '../stores/useProfileIdTestStore';
import { supabase } from '../api/supabase/supabaseClient';
import { QueryClient, useMutation } from '@tanstack/react-query';

function Bookmark() {
  const infinitePageSize = 5;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBookmarkPost({ queryKey: 'bookmark', pageSize: infinitePageSize });
  const bookmarkedPosts = data ? data.pages.flat() : [];

  const queryClient = new QueryClient();
  const profile_id = useProfileIdTestStore((state) => state.profile_id);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState('expired');

  const handleDeleteExpired = useMutation({
    mutationFn: async (profile_id?: string) => {
      if (!profile_id) return;

      const today = new Date().toISOString().split('T')[0];
      const { error } = await supabase
        .from('bookmark')
        .delete()
        .eq('profile_id', profile_id)
        .lt('expiration_date', today);

      if (error) throw new Error('북마크 삭제 실패');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark'] });
      setIsConfirmModalOpen(false);
    },
  });

  const handleDeleteAllBookmarks = useMutation({
    mutationFn: async (profile_id?: string) => {
      if (!profile_id) return;

      const { error } = await supabase
        .from('bookmark')
        .delete()
        .eq('profile_id', profile_id);

      if (error) throw new Error('북마크 삭제 실패');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark'] });
      setIsConfirmModalOpen(false);
    },
  });

  const handleFilterButton = (buttonCategory: string) => {
    setIsConfirmModalOpen(true);
    setModalCategory(buttonCategory);
  };

  return (
    <div className='response-page-padding pt-8'>
      <main>
        <header className='flex justify-between'>
          <h1 className='page-title'>관심공고</h1>
          <div className='flex gap-2'>
            <button
              onClick={() => handleFilterButton('expired')}
              className='post-setting-button'
            >
              마감된 공고 해제
            </button>
            <button
              onClick={() => handleFilterButton('all')}
              className='post-setting-button'
            >
              전체 해제
            </button>
          </div>
          {isConfirmModalOpen && (
            <ConfirmModal
              setIsConfirmModalOpen={setIsConfirmModalOpen}
              iconName={'bookmark'}
              confirmText={
                modalCategory === 'expired'
                  ? '마감된 공고를 삭제하시겠습니까?'
                  : '북마크를 모두 해제하시겠습니까?'
              }
              rightText={'해제'}
              rightHandle={(profile_id) => {
                if (!profile_id) return;
                modalCategory === 'expired'
                  ? handleDeleteExpired.mutate(profile_id)
                  : handleDeleteAllBookmarks.mutate(profile_id);
              }}
              profile_id={profile_id}
            />
          )}
        </header>
        <JobPostList
          posts={bookmarkedPosts}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </main>
    </div>
  );
}

export default Bookmark;
