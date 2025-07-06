import express from 'express';
import { uploadFile, sendMessage } from '../controllers/usageController.js';

const router = express.Router();
router.post('/plans', uploadFile);
router.get('/plans', sendMessage);

export default router;
