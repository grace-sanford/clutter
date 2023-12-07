// useApi.ts
import axios from "axios";

console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
const api = axios.create({
  baseURL: 
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000" ,
});

const createGame = async (uuid: string) => {
  try {
    const gameResponse = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid,
      }),
    });

    if (!gameResponse.ok) {
      // Handle non-successful responses, e.g., throw an error
      throw new Error(`Failed to create game: ${gameResponse.statusText}`);
    }

    const responseData = await gameResponse.json();
    return responseData;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

// const createGame = async (uuid: string) => {
//   try {
//     const response = await api.post("/api/games", { uuid });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

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

const getRandomName = async (gameId: number) => {
  try {
    console.log({gameId})
    const response = await api.get(`/api/names/random?gameId=${gameId}`)
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export { createGame, getGame, getGames, getPlayersAndTeams, createPlayersAndTeams, createNames, getRandomName };
