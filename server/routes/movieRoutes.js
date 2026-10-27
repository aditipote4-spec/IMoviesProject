const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovieById,
  getGenres,
  getCities
} = require('../controllers/movieController');

router.get('/', getMovies);
router.get('/meta/genres', getGenres);
router.get('/meta/cities', getCities);
router.get('/:id', getMovieById);

module.exports = router;
