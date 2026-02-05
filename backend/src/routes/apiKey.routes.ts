
import { Router } from 'express';
import { createApiKey, getActiveKeys, revokeApiKey } from '../controllers/apiKey.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

router.post('/', auth, createApiKey);
router.get('/', auth, getActiveKeys);
router.delete('/:id', auth, revokeApiKey);

export default router;
