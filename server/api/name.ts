import express, { Request, Response } from "express";
import { Name } from "../db";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { names, gameId } = req.body;
    const namesToCreate = names.map((n: any) => ({ name: n, gameId: gameId }));
    const createdNames = await Name.bulkCreate(namesToCreate);
    res.status(201).json(createdNames);
  } catch {
    res.status(400).json({ error: "Error creating name" });
  }
});

const availableNames = new Set();
let noMoreNamesReturned = false;

router.get("/random", async (req: Request, res: Response) => {
  try {
    const { gameId } = req.query;
    console.log("gameId", gameId);

    if (!gameId) {
      res
        .status(400)
        .json({ error: "Game ID is required in the query parameters" });
      return;
    }

    if (noMoreNamesReturned) {
      res.status(404).json({ error: "No more names available" });
      return;
    }

    if (availableNames.size === 0) {
      const names = await Name.findAll({ where: { gameId: gameId } });
      console.log("names", names);

      if (names.length === 0) {
        noMoreNamesReturned = true;
        res.status(404).json({ error: "No more names available" });
        return;
      }

      names.forEach((name) => availableNames.add(name));
    }

    if (availableNames.size === 0) {
      noMoreNamesReturned = true;
      res.status(404).json({ error: "No more names available" });
      return;
    }

    const namesArray = [...availableNames];
    const randomIndex = Math.floor(Math.random() * namesArray.length);
    const randomName = namesArray[randomIndex];

    availableNames.delete(randomName);

    if (availableNames.size === 0) {
      noMoreNamesReturned = true;
      res.status(404).json({ error: "No more names available" });
    } else {
      res.status(200).json({ name: randomName });
    }
  } catch (error) {
    console.error("Error getting random name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
