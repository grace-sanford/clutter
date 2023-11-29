import express, { Request, Response } from 'express';
import {Game} from '../db'
import {Team} from "../db/models/team"

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    res.status(201).send(await Game.create({ uuid: req.body.uuid}));
  } catch {
    res.status(400).json({ error: 'Error creating game' });
  }
});

router.get('/', async (req: Request, res: Response) => {
try {
    const response = await Game.findAll({attributes: ['id', 'createdAt']});
    res.send(response);
  } catch (error) {
    console.error("Error getting games:", error);
    res.status(400).json({ error: 'Error getting games' });
  }
  
});

export default router;