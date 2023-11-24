// useApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual API base URL
});

const createGame = async (gameName: any) => {
  try {
    console.log("baseURL", "http://localhost:8000")
    const response = await api.post('/create-game', { gameName });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { createGame };
