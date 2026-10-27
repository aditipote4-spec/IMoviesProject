const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const inMemoryStore = require('./inMemoryStore');

let dbState = {
  isConnected: false,
  mode: 'demo', // 'atlas' or 'demo'
  error: null
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

  if (!uri) {
    dbState.isConnected = false;
    dbState.mode = 'demo';
    console.log('\n' + '='.repeat(68));
    console.log('📌 [iMovies Database Notice]: DEMO FALLBACK MODE ACTIVE');
    console.log('--------------------------------------------------------------------');
    console.log('Reason: No MONGODB_URI found in server/.env');
    console.log('Status: Running with seamless in-memory database fallback.');
    console.log('👉 All features (viewing movies, filtering, booking, ticket creation)');
    console.log('   are 100% operational for your college demo!');
    console.log('');
    console.log('To connect your real MongoDB Atlas:');
    console.log('1. Open server/.env');
    console.log('2. Set MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/imovies');
    console.log('3. Restart the server.');
    console.log('='.repeat(68) + '\n');
    return;
  }

  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });

    dbState.isConnected = true;
    dbState.mode = 'atlas';
    console.log(`✅ [MongoDB Atlas Connected]: ${conn.connection.host}`);

    // Auto-seed if database is empty
    const movieCount = await Movie.countDocuments();
    if (movieCount === 0) {
      console.log('🌱 Seeding initial blockbuster movies into MongoDB Atlas...');
      const seedData = inMemoryStore.getSeedMovies();
      await Movie.insertMany(seedData);
      console.log(`✨ Successfully seeded ${seedData.length} movies into MongoDB Atlas!`);
    } else {
      console.log(`🍿 Found ${movieCount} existing movies in MongoDB Atlas.`);
    }
  } catch (error) {
    dbState.isConnected = false;
    dbState.mode = 'demo';
    dbState.error = error.message;

    console.log('\n' + '='.repeat(68));
    console.log('⚠️ [iMovies Database Warning]: MONGODB CONNECTION FAILED');
    console.log('--------------------------------------------------------------------');
    console.log(`Error details: ${error.message}`);
    console.log('Status: Gracefully switched to DEMO FALLBACK MODE (In-Memory).');
    console.log('👉 Your presentation will continue without interruption!');
    console.log('='.repeat(68) + '\n');
  }
};

const getDBStatus = () => dbState;

module.exports = {
  connectDB,
  getDBStatus
};
