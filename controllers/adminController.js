import Plan from '../models/Plan.js';
import { errorRes, successRes } from '../utils/helper.js';

export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    return res.status(201).json({ message: 'Plan created successfully.', data: plan });
  } catch (err) {
    return errorRes(res, { error: err });
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    return successRes(res, plans);
  } catch (error) {
    return errorRes(res, { error: err });
  }
};
