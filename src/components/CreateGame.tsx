"use client";

// CreateGame.tsx
import React, { useState } from 'react';
import { createGame } from '@/modules/hooks/useApi';

const CreateGame = () => {
  const [gameName, setGameName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [gameId, setGameId] = useState<number | null>(null);

  const handleCreateGame = async () => {
    setLoading(true);

    try {
      const data = await createGame();
      setGameId(data.gameId);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCreateGame} disabled={loading}>
        {loading ? 'Creating...' : 'Create Game'}
      </button>

      {error && <div>Error: {error.message}</div>}
      {gameId && <div>Game created successfully with ID: {gameId}</div>}
    </div>
  );
};

export default CreateGame;
