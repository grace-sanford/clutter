// pages/games/[gameId].tsx

import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from "next/image";

const GamePage = () => {
  const router = useRouter();
  const { gameId } = router.query;

  return (
    <Layout>
      <div>
        <Image
          src="/bowl.svg"
          alt="Bowl Icon"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
        <h1>Game Page</h1>
        <p>Game ID: {gameId}</p>
      </div>
    </Layout>
  );
};

export default GamePage;
