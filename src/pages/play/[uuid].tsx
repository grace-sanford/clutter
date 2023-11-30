// pages/play/[uuid].tsx

import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { getGame, getPlayersAndTeams } from "@/modules/hooks/useApi";

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
                setTeams(data);
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

    return (<div>{teams.map((t)=> t.name)}</div>)
}

export default PlayPage;