import { incrementFeature } from '../services/redisService.js';

export const validateStorage = async (userId, size) => {
  return await incrementFeature(userId, 'storage', size);
};

export const validateMessages = async (userId) => {
  return await incrementFeature(userId, 'messages', 1);
};
