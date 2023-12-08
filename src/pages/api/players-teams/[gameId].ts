import type { NextApiRequest, NextApiResponse } from 'next'
import { Team, Player } from '../../../../server/db';

type GetPlayersTeamsResponse = {
  teams?: Team[];
  error?: string;
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
  res: NextApiResponse<GetPlayersTeamsResponse>
) {
    try {
        const { gameId } = req.query;
        // Find all teams for the given gameId
        const teams: Team[] = await Team.findAll({
          where: { gameId: gameId },
          include: [{ model: Player }],
        });
        res.status(200).json({ teams });
      } catch (error) {
        console.error('Error getting players and teams:', error);
        res.status(500).json({ error: 'Internal server error.' });
      }
}
