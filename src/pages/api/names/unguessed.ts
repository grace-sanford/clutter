import type { NextApiRequest, NextApiResponse } from 'next'
import { Name } from '../../../../server/db';


const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

type NameResponse = {
  unGuessedNames?: Array<Name> | null;
  error?: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NameResponse>
) {
    try {
        const {gameId} = req.query;
        console.log("gameId", gameId)
        const unGuessedNames = await Name.findAll({where: {isGuessed: false, gameId: gameId}})
        shuffleArray(unGuessedNames);
        res.status(200).json({unGuessedNames})
      } catch (error) {
        console.error("Error getting random name:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}





















//const availableNames = new Set();
//let noMoreNamesReturned = false;


        // const { gameId } = req.query;
        // console.log("gameId", gameId);
    
        // if (!gameId) {
        //   res
        //     .status(400)
        //     .json({ error: "Game ID is required in the query parameters" });
        //   return;
        // }
    
        // // if (noMoreNamesReturned && availableNames.size === 0) {
        // //   res.status(404).json({ error: "No more names available" });
        // //   return;
        // // }
    
        // // if (availableNames.size === 0 && typeof gameId === 'number') {
        //   const names = await Name.findAll({ where: { gameId: gameId } });
        //   console.log("names", names);
    
        //   if (names.length === 0) {
        //     noMoreNamesReturned = true;
        //     res.status(404).json({ error: "No more names available" });
        //     return;
        //   }
    
        //   // Reset the flag and add new names
        //   noMoreNamesReturned = false;
        //   names.forEach((name) => {
        //     const nameValue = name.get("name");// Assuming 'name' is the property you want to add
        //     if (nameValue !== undefined && nameValue !== null) {
        //       availableNames.add(nameValue);
        //     } else {
        //       console.warn("Skipping undefined or null name:", name);
        //     }
        //   });// Assuming 'name' is the property you want to add
        // // }
        // console.log({availableNames})
    
        // const namesArray = [...availableNames];
        // const randomIndex = Math.floor(Math.random() * namesArray.length);
        // const randomName = namesArray[randomIndex] as object | null;
    
        // availableNames.delete(randomName);
        // console.log({availableNames})
    
        // if (availableNames.size === 0) {
        //   noMoreNamesReturned = true;
        // }
    
        // res.status(200).json({ name: randomName });