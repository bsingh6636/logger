
import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import logRoutes from './routes/log.routes';
import apiKeyRoutes from './routes/apiKey.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI!);

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/keys', apiKeyRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
