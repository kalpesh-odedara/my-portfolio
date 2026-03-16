import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // In production, consider limiting to frontend URL
app.use(express.json());

app.use('/api', projectRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio backend API running' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
