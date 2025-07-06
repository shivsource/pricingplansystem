import redis from '../config/redis.js';

export const cacheUserPlan = async (userId, plan, features, endDate) => {
  const key = `user:plan:${userId}`;
  const data = {
    planId: plan._id.toString(),
    endDate: endDate.toISOString(),
    storageUsed: 0,
    messagesUsed: 0,
    ...features
  };

  await redis.set(key, JSON.stringify(data), {
    EX: Math.floor((endDate.getTime() - Date.now()) / 1000)
  });
};

export const getUserPlanFromCache = async (userId) => {
  const data = await redis.get(`user:plan:${userId}`);
  return data ? JSON.parse(data) : null;
};

export const incrementFeature = async (userId, feature, amount = 1) => {
  const key = `user:plan:${userId}`;
  const plan = await getUserPlanFromCache(userId);
  if (!plan) return false;

  plan[`${feature}Used`] += amount;
  if (plan[`${feature}Used`] > plan[feature]) return false;

  await redis.set(key, JSON.stringify(plan));
  return true;
};
