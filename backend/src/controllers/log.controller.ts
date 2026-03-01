
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
    const {
      level,
      service,
      function: func,
      message,
      from,
      to,
      page = '1',
      limit = '50',
      sort = 'desc',
    } = req.query;

    const query: Record<string, any> = { userId };
    if (level) query.level = level;
    if (service) query.service = { $regex: service, $options: 'i' };
    if (func) query.function = { $regex: func, $options: 'i' };
    if (message) query.message = { $regex: message, $options: 'i' };

    if (from || to) {
      query.timestamp = {} as { $gte?: Date; $lte?: Date };
      if (from) {
        const fromDate = new Date(from as string);
        if (!Number.isNaN(fromDate.getTime())) {
          query.timestamp.$gte = fromDate;
        }
      }
      if (to) {
        const toDate = new Date(to as string);
        if (!Number.isNaN(toDate.getTime())) {
          query.timestamp.$lte = toDate;
        }
      }
      if (Object.keys(query.timestamp).length === 0) {
        delete query.timestamp;
      }
    }

    const pageNumber = Math.max(parseInt(page as string, 10) || 1, 1);
    const limitNumber = Math.min(Math.max(parseInt(limit as string, 10) || 50, 1), 200);
    const sortDirection = sort === 'asc' ? 1 : -1;

    const [total, logs] = await Promise.all([
      Log.countDocuments(query),
      Log.find(query)
        .sort({ timestamp: sortDirection })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
    ]);

    res.send({
      data: logs,
      page: pageNumber,
      limit: limitNumber,
      total,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
