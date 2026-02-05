
import { Router } from 'express';
import { createLog, getLogs } from '../controllers/log.controller';
import { apiKeyAuth } from '../middleware/apiKey.middleware';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.post('/', apiKeyAuth, createLog);
router.get('/', auth, getLogs);

export default router;
