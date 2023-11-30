import express, { Request, Response } from 'express';
import { Player, Team, Game, db } from '../db'; // Adjust the path accordingly

const router = express.Router();

//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

router.post('/', async (req: Request, res: Response) => {
  try {
    const { playerNames, numberOfTeams, gameId } = req.body;

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
});

router.get('/:gameId', async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    // Find all teams for the given gameId
    const teams = await Team.findAll({
      where: { gameId: gameId },
      include: [{ model: Player }],
    });
    res.status(200).json({teams})
  } catch (error) {
    console.error('Error getting players and teams:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
  
export default router;