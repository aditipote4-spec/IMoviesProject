import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function FilterBar({
  genres = [],
  selectedGenre,
  onGenreSelect,
  totalResults,
  onResetFilters,
  hasActiveFilters
}) {
  return (
    <div className="filter-section">
      <div className="genre-pills">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreSelect(genre)}
            className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="results-count">
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'movie' : 'movies'}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="nav-btn"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
            title="Reset filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
