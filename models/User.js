import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, required: false, default: 0 },
  currentPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserPlan', default: null }
});


userSchema.pre('save', async function (next) {
  const user = this;

  if (!this.isModified('password'))
    return next();

  try {
    const salt = 10;
    const hashedPass = await bcrypt.hash(user.password, salt);
    user.password = hashedPass;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (user_password) {
  return bcrypt.compare(user_password, this.password)
}

userSchema.methods.generateToken = async function () {
  const payload = {
    id: this._id,
    email: this.email,
    is_admin: this.is_admin
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
  return token ?? false;
}

const User = mongoose.model('User', userSchema);
export default User;
