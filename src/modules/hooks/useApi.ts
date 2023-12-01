// useApi.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Replace with your actual API base URL
});

const createGame = async (uuid: string) => {
  try {
    const response = await api.post("/api/games", { uuid });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getGame = async (uuid: string) => {
  try {
    const response = await api.get(`/api/games/${uuid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getGames = async () => {
  try {
    const response = await api.get("/api/games");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createPlayersAndTeams = async ({
  playerNames,
  numberOfTeams,
  gameId,
}: {
  playerNames: string;
  numberOfTeams: number;
  gameId: number;
}) => {
  try {
    const response = await api.post("/api/players-teams", {
      playerNames,
      numberOfTeams,
      gameId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPlayersAndTeams = async (gameId: number) => {
  try {
    const response = await api.get(`/api/players-teams/${gameId}`);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createNames = async (gameId: number, names: String[]) => {
  try {
    console.log({names})
    const response = await api.post(`/api/names`, {names, gameId})
    console.log(response);
    return response;
  } catch (error){
    throw error;
  }
};

export { createGame, getGame, getGames, getPlayersAndTeams, createPlayersAndTeams, createNames };
