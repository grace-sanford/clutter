import type { NextApiRequest, NextApiResponse } from 'next'
import { Game, Team } from '../../../server/db';

type PlayersTeamsResponse = {
  message?: string;
  players?: Array<object>;
  teams?: Array<object>;
  error?: string
}

//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlayersTeamsResponse>
) {
    try {
        const { playerNames, numberOfTeams, gameId } = req.body;
        console.log({playerNames}, {numberOfTeams})
    
        // Check if playerNames and numberOfTeams are provided
        if (!playerNames || !numberOfTeams) {
          return res.status(400).json({ error: 'Both playerNames and numberOfTeams are required.' });
        }
    
        // Split playerNames into an array and trim whitespace from each name
        const playersArray = playerNames.split(',').map((playerName: string) => playerName.trim());
    
        // Shuffle the players array
        const shuffledPlayers = shuffleArray(playersArray);
    
        console.log("gameId", gameId)
    
        // Create teams
        const teams: any[] = [];
        for (let i = 0; i < numberOfTeams; i++) {
          const team = await Team.create({ name: `Team ${i + 1}`, gameId: gameId});
          teams.push(team);
        }
    
        // Assign players to teams
        const players: any[] = [];
        for (let i = 0; i < playersArray.length; i++) {
          const playerName = shuffledPlayers[i];
          const teamIndex = i % numberOfTeams; // Distribute players evenly among teams
          const team = teams[teamIndex];
          const teamId = team.get('id')
          console.log(teams, "teams")
    
          const player = await Player.create({ username: playerName, teamId: teamId });
          players.push(player);
        }
    
        res.status(201).json({ message: 'Players and teams created successfully.', players, teams });
      } catch (error) {
        console.error('Error creating players and teams:', error);
        res.status(500).json({ error: 'Internal server error.' });
      }
}