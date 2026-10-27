const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { connectDB, getDBStatus } = require('./config/db');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// API Health & Status check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.status(200).json({
    status: 'online',
    appName: 'iMovies API',
    version: '1.0.0',
    mode: dbStatus.mode,
    isMongoAtlasConnected: dbStatus.isConnected,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

// Static client build serving for production
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`📦 Serving production frontend build from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));

  // SPA fallback: any non-API route serves the frontend index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    } else {
      res.status(404).json({
        success: false,
        message: `API route not found: ${req.originalUrl}`
      });
    }
  });
} else {
  // Fallback root route if client/dist is not built
  app.get('/', (req, res) => {
    res.json({
      message: '🎬 Welcome to iMovies Backend API',
      endpoints: {
        health: '/api/health',
        movies: '/api/movies',
        movieDetails: '/api/movies/:id',
        genres: '/api/movies/meta/genres',
        cities: '/api/movies/meta/cities',
        bookings: '/api/bookings'
      }
    });
  });

  // 404 Not Found Handler for API
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `API route not found: ${req.originalUrl}`
    });
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to Database and start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 iMovies Backend Server is running on: http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🍿 Movies API:   http://localhost:${PORT}/api/movies`);
    console.log(`🎫 Bookings API: http://localhost:${PORT}/api/bookings\n`);
  });
};

startServer();
