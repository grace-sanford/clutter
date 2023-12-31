// useApi.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
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
};

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
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createNames = async (gameId: number, names: String[]) => {
  try {
    const response = await api.post(`/api/names`, { names, gameId });
    return response;
  } catch (error) {
    throw error;
  }
};

const getRandomName = async (gameId: number) => {
  try {
    const response = await api.get(`/api/names/random?gameId=${gameId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  createGame,
  getGame,
  getGames,
  getPlayersAndTeams,
  createPlayersAndTeams,
  createNames,
  getRandomName,
};
