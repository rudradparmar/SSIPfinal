import 'dotenv/config'; //if i dont put this on top-level, it will not read .env variables

import express from 'express';


import authRoutes from '../routes/authRoutes.js';
import { connectDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

/*app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

app.get('/api/auth/register', (req, res) => {
  res.json({ message: 'Register endpoint' });
});*/

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB(); //connect to database as soon as start server
});