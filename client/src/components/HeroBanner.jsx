import React from 'react';
import { Star, Clock, Ticket, Info, Sparkles } from 'lucide-react';

export default function HeroBanner({ movie, onBookNow, onOpenDetails }) {
  if (!movie) return null;

  return (
    <div className="hero-banner">
      <img
        src={movie.backdrop || movie.poster}
        alt={movie.title}
        className="hero-backdrop"
      />
      <div className="hero-overlay">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>Featured Premiere</span>
          </div>

          <h1 className="hero-title">{movie.title}</h1>

          <div className="hero-meta">
            <div className="rating-badge">
              <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
              <span>{movie.rating.toFixed(1)} / 10</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={15} />
              <span>{movie.duration}</span>
            </div>

            <span>•</span>
            <span>{movie.language}</span>

            <span>•</span>
            <span>{Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</span>
          </div>

          <p className="hero-desc">
            {movie.description}
          </p>

          <div className="hero-actions">
            <button
              onClick={() => onBookNow(movie)}
              className="nav-btn primary"
              style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
            >
              <Ticket size={18} />
              <span>Book Tickets</span>
            </button>

            <button
              onClick={() => onOpenDetails(movie)}
              className="nav-btn"
              style={{ padding: '0.75rem 1.4rem' }}
            >
              <Info size={18} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
