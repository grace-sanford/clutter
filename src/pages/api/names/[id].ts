// pages/api/names/[id].ts
// Mark a name `isGuessed` value true

import type { NextApiRequest, NextApiResponse } from 'next'
import { Name } from '../../../../server/db';


type PutNameResponse = {
  message?: string | null;
  error?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PutNameResponse>
) {
    try {
        const {gameId, id} = req.query;
        console.log("gameId", gameId)
        let nameToMark = await Name.findOne({ where: { id: id, gameId: gameId } });
        if (nameToMark) {
            // Update the isGuessed property
            nameToMark.isGuessed = true;
      
            // Save the changes to the database (assuming Sequelize model has a save method)
            await nameToMark.save();
      
            res.status(200).json({ message: `${nameToMark.name} is guessed!` });
          } else {
            res.status(404).json({ error: "Name not found" });
        }
      } catch (error) {
        console.error("Error getting random name:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

