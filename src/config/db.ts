import mongoose from 'mongoose';

export async function connectMongoDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Connection to MongoDB failed');
    throw new Error(
      `Failed to connect to MongoDB: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
