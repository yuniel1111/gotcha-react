import JobPostList from '../components/Post/JobPostList';
import { useBookmarkPost } from '../hooks/useBookmarkPost';

function Bookmark() {
  console.log('Bookmark rendering');
  const infinitePageSize = 5;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBookmarkPost({ queryKey: 'bookmark', pageSize: infinitePageSize });
  const bookmarkedPosts = data ? data.pages.flat() : [];

  return (
    <div className='response-page-padding pt-8'>
      <main>
        <header className='flex justify-between'>
          <h1 className='page-title'>관심공고</h1>
          <div className='flex gap-2'>
            <button className='post-setting-button'>마감된 공고 해제</button>
            <button className='post-setting-button'>전체 해제</button>
          </div>
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
