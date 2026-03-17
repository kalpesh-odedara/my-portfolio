import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Update this with your MongoDB URI in .env file
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.includes('<username>') || MONGODB_URI.includes('<password>')) {
  console.error('\x1b[31m%s\x1b[0m', 'CRITICAL ERROR: MONGODB_URI is not set or contains placeholders (<username>/<password>).');
  console.error('\x1b[31m%s\x1b[0m', 'Please update the Backend/.env file with your actual MongoDB Atlas connection string.');
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

app.use(cors()); // In production, consider limiting to frontend URL
app.use(express.json());

app.use('/api', projectRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio backend API running with MongoDB' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
