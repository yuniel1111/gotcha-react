import '../css/tailwind.css';
import { useState } from 'react';
import SortDropdown from '../components/Post/SortDropdown';
import BannerSlider from '../components/Post/BannerSlider';
import JobPostList from '../components/Post/JobPostList';
// import { supabase } from '../api/supabase/supabaseClient';
// import { useUserStore } from '../stores/useUserStore';

export interface SortLabelListType {
  [key: string]: [string, boolean];
}

function Home() {
  // const { setUserSession, setUserLogin } = useUserStore(
  //   (state) => state.actions,
  // );

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   setUserSession(null);
  //   setUserLogin(false);
  // };

  const sortLabelList: SortLabelListType = {
    최신순: ['posting_date', true],
    마감순: ['expiration_date', true],
  };
  const [sortLabel, setSortLabel] = useState('최신순');

  return (
    <div className='response-page-padding'>
      <BannerSlider />
      <main>
        <header className='flex justify-between'>
          <h1 className='page-title'>채용공고</h1>
          <SortDropdown
            sortLabel={sortLabel}
            setSortLabel={setSortLabel}
            sortLabelList={sortLabelList}
          />
        </header>
        <JobPostList sortLabel={sortLabel} sortLabelList={sortLabelList} />
      </main>
    </div>
  );
}

export default Home;
