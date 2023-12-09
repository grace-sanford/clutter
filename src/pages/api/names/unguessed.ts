import type { NextApiRequest, NextApiResponse } from "next";
import { Name } from "../../../../server/db";

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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NameResponse>
) {
  try {
    const { gameId } = req.query;
    const unGuessedNames = await Name.findAll({
      where: { isGuessed: false, gameId: gameId },
    });
    shuffleArray(unGuessedNames);
    res.status(200).json({ unGuessedNames });
  } catch (error) {
    console.error("Error getting random name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
