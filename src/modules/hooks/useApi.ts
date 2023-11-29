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

const createGame = async () => {
  try {
    const response = await api.post('/api/games');
    return response.data;
  } catch (error) {
    throw error;
  }
}

const createPlayersAndTeams = async ({ playerNames, numberOfTeams }: { playerNames: string, numberOfTeams: number }) => {
  try {
    const response = await api.post('/api/create-players-teams', {
      playerNames, numberOfTeams
    })
    return response.data
  } catch (error) {
    throw error;
  }
}

export { createGame, createPlayersAndTeams };
