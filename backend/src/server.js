require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');
const authRoutes = require('./domains/auth/auth.routes');
const productRoutes = require('./domains/products/products.routes');
const manufacturerRoutes = require('./domains/manufacturers/manufacturers.routes');
const postRoutes = require('./domains/posts/posts.routes');
const imageRoutes = require('./domains/images/images.routes');

const app = express();
const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '127.0.0.1';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/manufacturers', manufacturerRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/images', imageRoutes);

// Supabase connection test
app.get('/api/db-health', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('__test')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase Error:', error);
      return res.status(500).json({ 
        status: 'ERROR', 
        message: 'Database connection failed',
        details: error.message,
        hint: error.hint || 'Check if the table exists and policies allow access'
      });
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
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
