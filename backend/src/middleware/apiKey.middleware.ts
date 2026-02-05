
import { Request, Response, NextFunction } from 'express';
import { ApiKey } from '../models/apiKey.model';

export const apiKeyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.header('X-API-Key');
  if (!key) {
    return res.status(401).send({ error: 'API key is missing' });
  }
  try {
    const apiKey = await ApiKey.findOne({ key, isActive: true });
    if (!apiKey) {
      return res.status(401).send({ error: 'Invalid API key' });
    }
    (req as any).userId = apiKey.userId;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid API key' });
  }
};
