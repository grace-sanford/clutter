// pages/play/[uuid].tsx

import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import {
  getGame,
  getPlayersAndTeams,
  getRandomName,
} from "@/modules/hooks/useApi";
import Modal from "react-modal";
import Timer from "@/components/Timer";

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
type Scores = {
  [team: string]: number;
};

const PlayPage = () => {
  const [gameId, setGameId] = useState();
  const [unGuessedNames, setUnguessedNames] = useState([]);
  const [currentName, setCurrentName] = useState<{
    name: string;
    id: number;
    isGuessed: boolean;
    gameId: number;
  } | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [scores, setScores] = useState<Scores>({
    "Team 1": 0,
    "Team 2": 0,
    "Team 3": 0,
    "Team 4": 0,
    "Team 5": 0,
    "Team 6": 0,
  });

  const router = useRouter();
  const { uuid } = router.query;

  const onMountPlayersAndTeams = async (gameId: number) => {
    const data = await getPlayersAndTeams(gameId);
    setTeams(data.teams);
    setPlayers(data.teams.flatMap((team: any) => team.Players));
  };
  console.log("scores", teams.map((t) => scores[t.name]));

  // Function to increment the score for the selected team
  const incrementScore = () => {
    // Assuming selectedTeam is the name of the selected team
    console.log("selectedTeam", selectedTeam);
    if (selectedTeam) {
      setScores((prevScores) => {
        console.log("prevScores", prevScores);
        const updatedScores = {
          ...prevScores,
          [selectedTeam]: (prevScores[selectedTeam] || 0) + 1,
        };
        console.log("updatedScores", updatedScores);
        return updatedScores;
      });
    }
  };

  const markNameGuessed = async () => {
    try {
      if (currentName && gameId) {
        let nameId = currentName.id;
        const response = await fetch(`/api/names/${nameId}?gameId=${gameId}`);
        unGuessedNames.shift();
        setCurrentName(unGuessedNames[0]);
        incrementScore();
        return response;
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const handleGetNames = async () => {
      try {
        if (typeof uuid === "string") {
          const game = await getGame(uuid);
          const gameId = game.response.id;
          setGameId(gameId);
          if (gameId) {
            onMountPlayersAndTeams(gameId);
            const response = await fetch(
              `/api/names/unguessed?gameId=${gameId}`
            );
            if (response.ok) {
              const data = await response.json();
              setUnguessedNames(data.unGuessedNames);
              if (data) {
                setCurrentName(data.unGuessedNames[0]);
              } else {
                setCurrentName(null);
              }
            } else {
              console.error(
                `Failed to fetch unguessed names. Status: ${response.status}`
              );
            }
          }
        }
      } catch (err) {
        console.error("Error fetching unguessed names:", err);
      }
    };
    handleGetNames();
  }, [uuid]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numSecs, setNumSecs] = useState(35);

  const handleNumSecsChange = (e: any) => {
    setNumSecs(Number(e.target.value));
  };

  const openModal = () => {
    setIsModalOpen(true);

    // Set isModalOpen to false after a certain number of seconds
    setTimeout(() => {
      setIsModalOpen(false);
    }, numSecs * 1000);
  };
  const [selectedTeam, setSelectedTeam] = useState("Team 1");
  const teamColors = ["red", "blue", "green", "purple", "orange", "pink"];

  console.log("selectedTeam",selectedTeam)

  return (
    <Layout pageTitle={"Clutter | Play"}>
      <div className="flex flex-col lg:flex-row p-10 min-h-screen px-3 bg-blue-600 sm:bg-white md:bg-gray-700 lg:bg-green-600 xl:bg-red-300">
  {/* Left Sidebar */}
  <div className="p-4 self-center justify-center bg-white sm:w-full lg:w-1/2 rounded">
    <div className="font-bold text-lg mb-4">Teams</div>
    <div className="flex flex-col lg:flex-row flex-wrap">
      {teams.map((t, index) => (
        <div key={t.id} className="font-bold mb-2 lg:mr-4 p-4" style={{ color: teamColors[index] }}>
          <span className="underline">{t.name}</span>
          <div>
            {t.Players.map((p) => (
              <div key={p.id}>{p.username}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="font-bold text-lg mb-4">Leaderboard</div>
    <div className="mt-4 p-4 flex flex-col lg:flex-row flex-wrap">
      {teams.map((t, index) => (
        <div key={t.id} className="mb-2 p-4">
          <span className="font-bold" style={{ color: teamColors[index] }}>
            {t.name} - {" "}
          </span>
          <span className="font-bold text-black-500">{scores[t.name]}</span>
        </div>
      ))}
    </div>
  </div>
  
        {/* Right Content */}
        <div className="p-4 self-center justify-center lg:w-1/2 lg:flex-grow max-w-400">
          <div className="mb-4 p-4">
            <span className="text-white">
            How many seconds will you allow for guessing?</span>
            <label className="mb-2 block">
              <select 
                value={numSecs}
                onChange={handleNumSecsChange}
                className="p-1 border rounded w-full"
              >
                {[35, 40, 45, 50, 55, 60].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-4 p-4">
          <span className="text-white">
            Who&apos;s turn?{" "}</span>
            <label className="mb-2 block">
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="p-1 border rounded w-full"
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={openModal}
              className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
            >
              Play
            </button>
          </div>
        </div>
      </div>
  
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Name Modal"
        className="centered-modal-content overflow-y-auto modal-overlay"
      >
        <Timer numSecs={numSecs} />
        <div className="font-bold text-4xl">{currentName?.name || <span className="text-red-500">All done! <div>The bowl is empty 🎉</div></span>}</div>
        <button type="button" onClick={markNameGuessed} className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer mt-4">
          Next
        </button>
      </Modal>
    </Layout>
  );
};

export default PlayPage;
