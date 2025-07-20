import mongoose from 'mongoose';
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to DB successfully.');
  } catch (error) {
    console.log('Failed to connect DB');
  }
}

export default connectDb;
