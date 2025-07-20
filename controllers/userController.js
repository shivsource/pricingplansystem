// userController.js
import { subscribeUserToPlan, getUserPlan } from '../services/subscriptionService.js';
import { errorRes, successRes } from '../utils/helper.js';

export const subscribePlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.body;
    const result = await subscribeUserToPlan(userId, planId);

    return successRes(res, { message: `Successfully subscribed to Plan ${result.name}`, data: result });
  } catch (error) {
    return errorRes(res, error);
  }
};

export const getActivePlan = async (req, res) => {
  try {
    const plan = await getUserPlan(req.user.id);
    if (!plan) return errorRes(res, { statusCode: 404, message: "No data found" })

    return successRes(res, plan);    
  } catch (error) {
    return errorRes(res, error);
  }

};
