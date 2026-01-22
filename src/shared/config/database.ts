import mongoose from 'mongoose';
import { env } from './env.ts';


export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log(' MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(' MongoDB Error:', err);
});