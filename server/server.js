const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://taskverse-yourname.vercel.app', 
  ],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'TaskVerse API is running' });
});

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));