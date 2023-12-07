import type { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '../../../server/db';

type GameResponse = {
  id?: number;
  uuid?: any;
  error?: any;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameResponse>
) {
  try {
    const createdGame = await Game.create({ uuid: req.body.uuid });
    res.status(201).json(createdGame);
  } catch (error: any) {
    console.error("Error getting games:", error);
    res.status(400).json({ error: "Error creating game" });
  }
}