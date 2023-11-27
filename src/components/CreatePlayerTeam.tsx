// CreatePlayersTeamsForm.js
import React, { useState } from 'react';
import { createGame } from './useApi';

const CreatePlayersTeamsForm = () => {
  const [playerNames, setPlayerNames] = useState('');
  const [numberOfTeams, setNumberOfTeams] = useState('');
  const [result, setResult] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createGame({
        playerNames,
        numberOfTeams: parseInt(numberOfTeams, 10),
      });

      setResult(response);
    } catch (error) {
      console.error('Error creating players and teams:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Player Names (comma-separated):
          <input
            type="text"
            value={playerNames}
            onChange={(e) => setPlayerNames(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Number of Teams:
          <input
            type="number"
            value={numberOfTeams}
            onChange={(e) => setNumberOfTeams(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Players and Teams</button>
      </form>

      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreatePlayersTeamsForm;
