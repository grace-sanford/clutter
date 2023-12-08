import type { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '../../../../server/db';

type GetGamesResponse = {
  response?: Game | null;
  error?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetGamesResponse>
) {
try {
    const { uuid } = req.query;
    console.log("uuid", uuid)
    if (!uuid) {
      return res.status(400).json({ error: "UUID is required." });
    }

    const response = await Game.findOne({ where: { uuid: uuid } });
    res.status(201).json({ response });
  } catch (error) {
    console.error("Error getting games:", error);
    res.status(400).json({ error: "Error getting games" });
  }
}