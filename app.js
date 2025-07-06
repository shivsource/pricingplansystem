import express from 'express';
import dotenv from 'dotenv';
import './config/mongoose.js';
import authMiddleware from './utils/authMiddleware.js';

import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';
import usageRoutes from './routes/usage.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(authMiddleware);

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/files', usageRoutes);
app.use('/messages', usageRoutes);

export default app;
