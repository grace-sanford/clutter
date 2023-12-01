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
            console.log({ data });
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

  return (
    <Layout pageTitle={"Clutter | Play"}>
      <div>
        Get with your teams!
        {teams.map((t) => (
          <div key={t.id}>
            {t.name}
            <div>
              {t.Players.map((p) => (
                <div key={p.id}>{p.username}</div>
              ))}
            </div>
          </div>
        ))}
        <div>How many seconds will you allow for guessing?</div>
        Pass one device to the person who is giving clues. 
        First up, from team __ is __.
        <div><button>Draw</button></div>
      </div>
    </Layout>
  );
};

export default PlayPage;
