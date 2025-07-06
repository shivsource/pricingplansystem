import UserPlan from '../models/UserPlan.js';
import Plan from '../models/Plan.js';
import { cacheUserPlan } from './redisService.js';

export const subscribeUserToPlan = async (userId, planId) => {
  const plan = await Plan.findById(planId);
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + plan.durationDays);

  const userPlan = await UserPlan.create({
    userId,
    planId,
    startDate,
    endDate,
    isActive: true
  });

  await cacheUserPlan(userId, userPlan, plan.features, endDate);
  return userPlan;
};

export const getUserPlan = async (userId) => {
  return await UserPlan.findOne({ userId, isActive: true }).populate('planId');
};
