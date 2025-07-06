import express from 'express';
import { subscribePlan, getActivePlan } from '../controllers/userController.js';

const router = express.Router();
router.post('/plans', subscribePlan);
router.get('/plans', getActivePlan);

export default router;
