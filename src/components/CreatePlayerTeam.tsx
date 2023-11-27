"use client";
// CreatePlayersTeamsForm.js
import React, { useState } from 'react';
import { createPlayersAndTeams } from '../modules/hooks/useApi';

const CreatePlayersTeamsForm = ({showCreatePlayersTeamsForm, setShowCreatePlayersTeamsForm}: 
  {showCreatePlayersTeamsForm: boolean, setShowCreatePlayersTeamsForm: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [playerFields, setPlayerFields] = useState([{ id: 1, value: '' }]);
  const [numberOfTeams, setNumberOfTeams] = useState('');
  const [result, setResult] = useState(null);


  const handleAddPlayerField = () => {
    setPlayerFields((prevFields) => [
      ...prevFields,
      { id: prevFields.length + 1, value: '' },
    ]);
  };

  const handleRemovePlayerField = (id) => {
    setPlayerFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  const handlePlayerChange = (id, value) => {
    setPlayerFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();

    const playerNames = playerFields.map((field) => field.value).join(',');
    try {
      const response = await createPlayersAndTeams({
        playerNames,
        numberOfTeams: parseInt(numberOfTeams, 10),
      });
      console.log(response);
      setResult(response);
      setShowCreatePlayersTeamsForm(false);
    } catch (error) {
      console.error('Error creating players and teams:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleFormSubmit}>
      {playerFields.map((field) => (
        <div key={field.id}>
          <input
            type="text"
            placeholder={`Player ${field.id}`}
            value={field.value}
            onChange={(e) => handlePlayerChange(field.id, e.target.value)}
          />
          <button className="mb-1" type="button" onClick={() => handleRemovePlayerField(field.id)}>
            X
          </button>
        </div>
      ))}
      <button type="button" className="mb-1" onClick={handleAddPlayerField}>
        Add Player
      </button>
        <br />
        <label className="mb-1">
          Number of Teams:
          <input
            type="number"
            value={numberOfTeams}
            onChange={(e) => setNumberOfTeams(e.target.value)}
            required
          />
        </label>
        <br />
        <div className="text-center mt-1">
        <button className="text-red-500 font-bold" type="submit">Make Teams</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlayersTeamsForm;
