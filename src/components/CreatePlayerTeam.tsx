"use client";
// CreatePlayersTeamsForm.js
import React, { useState } from "react";
import { createPlayersAndTeams } from "../modules/hooks/useApi";
import { v4 } from "uuid";
import { useRouter } from "next/router";

const CreatePlayersTeamsForm = ({
  showCreatePlayersTeamsForm,
  setShowCreatePlayersTeamsForm,
}: {
  showCreatePlayersTeamsForm: boolean;
  setShowCreatePlayersTeamsForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<React.ReactElement>(<></>);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [numberOfTeams, setNumberOfTeams] = useState("");
  const [playerFields, setPlayerFields] = useState("");
  const router = useRouter();

  const getUuid = () => {
    const uuid = v4();
    console.log(uuid);
    return uuid;
  };

  const handleNumberOfPlayersChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;

    if (selectedValue === "-") {
      setNumberOfPlayers(0); // or any other default value you prefer
    } else {
      const parsedValue = parseInt(selectedValue, 10);

      if (!isNaN(parsedValue)) {
        setNumberOfPlayers(parsedValue);
      }
    }
  };

  const handlePlayerChange = (newPlayerFields: Array<string>) => {
    // Join the array into a comma-separated string
    const updatedPlayersString = newPlayerFields.join(", ");

    // Update state
    setPlayerFields(updatedPlayersString);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check for errors

    if (playerFields.split(",").some((player) => player.trim() === "")) {
      setError(
        <>
          * Please fill in at least <br /> four players
        </>
      );
      return;
    }
    if (!numberOfTeams || parseInt(numberOfTeams, 10) === 0) {
      setError(
        <>
          * Please select the <br /> number of teams
        </>
      );
      return;
    }
    setShowCreatePlayersTeamsForm(false);
    router.push(`/games/${getUuid()}`);
    // Reset error
    setError(<html />);
    const playerNames = playerFields;
    try {
      const response = await createPlayersAndTeams({
        playerNames,
        numberOfTeams: parseInt(numberOfTeams, 10),
      });
    } catch (error) {
      console.error("Error creating players and teams:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <label className="mb-1 text-gray-500">
        Number of Players{" "}
        <select
          value={numberOfPlayers}
          onChange={handleNumberOfPlayersChange}
          className="bg-white rounded p-2"
          required
        >
          {["-", 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
            (option) => (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>
      </label>
      <form onSubmit={handleFormSubmit}>
        {[...Array(numberOfPlayers)].map((_, index) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              placeholder={`Player ${index + 1}`}
              onChange={(e) => {
                const newPlayerFields = [...playerFields.split(", ")];
                newPlayerFields[index] = e.target.value;
                handlePlayerChange(newPlayerFields);
              }}
              className="bg-white rounded p-2"
            />
          </div>
        ))}
        <br />
        <label className="mb-1 text-gray-500">
          Number of Teams{" "}
          <select
            value={numberOfTeams}
            onChange={(e) => {
              if (e.target.value === "-") {
                setNumberOfTeams("");
              } else {
                setNumberOfTeams(e.target.value);
              }
            }}
            className="bg-white rounded p-2"
            required
          >
            {["-", 2, 3, 4, 5, 6].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        {error && <p className="text-red-500 text-sm mt-5">{error}</p>}
        <br />
        <div className="text-center mt-4">
          <button className="font-bold" type="submit">
            Create Teams
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlayersTeamsForm;
