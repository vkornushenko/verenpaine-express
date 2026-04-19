import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectMongoDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT;

async function startServer() {
  await connectMongoDB();

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.log('Failed to start server: ', error);
  process.exit(1);
});
