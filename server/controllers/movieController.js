const Movie = require('../models/Movie');
const inMemoryStore = require('../config/inMemoryStore');
const { getDBStatus } = require('../config/db');

// @desc    Get all movies with optional filters (search, genre, city)
// @route   GET /api/movies
const getMovies = async (req, res) => {
  try {
    const { search, genre, city, featured } = req.query;
    const dbStatus = getDBStatus();

    if (dbStatus.isConnected) {
      const query = {};

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { director: { $regex: search, $options: 'i' } },
          { cast: { $elemMatch: { $regex: search, $options: 'i' } } }
        ];
      }

      if (genre && genre !== 'All') {
        query.genre = { $in: [new RegExp(genre, 'i')] };
      }

      if (city && city !== 'All') {
        query.cities = { $in: [city] };
      }

      if (featured === 'true') {
        query.featured = true;
      }

      const movies = await Movie.find(query).sort({ rating: -1, createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: movies.length,
        dataSource: 'MongoDB Atlas',
        data: movies
      });
    } else {
      // In-Memory Demo Store fallback
      let movies = inMemoryStore.getMovies({ search, genre, city });
      if (featured === 'true') {
        movies = movies.filter(m => m.featured);
      }

      return res.status(200).json({
        success: true,
        count: movies.length,
        dataSource: 'Demo In-Memory Mode',
        data: movies
      });
    }
  } catch (error) {
    console.error('Error in getMovies:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch movies',
      error: error.message
    });
  }
};

// @desc    Get single movie by ID
// @route   GET /api/movies/:id
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isConnected) {
      // Check if valid ObjectId
      const isValidId = id.match(/^[0-9a-fA-F]{24}$/);
      let movie = null;
      if (isValidId) {
        movie = await Movie.findById(id);
      } else {
        movie = await Movie.findOne({ _id: id });
      }

      if (!movie) {
        return res.status(404).json({
          success: false,
          message: 'Movie not found'
        });
      }

      return res.status(200).json({
        success: true,
        dataSource: 'MongoDB Atlas',
        data: movie
      });
    } else {
      const movie = inMemoryStore.getMovieById(id);
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: 'Movie not found'
        });
      }

      return res.status(200).json({
        success: true,
        dataSource: 'Demo In-Memory Mode',
        data: movie
      });
    }
  } catch (error) {
    console.error('Error in getMovieById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch movie details',
      error: error.message
    });
  }
};

// @desc    Get unique genres
// @route   GET /api/movies/meta/genres
const getGenres = async (req, res) => {
  try {
    const defaultGenres = [
      'All',
      'Action',
      'Adventure',
      'Animation',
      'Biography',
      'Comedy',
      'Crime',
      'Drama',
      'History',
      'Sci-Fi',
      'Thriller'
    ];
    res.status(200).json({
      success: true,
      data: defaultGenres
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get available cities
// @route   GET /api/movies/meta/cities
const getCities = async (req, res) => {
  const cities = ['All', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai'];
  res.status(200).json({
    success: true,
    data: cities
  });
};

module.exports = {
  getMovies,
  getMovieById,
  getGenres,
  getCities
};
