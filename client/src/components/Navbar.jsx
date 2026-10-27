import React from 'react';
import { Film, MapPin, Search, X, Ticket, Database } from 'lucide-react';

export default function Navbar({
  selectedCity,
  onCityChange,
  cities = [],
  searchQuery,
  onSearchChange,
  onOpenMyBookings,
  bookingCount = 0,
  dbStatus
}) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-icon-wrapper">
            <Film size={22} strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <span>i</span>Movies
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search movies, actors, directors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="search-clear-btn"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Right Navigation & Actions */}
        <div className="nav-actions">
          {/* City Selector */}
          <div className="city-selector">
            <MapPin size={16} color="var(--accent-pink)" />
            <select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="city-select"
              title="Select Your City"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'All' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>

          {/* Database Mode Status Pill */}
          <div
            className="status-pill"
            title={
              dbStatus?.isMongoAtlasConnected
                ? 'Connected directly to MongoDB Atlas cluster'
                : 'Demo fallback in-memory database active. Real-time booking supported!'
            }
          >
            <span
              className={`status-dot ${dbStatus?.isMongoAtlasConnected ? 'green' : 'yellow'}`}
            ></span>
            <span>{dbStatus?.isMongoAtlasConnected ? 'Atlas' : 'Demo DB'}</span>
          </div>

          {/* My Bookings Button */}
          <button onClick={onOpenMyBookings} className="nav-btn">
            <Ticket size={18} color="var(--accent-pink)" />
            <span>My Bookings</span>
            {bookingCount > 0 && <span className="badge-count">{bookingCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
