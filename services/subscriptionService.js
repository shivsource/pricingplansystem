import UserPlan from '../models/userPlan.js';
import Plan from '../models/Plan.js';
import { cacheUserPlan } from './redisService.js';
import { successRes } from '../utils/helper.js';

export const subscribeUserToPlan = async (userId, planId) => {
  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      let err = new Error('Invalid planId');
      err.statusCode = 400;
      throw err;
    }

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

    // await cacheUserPlan(userId, userPlan, plan.features, endDate);
    return { name: plan.name, price: plan.price, durationDays: plan.durationDays, userPlan };
  } catch (error) {
    let err = new Error(`${error.message || 'Error while subscribing plan in subscriptionService.'}`);
    err.statusCode = error.statusCode || 500;
    throw err;
  }
};

export const getUserPlan = async (userId) => {
  return await UserPlan.findOne({ userId, isActive: true }).populate('planId');
};
