// pages/games/[gameId].tsx

import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createNames, getGame } from "@/modules/hooks/useApi";
import Modal from "react-modal";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  useEffect(() => {
    // Update names when numNames changes
    setNames(Array.from({ length: numNames }, () => ""));
  }, [numNames]);

  const handleNumNamesChange = (e: any) => {
    setNumNames(Number(e.target.value));
    console.log(e.target.value);
  };

  const handleNameChange = (index: any, value: any) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  const handleSubmit = async (e: any) => {
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
          console.log(data.status);
          if (data.status === 201) {
            setSubmitted(true); // Set the submitted state to true
            closeModal();
          }
        }
      } else {
        //pass
      }
    } catch (err) {
      setError(err as Error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setError(null);
  };

  console.log(numNames);

  return (
    <Layout pageTitle={"Clutter | Game Setup"}>
      <div className="flex flex-col items-center min-h-screen px-3 bg-blue-600 sm:bg-white md:bg-gray-700 lg:bg-green-600 xl:bg-red-300">
        <div className="mt-4">
          <div className="text-white mb-4">
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

          <div>
            <button
              type="button"
              onClick={openModal}
              className="mt-6 text-white"
            >
              2. <span className="underline">Add names </span>
            </button>
          </div>
          <div className="mt-1 items-center">
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              className="centered-modal-content overflow-y-auto modal-overlay"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <label className="mb-2">
                  How many names?
                  <select
                    value={numNames}
                    onChange={handleNumNamesChange}
                    className="ml-2 p-1 border rounded"
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
                        onChange={(e) =>
                          handleNameChange(index, e.target.value)
                        }
                      />
                    </label>
                  </div>
                ))}
                {error && (
                  <div className="mt-4 text-red-500 text-center">
                    Error: {error.message}
                  </div>
                )}
                <button
                  type="submit"
                  className={`mt-4 ${
                    submitted
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-700"
                  } text-white font-bold py-2 px-2 rounded`}
                  disabled={submitted}
                >
                  {submitted ? "Submitted" : "Submit"}
                </button>
              </form>
              <button
                className="absolute top-4 right-4 text-gray-500"
                onClick={closeModal}
              >
                X
              </button>
            </Modal>
            <div className="mt-4 flex justify-center">
              <Image
                src="/bowl.svg"
                alt="Bowl Icon"
                className="dark:invert"
                width={300}
                height={24}
                priority
              />
            </div>
          </div>
          {submitted ? (
            <div className="mt-4 text-green-500 text-center">
              Thanks for your submitting names!
            </div>
          ) : (
            ""
          )}
          <div className="mt-4 text-white">
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
