import { JOBKOREA_URL, SARAMIN_URL } from '../api/url';
import { usePost } from '../hooks/usePost';

function Home() {
  const { data, isLoading, error } = usePost(JOBKOREA_URL);

  console.log(data);

  return <div>Home</div>;
}

export default Home;
