import express, { Request, Response } from "express";
import { Game } from "../db";
require('express-async-errors');

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    res.status(201).send(await Game.create({ uuid: req.body.uuid }));
  } catch (error) {
    console.error("Error getting games:", error);
    res.status(400).json({ error: "Error creating game" });
  }
});

router.get("/:uuid", async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    console.log("uuid", uuid)
    if (!uuid) {
      return res.status(400).json({ error: "UUID is required." });
    }

    const response = await Game.findOne({ where: { uuid: uuid } });
    res.send(response);
  } catch (error) {
    console.error("Error getting games:", error);
    res.status(400).json({ error: "Error getting games" });
  }
});

export default router;
