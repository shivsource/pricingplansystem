import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDb from './config/mongoose.js';
connectDb();
import authMiddleware, { checkIfAdmin, validateToken } from './utils/authMiddleware.js';

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';
import usageRoutes from './routes/usage.js';

const app = express();
app.get('/', (req, res) => {
    return res.status(200).send(`${Math.floor(Date.now() / 1000)}`);
});
app.use(express.json());
app.use('/auth', authRoutes);
// app.use(authMiddleware);

app.use('/admin', validateToken, checkIfAdmin, adminRoutes);
app.use('/users', validateToken, userRoutes);
// app.use('/files', usageRoutes);
// app.use('/messages', usageRoutes);

export default app;
