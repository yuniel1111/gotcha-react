import '../css/tailwind.css';
import saraminBanner from '../assets/saramin_banner.jpeg';
import JobPostCard from '../components/Post/JobPostCard';
import SortDropdown from '../components/Post/SortDropdown';
import { usePost } from '../hooks/usePost';
import { useState } from 'react';

export interface SortLabelListType {
  [key: string]: [string, boolean];
}

function Home() {
  const [sortLabel, setSortLabel] = useState('최신순');
  const { data, isLoading, error } = usePost<any[]>(`posts`);
  const sortLabelList: SortLabelListType = {
    최신순: ['posting_date', true],
    마감순: ['expiration_date', true],
  };

  console.log('rendering');

  // const { data } = usePost<any[]>(
  //   `post-${val}`,
  //   sortLabelList[val][0],
  //   sortLabelList[val][1],
  // );

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='response-page-padding'>
      <section className='py-6'>
        <a href='https://www.saramin.co.kr/zf_user/' target='_blank'>
          <img
            className='rounded-lg'
            src={saraminBanner}
            alt='saramin banner'
          />
        </a>
      </section>
      <div className='flex justify-between'>
        <h1 className='page-title'>채용공고</h1>
        <SortDropdown
          sortLabel={sortLabel}
          setSortLabel={setSortLabel}
          sortLabelList={sortLabelList}
        />
      </div>
      <section className='flex flex-wrap'>
        {data &&
          data.map((_: any, idx: number) => (
            <JobPostCard key={idx} isBookmarkedProps={false} />
          ))}
      </section>
    </div>
  );
}

export default Home;
