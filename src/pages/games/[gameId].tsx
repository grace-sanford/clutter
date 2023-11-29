// pages/games/[gameId].tsx

import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const GamePage = () => {
  const router = useRouter();
  const { gameId } = router.query;

  return (
    <Layout>
      <div>
        <h1>Game Page</h1>
        <p>Game ID: {gameId}</p>
      </div>
    </Layout>
  );
};

export default GamePage;
