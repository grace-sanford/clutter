"use client";
// CreatePlayersTeamsForm.js
import React, { useState } from "react";
import { createGame, createPlayersAndTeams } from "../modules/hooks/useApi";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import Modal from "react-modal";

const CreatePlayersTeamsForm = () => {
  const [error, setError] = useState<Error | null>(null);
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const [numberOfTeams, setNumberOfTeams] = useState("2");
  const [playerFields, setPlayerFields] = useState("");
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let uuid = "";

  const getUuid = () => {
    uuid = v4();
    return uuid;
  };

  const handleNumberOfPlayersChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;

    if (selectedValue === "-") {
      setNumberOfPlayers(0);
    } else {
      const parsedValue = parseInt(selectedValue, 10);

      if (!isNaN(parsedValue)) {
        setNumberOfPlayers(parsedValue);
      }
    }
  };

  const handlePlayerChange = (newPlayerFields: Array<string>) => {
    const updatedPlayersString = newPlayerFields.join(", ");
    setPlayerFields(updatedPlayersString);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playerFields.split(",").some((player) => player.trim() === "")) {
      setError(
        new Error("Please enter at least four players before submitting.")
      );
      return;
    }
    if (!numberOfTeams || parseInt(numberOfTeams, 10) === 0) {
      setError(
        new Error(
          "Please select the number of teams with which you wish to play."
        )
      );
      return;
    }
    router.push(`/games/${getUuid()}`);
    setError(null);

    try {
      //Create Game
      const gameResponse = await createGame(uuid);
      const gameId = gameResponse.id;

      //Create Players and Teams
      const playerNames = playerFields;
      const playersAndTeamsResponse = await createPlayersAndTeams({
        playerNames,
        numberOfTeams: parseInt(numberOfTeams, 10),
        gameId,
      });
      return playersAndTeamsResponse;
    } catch (error) {
      console.error("Error creating game OR players and teams:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <button className="text-white text-bold" onClick={openModal}>
        Get started
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal-content overflow-y-auto modal-overlay"
      >
        <label className="text-gray-500">
          <div className="mb-2">
            How many players?{" "}
            <select
              value={numberOfPlayers}
              onChange={handleNumberOfPlayersChange}
              className="ml-2 p-1 border rounded"
              required
            >
              {["-", 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
                className="ml-2 p-1 border rounded mt-1"
              />
            </div>
          ))}
          <br />
          <label className="mb-1 text-gray-500">
            How many teams?{" "}
            <select
              value={numberOfTeams}
              onChange={(e) => {
                if (e.target.value === "-") {
                  setNumberOfTeams("");
                } else {
                  setNumberOfTeams(e.target.value);
                }
              }}
              className="ml-2 p-1 border rounded"
              required
            >
              {["-", 2, 3, 4, 5, 6].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          {error && (
            <div className="mt-4 text-red-500 text-center">
              Error: {error.message}
            </div>
          )}
          <br />
          <div className="text-center mt-4">
            <button className="font-bold" type="submit">
              Create Teams
            </button>
          </div>
        </form>
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={closeModal}
        >
          X
        </button>
      </Modal>
    </div>
  );
};

export default CreatePlayersTeamsForm;
