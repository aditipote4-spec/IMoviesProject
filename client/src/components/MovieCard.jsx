import React from 'react';
import { Star, Clock, Ticket } from 'lucide-react';

export default function MovieCard({ movie, onSelectMovie, onBookMovie }) {
  const startPrice = movie.price?.standard || 200;

  return (
    <div className="movie-card">
      {/* Poster area */}
      <div className="poster-wrapper" onClick={() => onSelectMovie(movie)}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
        />

        {/* Rating pill */}
        <div className="poster-badge">
          <div className="rating-badge" style={{ background: 'rgba(12, 13, 20, 0.85)', backdropFilter: 'blur(4px)' }}>
            <Star size={13} fill="var(--accent-gold)" color="var(--accent-gold)" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Language badge */}
        <div className="language-badge">
          {movie.language}
        </div>
      </div>

      {/* Content area */}
      <div className="movie-info">
        <div className="movie-genres-row">
          {movie.genre?.slice(0, 2).map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </div>

        <h3 className="movie-title" onClick={() => onSelectMovie(movie)}>
          {movie.title}
        </h3>

        <div className="movie-meta-row">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={13} />
            {movie.duration}
          </span>
          <span>•</span>
          <span>{movie.releaseDate || 'Now Showing'}</span>
        </div>

        <p className="movie-desc-snippet">
          {movie.description}
        </p>

        {/* Card Footer with Price and Book button */}
        <div className="movie-card-footer">
          <div className="price-indicator">
            <span className="price-label">Tickets from</span>
            <span className="price-amount">₹{startPrice}</span>
          </div>

          <button
            onClick={() => onBookMovie(movie)}
            className="book-btn"
          >
            <Ticket size={16} />
            <span>Book</span>
          </button>
        </div>
      </div>
    </div>
  );
}
