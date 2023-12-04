// pages/play/[uuid].tsx

import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { getGame, getPlayersAndTeams, getRandomName } from "@/modules/hooks/useApi";

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

const PlayPage = () => {
  const [gameName, setGameName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [numSecs, setNumSecs] = useState(3);

  const [players, setPlayers] = useState<Player[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch or set your array of players
    // For example, setPlayers([...]);
  }, []);

  const fetchRandomName = async (gameId: number) => {
    try {
      const response = await getRandomName(gameId);
      return response.data; 
    } catch (error) {
      console.error('Error fetching random name:', error);
      return null;
    }
  };

  const handleNextPlayer = async () => {
    // ... (fetch random name)
    const randomName = await fetchRandomName();
  
    if (randomName) {
      // ... (display name)
  
      // Set a timeout to handle the next player after the specified seconds
      const timeoutId = setTimeout(() => {
        // Handle the next player
        if (currentIndex < players.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // Handle the case when all players have been displayed
          // For example, reset the index to 0
          setCurrentIndex(0);
        }
      }, numSecs * 1000); // Convert seconds to milliseconds
  
      // You can store the timeoutId in state if needed
      // For example: setTimeoutId(timeoutId);
    }
  };

  const router = useRouter();
  const { uuid } = router.query;

  useEffect(() => {
    const handleCreateGame = async () => {
      setLoading(true);

      try {
        if (typeof uuid === "string") {
          const game = await getGame(uuid);
          const gameId = game.id;
          if (gameId) {
            const data = await getPlayersAndTeams(gameId);
            console.log({ data });
            setTeams(data);
            setPlayers(data.flatMap((team: any) => team.Players));
          }
        } else {
          //pass
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    handleCreateGame();
  }, [uuid]);

  const handleNumSecsChange = (e) => {
    setNumSecs(Number(e.target.value));
    console.log(e.target.value);
  };

  const getTeamName = (teamId: number) => {
    const team = teams.find((t) => t.id === teamId);
    return team?.name || "";
  };
  const teamColors = ["red", "blue", "green", "purple", "orange", "pink"];

  const getTeamColor = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? teamColors[teams.indexOf(team)] : 'black'; // Default to black if color is not found
  };



  return (
    <Layout pageTitle={"Clutter | Play"}>
      <div>
        Get with your teams!
        {teams.map((t, index) => (
          <div key={t.id} style={{ color: teamColors[index] }} className="font-bold">
            {t.name}
            <div>
              {t.Players.map((p) => (
                <li key={p.id}>{p.username}</li>
              ))}
            </div>
          </div>
        ))}
        <div>
          How many seconds will you allow for guessing?
          <label className="mb-2">
            <select
              value={numSecs}
              onChange={handleNumSecsChange}
              className="ml-2 p-1 border rounded"
            >
              {[35, 40, 45, 50, 55, 60].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>
        Pass one device to the person who is giving clues. First up, from{" "}
        <span className="font-bold" style={{ color: getTeamColor(players[currentIndex]?.teamId) }}>{getTeamName(players[currentIndex]?.teamId)}</span>, is{" "}
        <span className="text-green-500 font-bold">
          {players && players[currentIndex]?.username}
        </span>
        .
        <div>
          <button onClick={handleNextPlayer}>Draw</button>
        </div>
      </div>
    </Layout>
  );
};

export default PlayPage;
