const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  showtimes: [{ type: String, required: true }]
}, { _id: false });

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  tagline: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Movie description is required']
  },
  poster: {
    type: String,
    required: [true, 'Poster image URL is required']
  },
  backdrop: {
    type: String,
    default: ''
  },
  genre: {
    type: [String],
    required: [true, 'At least one genre is required']
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 8.0
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  language: {
    type: String,
    default: 'English'
  },
  releaseDate: {
    type: String,
    default: '2024'
  },
  director: {
    type: String,
    default: 'Unknown'
  },
  cast: {
    type: [String],
    default: []
  },
  trailerUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  price: {
    standard: { type: Number, default: 200 },
    premium: { type: Number, default: 350 },
    vip: { type: Number, default: 500 }
  },
  cities: {
    type: [String],
    default: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai']
  },
  theaters: [theaterSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);
