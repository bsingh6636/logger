
import { Request, Response } from 'express';
import { ApiKey } from '../models/apiKey.model';
import { generateApiKey } from '../helpers/apiKey.helper';

export const createApiKey = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = (req as any).token._id;
    const key = generateApiKey();
    const apiKey = new ApiKey({ userId, key, name });
    await apiKey.save();
    res.status(201).send({ apiKey });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getActiveKeys = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).token._id;
    const apiKeys = await ApiKey.find({ userId, isActive: true });
    res.send(apiKeys);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const revokeApiKey = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).token._id;
    const apiKey = await ApiKey.findOneAndUpdate({ _id: id, userId }, { isActive: false });
    if (!apiKey) {
      return res.status(404).send({ error: 'API key not found' });
    }
    res.send({ message: 'API key revoked successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};
