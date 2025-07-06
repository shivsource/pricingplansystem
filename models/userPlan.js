import mongoose from 'mongoose';

const userPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  featuresUsed: {
    storage: { type: Number, default: 0 },    // in GB
    messages: { type: Number, default: 0 }
  },
  isActive: { type: Boolean, default: true }
});

const UserPlan = mongoose.model('UserPlan', userPlanSchema);
export default UserPlan;
