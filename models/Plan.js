import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  features: {
    storage: { type: Number, default: 0 },
    messages: { type: Number, default: 0 }
  },
  durationDays: { type: Number, required: true },
  price: { type: Number, required: true }
});

export default mongoose.model('Plan', planSchema);
