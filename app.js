import { config } from 'dotenv';
import express from 'express';
import cors from "cors"
import { AuthRouter, DeviceRouter } from './src/routes';
import { CheckAndVerifyAuthHeader } from './src/middleware';
config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

// Routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/devices', CheckAndVerifyAuthHeader, DeviceRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
