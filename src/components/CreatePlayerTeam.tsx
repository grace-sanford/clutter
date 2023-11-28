"use client";
// CreatePlayersTeamsForm.js
import React, { useState } from 'react';
import { createPlayersAndTeams } from '../modules/hooks/useApi';

const CreatePlayersTeamsForm = ({showCreatePlayersTeamsForm, setShowCreatePlayersTeamsForm}: 
  {showCreatePlayersTeamsForm: boolean, setShowCreatePlayersTeamsForm: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const initialPlayerFields = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    value: '',
  }));
  const [playerFields, setPlayerFields] = useState(initialPlayerFields);
  const [numberOfTeams, setNumberOfTeams] = useState('');
  const [result, setResult] = useState(null);


  const handleAddPlayerField = () => {
    setPlayerFields((prevFields) => [
      ...prevFields,
      { id: prevFields.length + 1, value: '' },
    ]);
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
    <div className='flex flex-col items-center'>
      <form onSubmit={handleFormSubmit}>
      {playerFields.map((field) => (
        <div key={field.id} className="flex items-center">
          <input
            type="text"
            placeholder={`Player ${field.id}`}
            value={field.value}
            onChange={(e) => handlePlayerChange(field.id, e.target.value)}
            className="bg-gray-200 rounded p-2"
          />
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
            className="bg-gray-200 rounded p-2"
            required
          />
        </label>
        <br />
        <div className="text-center mt-4">
        <button className="text-red-500 font-bold" type="submit">Create Teams</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlayersTeamsForm;
