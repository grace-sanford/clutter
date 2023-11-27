// useApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your actual API base URL
});

const createGame = async () => {
  try {
    const response = await api.get('/api/games');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createGame };
