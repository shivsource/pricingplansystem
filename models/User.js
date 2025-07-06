import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserPlan', default: null }
});

const User = mongoose.model('User', userSchema);
export default User;
