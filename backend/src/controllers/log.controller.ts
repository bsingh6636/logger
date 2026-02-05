
import { Request, Response } from 'express';
import { Log } from '../models/log.model';

export const createLog = async (req: Request, res: Response) => {
  try {
    const { level, message, service, function: func } = req.body;
    const userId = (req as any).userId;
    const log = new Log({ level, message, service, function: func, userId });
    await log.save();
    res.status(201).send({ message: 'Log created successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).token._id;
    const logs = await Log.find({ userId });
    res.send(logs);
  } catch (error) {
    res.status(400).send(error);
  }
};
