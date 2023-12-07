import type { NextApiRequest, NextApiResponse } from 'next'
import { Game, Team } from '../../../server/db';

type NameResponse = {
  createdNames?: Array<string>
  error?: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NameResponse>
) {
try {
    const { names, gameId } = req.body;
    const namesToCreate = names.map((n: any) => ({ name: n, gameId: gameId }));
    const createdNames = await Name.bulkCreate(namesToCreate);
    res.status(201).json(createdNames);
  } catch {
    res.status(400).json({ error: "Error creating name" });
  }
};
