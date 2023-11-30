import express, { Request, Response } from "express";
import { Name } from "../db";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {names, gameId} = req.body
    console.log(req.body)
    console.log({names})
    console.log({gameId})
    const namesToCreate = names.map((n: any) => ({ name: n, gameId: gameId }));
    console.log({namesToCreate})
    const createdNames = await Name.bulkCreate(namesToCreate);
    res.status(201).json(createdNames);
  } catch {
    res.status(400).json({ error: "Error creating game" });
  }
});

export default router;