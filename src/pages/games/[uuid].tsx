// pages/games/[gameId].tsx

import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { createNames, getGame } from "@/modules/hooks/useApi";

interface Team {
  id: number;
  name: string;
  gameId: number;
  createdAt: string;
  Players: Player[];
}

interface Player {
  id: number;
  username: string;
  teamId: number;
  createdAt: string;
}

const GamePage = () => {
  const [error, setError] = useState<Error | null>(null);
  const [numNames, setNumNames] = useState(3);
  const [copySuccess, setCopySuccess] = useState("");
  const [names, setNames] = useState(
    Array.from({ length: numNames }, () => "")
  );
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  const { uuid } = router.query;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/games/${uuid}`
      );
      setCopySuccess("Copied!");
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      setCopySuccess("Copy failed");
    }
  };

  const handleNumNamesChange = (e) => {
    setNumNames(Number(e.target.value));
  };

  const handleNameChange = (index, value) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (typeof uuid === "string") {
        if (names.some((name) => name.trim() === "")) {
          setError(new Error("Please fill in all names before submitting."));
          return;
        }
        const game = await getGame(uuid);
        const gameId = game.id;
        console.log({ gameId });
        if (gameId) {
          console.log({ names });
          const data = await createNames(gameId, names);
          console.log({ data });
          console.log(data.status)
          if (data.status === 201) {
            setSubmitted(true); // Set the submitted state to true
          }
        }
      } else {
        //pass
      }
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <Layout pageTitle={"Clutter | Game Setup"}>
      <div className="flex flex-col items-center mt-10 px-3">
        <div className="mt-4">
          <div className="text-blue-500 mb-4">
            1. Copy the link and share it with your friends
          </div>
          <input
            type="text"
            readOnly
            value={`http://localhost:3000/games/${uuid}`}
            className="border p-2 w-full"
          />
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={copyToClipboard}
          >
            Copy Link
          </button>
          {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
          <div className="mt-6 text-blue-500">2. Add names </div>
          <div className="mt-1 items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <label className="mb-2">
                 Names:
                <select
                  value={numNames}
                  onChange={handleNumNamesChange}
                  className="ml-2"
                >
                  {[3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>
              {names.map((name, index) => (
                <div key={index} className="mb-2">
                  <label>
                    <input
                      type="text"
                      placeholder={name}
                      className="ml-2 p-1 border rounded"
                      onChange={(e) => handleNameChange(index, e.target.value)}
                    />
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className={`mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded ${submitted ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                disabled={submitted}
              >
                {submitted ? "Submitted" : "Submit"}
              </button>
            </form>
            <div className="mt-4 flex justify-center">
              <Image
                src="/bowl.svg"
                alt="Bowl Icon"
                className="dark:invert"
                width={200}
                height={24}
                priority
              />
            </div>
          </div>
          {error && (
            <div className="mt-4 text-red-500 text-center">
              Error: {error.message}
            </div>
          )}
          <div className="mt-4 text-blue-500 mb-10">
            3. Once everyone has added their names to the bowl, have the game
            leader{" "}
            <Link className="underline" href={`/play/${uuid}`}>
              continue to game play
            </Link>
            !
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamePage;
