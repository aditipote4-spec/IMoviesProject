import React from 'react';
import { X, Star, Clock, Calendar, Ticket, User, Video, ShieldCheck } from 'lucide-react';

export default function MovieDetailsModal({ movie, onClose, onBookNow }) {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="movie-details-modal modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        {/* Hero Backdrop */}
        <div className="details-hero">
          <img
            src={movie.backdrop || movie.poster}
            alt={movie.title}
            className="details-backdrop"
          />
          <div className="details-gradient" />
        </div>

        {/* Modal Body */}
        <div className="details-body">
          <div className="details-header">
            <img
              src={movie.poster}
              alt={movie.title}
              className="details-poster"
            />
            <div className="details-intro">
              <div className="rating-badge" style={{ width: 'fit-content' }}>
                <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                <span>{movie.rating.toFixed(1)} / 10 IMDb</span>
              </div>
              <h2 className="details-title">{movie.title}</h2>
              {movie.tagline && <p className="details-tagline">"{movie.tagline}"</p>}

              <div className="movie-meta-row" style={{ marginTop: '0.4rem', color: '#e2e8f0' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} />
                  {movie.duration}
                </span>
                <span>•</span>
                <span>{movie.language}</span>
                <span>•</span>
                <span>{Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</span>
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="info-label" style={{ marginBottom: '0.4rem' }}>Synopsis</h4>
            <p className="synopsis-text">{movie.description}</p>
          </div>

          {/* Quick Info Grid */}
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Director</span>
              <span className="info-value">{movie.director || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Release Date</span>
              <span className="info-value">{movie.releaseDate || '2024'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Standard Ticket</span>
              <span className="info-value" style={{ color: 'var(--accent-pink)' }}>₹{movie.price?.standard || 200}</span>
            </div>
            <div className="info-item">
              <span className="info-label">VIP Recliner</span>
              <span className="info-value" style={{ color: 'var(--accent-gold)' }}>₹{movie.price?.vip || 500}</span>
            </div>
          </div>

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <div>
              <h4 className="info-label" style={{ marginBottom: '0.5rem' }}>Top Cast</h4>
              <div className="cast-tags">
                {movie.cast.map((actor, idx) => (
                  <span key={idx} className="cast-tag">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Available Theaters preview */}
          {movie.theaters && movie.theaters.length > 0 && (
            <div>
              <h4 className="info-label" style={{ marginBottom: '0.5rem' }}>Sample Theaters & Showtimes</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {movie.theaters.map((t, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'var(--bg-card)',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{t.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.location}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {t.showtimes.map((st, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.2rem 0.5rem',
                            background: '#111320',
                            borderRadius: '4px',
                            color: '#94a3b8',
                            border: '1px solid var(--border-color)'
                          }}
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={onClose}
              className="nav-btn"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(movie);
              }}
              className="nav-btn primary"
              style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
            >
              <Ticket size={18} />
              <span>Book Tickets Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
