// useApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your actual API base URL
});

const getGames = async () => {
  try {
    const response = await api.get('/api/games');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createGame = async (uuid: string) => {
  try {
    const response = await api.post('/api/games', {uuid});
    return response.data;
  } catch (error) {
    throw error;
  }
}

const createPlayersAndTeams = async ({ playerNames, numberOfTeams, gameId }: { playerNames: string, numberOfTeams: number, gameId: number }) => {
  try {
    const response = await api.post('/api/create-players-teams', {
      playerNames, numberOfTeams, gameId
    })
    return response.data
  } catch (error) {
    throw error;
  }
}

export { createGame, createPlayersAndTeams };
