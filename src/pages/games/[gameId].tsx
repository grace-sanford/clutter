// pages/games/[gameId].tsx

import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from "next/image";
import { useState, useRef } from "react";

const GamePage = () => {
  const router = useRouter();
  const { gameId } = router.query;

  const [copySuccess, setCopySuccess] = useState("");
  const textRef = useRef(null);

  const copyToClipboard = () => {
    textRef.current.select();
    document.execCommand("copy");
    setCopySuccess("Copied!");
  };

  return (
    <Layout pageTitle={"Clutter | Play"}>
      <div className="flex flex-col items-center mb-4">
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
      <div className="mt-4">
        <input
          type="text"
          ref={textRef}
          readOnly
          value={`http://localhost:3000/games/${gameId}`}
          className="border p-2 w-full"
        />
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={copyToClipboard}
        >
          Copy Link
        </button>
        {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
      </div>
    </Layout>
  );
};

export default GamePage;
