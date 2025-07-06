// userController.js
import { subscribeUserToPlan, getUserPlan } from '../services/subscriptionService.js';

export const subscribePlan = async (req, res) => {
  const userId = req.user.id;
  const { planId } = req.body;
  const result = await subscribeUserToPlan(userId, planId);
  res.json(result);
};

export const getActivePlan = async (req, res) => {
  const plan = await getUserPlan(req.user.id);
  res.json(plan);
};
