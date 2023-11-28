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
    <div className='flex flex-col items-center mb-4'>
      <form onSubmit={handleFormSubmit}>
      {playerFields.map((field) => (
        <div key={field.id} className="flex items-center">
          <input
            type="text"
            placeholder={`Player ${field.id}`}
            value={field.value}
            onChange={(e) => handlePlayerChange(field.id, e.target.value)}
            className="bg-white rounded p-2"
          />
        </div>
      ))}
      <button type="button" className="mb-1 text-gray-500" onClick={handleAddPlayerField}>
        Add a Player
      </button>
        <br />
        <label className="mb-1 text-gray-500">
          Number of Teams{' '}
          <select
            value={numberOfTeams}
            onChange={(e) => setNumberOfTeams(e.target.value)}
            className="bg-white rounded p-2" // Adjusted styling
            required
          >
            {["-", 1, 2, 3, 4, 5, 6].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <br />
        <div className="text-center mt-4">
        <button className="font-bold" type="submit">Create Teams</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlayersTeamsForm;
