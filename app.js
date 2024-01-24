import { config } from 'dotenv';
import express from 'express';
import { AuthRouter } from './src/routes';
config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Routes
app.use('/api/v1/auth', AuthRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
