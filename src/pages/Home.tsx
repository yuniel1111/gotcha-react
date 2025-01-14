import { useState } from 'react';
import saraminBanner from '../assets/saramin_banner.jpeg';
import jobplanetBanner from '../assets/jobplanet_banner.png';
import jobkoreaBanner from '../assets/jobkorea_banner.png';
import { supabase } from '../api/supabase/supabaseClient';
import JobPostCard from '../components/Post/JobPostCard';
import SortDropdown from '../components/Post/SortDropdown';
import '../css/tailwind.css';
import { useUserStore } from '../stores/useUserStore';
import { GotchaPostType } from '../types/gotchaPostType';
import { useJobPost } from '../hooks/useJobPost';
import BannerSlider from '../components/Post/BannerSlider';

export interface SortLabelListType {
  [key: string]: [string, boolean];
}

function Home() {
  const { setUserSession, setUserLogin } = useUserStore(
    (state) => state.actions,
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserSession(null);
    setUserLogin(false);
  };

  const sortLabelList: SortLabelListType = {
    최신순: ['posting_date', true],
    마감순: ['expiration_date', true],
  };
  const [sortLabel, setSortLabel] = useState('최신순');
  const {
    data: posts,
    isLoading,
    error,
  } = useJobPost(
    `posts-${sortLabel}`,
    sortLabelList[sortLabel][0],
    sortLabelList[sortLabel][1],
  );

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  const images = [saraminBanner, jobplanetBanner, jobkoreaBanner];

  return (
    <div className='response-page-padding'>
      <section className='py-6'>
        <BannerSlider images={images} />
      </section>
      <div className='flex justify-between'>
        <h1 className='page-title'>채용공고</h1>
        <SortDropdown
          sortLabel={sortLabel}
          setSortLabel={setSortLabel}
          sortLabelList={sortLabelList}
        />
      </div>
      <ul className='flex flex-wrap'>
        {posts &&
          posts.map((post: GotchaPostType, idx: number) => (
            <JobPostCard key={idx} post={post} />
          ))}
      </ul>
    </div>
  );
}

export default Home;
