import Plan from '../models/Plan.js';

export const getPlanById = (planId) => Plan.findById(planId);
