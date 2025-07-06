import express from 'express';
import { createPlan, getPlans } from '../controllers/adminController.js';

const router = express.Router();
router.post('/plans', createPlan);
router.get('/plans', getPlans);

export default router;
