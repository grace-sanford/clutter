import type { NextApiRequest, NextApiResponse } from 'next'
import { Name } from '../../../server/db';

type NameResponse = {
  createdNames?: Name[];
  error?: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NameResponse>
) {
try {
  console.log("entering names POST")
    const { names, gameId } = req.body;
    console.log({names}, {gameId})
    const namesToCreate = names.map((n: any) => ({ name: n, gameId: gameId }));
    console.log({namesToCreate})
    const createdNames = await Name.bulkCreate(namesToCreate);
    console.log({createdNames})
    res.status(201).json({ createdNames });
  } catch {
    res.status(400).json({ error: "Error creating name" });
  }
};
