import { config } from 'dotenv';
import express from 'express';
import cors from "cors"
import { AuthRouter, DeviceRouter, mapRouter, testimonialRouter } from './src/routes';
import { CheckAndVerifyAuthHeader } from './src/middleware';
config();

// Create the express app
const app = express();

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
const port = process.env.PORT || 3000; // Set the port

// Routes
app.use('/api/v1/auth', AuthRouter); // Authentication routes
app.use('/api/v1/devices', CheckAndVerifyAuthHeader, DeviceRouter); // Device routes
app.use('/api/v1/testimonials', testimonialRouter); // Device routes
app.use('/api/v1', mapRouter); // Device routes
app.get("/",(req, res)=>{
  res.status(200).json({message: "The app is running well"})
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
