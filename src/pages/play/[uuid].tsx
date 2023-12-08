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

  const router = useRouter();
  const { uuid } = router.query;

  const onMountPlayersAndTeams = async (gameId: number) => {
    const data = await getPlayersAndTeams(gameId);
    console.log("data", data);
    setTeams(data.teams);
    setPlayers(data.teams.flatMap((team: any) => team.Players));
  };
  console.log("players", players)
  console.log("teams", teams)

  const markNameGuessed = async () => {
    try {
      if (currentName && gameId) {
        let nameId = currentName.id;
        const response = await fetch(`/api/names/${nameId}?gameId=${gameId}`);
        console.log("response", response);
        unGuessedNames.shift();
        setCurrentName(unGuessedNames[0]);
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

  console.log("currentName", currentName);
  console.log("unGuessedNames", unGuessedNames);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numSecs, setNumSecs] = useState(3);

  const handleNumSecsChange = (e: any) => {
    setNumSecs(Number(e.target.value));
    console.log(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);

    // Set isModalOpen to false after a certain number of seconds 
    setTimeout(() => {
      setIsModalOpen(false);
    }, numSecs * 1000);
  };

  const teamColors = ["red", "blue", "green", "purple", "orange", "pink"];

  return (
    <Layout pageTitle={"Clutter | Play"}>
      <div>
        Get with your teams!
        {teams.map((t, index) => (
          <div
            key={t.id}
            style={{ color: teamColors[index] }}
            className="font-bold"
          >
            {t.name}
            <div>
              {t.Players.map((p) => (
                <li key={p.id}>{p.username}</li>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        How many seconds will you allow for guessing?
        <label className="mb-2">
          <select
            value={numSecs}
            onChange={handleNumSecsChange}
            className="ml-2 p-1 border rounded"
          >
            {[3, 40, 45, 50, 55, 60].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="button" onClick={openModal}>
        Play
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Name Modal"
      >
        <div>{currentName?.name || "No more names! The bowl is empty!"}</div>
        <button type="button" onClick={markNameGuessed}>
          Next {">"}
        </button>
        <Timer numSecs={numSecs}/>
      </Modal>
    </Layout>
  );
};

// type ColorTuple = [string, number];

// interface CountdownCircleTimerProps {
//   colors: { [key: number]: `#${string}` };
//   isPlaying: boolean;
//   duration: number;
//   onComplete: () => void;
// }

// const transformColors = (
//   colors: ColorTuple[]
// ): CountdownCircleTimerProps["colors"] => {
//   return colors.reduce((acc, [color, duration], index) => {
//     acc[index] = `#${color}`;
//     return acc;
//   }, {} as CountdownCircleTimerProps["colors"]);
// };
// const PlayPage = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);
//   const [teams, setTeams] = useState<Team[]>([]);
//   const [numSecs, setNumSecs] = useState(35);

//   const [players, setPlayers] = useState<Player[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentName, setCurrentName] = useState("");
//   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

//   const router = useRouter();
//   const { uuid } = router.query;

//   // Example colors
//   const colors: ColorTuple[] = [
//     ["#004777", 0.33],
//     ["#F7B801", 0.33],
//     ["#A30000", 0.33],
//   ];

//   // Transform the colors into the expected structure
//   const formattedColors = transformColors(colors);

//   const fetchRandomName = async () => {
//     try {
//       if (typeof uuid === "string") {
//         const game = await getGame(uuid);
//         const gameId = game.response.id;
//         const response = await getRandomName(gameId);
//         console.log({ response });
//         setCurrentName(response.data.name);
//         return response.data.name;
//       }
//     } catch (error) {
//       console.error("Error fetching random name:", error);
//       setCurrentName(`No more names!`);
//       setError(error as Error);
//       return null;
//     }
//   };
//   console.log({ currentName });

//   const handleNextPlayer = async () => {
//     try {
//       let randomName = await fetchRandomName();

//       if (randomName) {
//         setCurrentName(randomName);
//         setIsModalOpen(true);

//         // Set a timeout to close the modal after the specified seconds
//         const timeoutId = setTimeout(() => {
//           setIsModalOpen(false);

//           // Set a timeout to handle the next player after a delay
//           const nextPlayerTimeoutId = setTimeout(() => {
//             handleNextPlayerAfterDelay();
//           }, 1000); // Delay for a smooth transition (adjust as needed)

//           // Save the timeout id for cleanup
//           setTimer(nextPlayerTimeoutId);
//         }, numSecs * 1000);

//         // Save the timeout id for cleanup
//         setTimer(timeoutId);
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleNextPlayerAfterDelay = () => {
//     if (currentIndex < players.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       setCurrentIndex(0);
//     }
//   };

//   useEffect(() => {
//     const handleCreateGame = async () => {
//       setLoading(true);

//       try {
//         if (typeof uuid === "string") {
//           const game = await getGame(uuid);
//           const gameId = game.id;
//           if (gameId) {
//             const data = await getPlayersAndTeams(gameId);
//             console.log({ data });
//             setTeams(data);
//             setPlayers(data.flatMap((team: any) => team.Players));
//           }
//         } else {
//           //pass
//         }
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     handleCreateGame();

//     // Cleanup timer on component unmount
//     return () => {
//       if (timer) {
//         clearTimeout(timer);
//       }
//     };
//   }, [uuid, timer]);

//   console.log("teams", teams);
//   console.log("players", players);

//   const handleNumSecsChange = (e: any) => {
//     setNumSecs(Number(e.target.value));
//     console.log(e.target.value);
//   };

//   const getTeamName = (teamId: number) => {
//     const team = teams.find((t) => t.id === teamId);
//     return team?.name || "";
//   };

//   const teamColors = ["red", "blue", "green", "purple", "orange", "pink"];

//   const getTeamColor = (teamId: number) => {
//     const team = teams.find((t) => t.id === teamId);
//     return team ? teamColors[teams.indexOf(team)] : "black"; // Default to black if color is not found
//   };

//   return (
//     <Layout pageTitle={"Clutter | Play"}>
//       <div>
//         Get with your teams!
//         {teams.map((t, index) => (
//           <div
//             key={t.id}
//             style={{ color: teamColors[index] }}
//             className="font-bold"
//           >
//             {t.name}
//             <div>
//               {t.Players.map((p) => (
//                 <li key={p.id}>{p.username}</li>
//               ))}
//             </div>
//           </div>
//         ))}
//         <div>
//           How many seconds will you allow for guessing?
//           <label className="mb-2">
//             <select
//               value={numSecs}
//               onChange={handleNumSecsChange}
//               className="ml-2 p-1 border rounded"
//             >
//               {[35, 40, 45, 50, 55, 60].map((num) => (
//                 <option key={num} value={num}>
//                   {num}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>
//         <div>
//           <button onClick={handleNextPlayer}>Start</button>
//           {error ? (
//             <div className="text-red-500">
//               Error fetching name: {error.message}. No more names!
//             </div>
//           ) : (
//             ""
//           )}
//         </div>
//         {/* Modal for displaying names */}
//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={() => setIsModalOpen(false)}
//           contentLabel="Name Modal"
//         >
//           <h1>{currentName ? currentName : ""}</h1>
//           <div>
//             <CountdownCircleTimer
//               colors={["#004777", "#F7B801", "#A30000"]}
//               colorsTime={[0.33, 0.33, 0.33]}
//               isPlaying
//               duration={numSecs}
//               onComplete={() => setIsModalOpen(false)}
//             >
//               {({ remainingTime }) => remainingTime}
//             </CountdownCircleTimer>
//           </div>
//           <div>
//             <button onClick={() => fetchRandomName()}>Draw Another Name</button>
//           </div>
//         </Modal>
//       </div>
//     </Layout>
//   );
// };

export default PlayPage;
