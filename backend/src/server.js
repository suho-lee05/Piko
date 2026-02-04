require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Supabase connection test
app.get('/api/db-health', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('__test')
      .select('*')
      .limit(1);
    
    if (error) {
      return res.status(500).json({ status: 'ERROR', message: 'Database connection failed' });
    }
    
    res.json({ status: 'OK', message: 'Database connected successfully' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
