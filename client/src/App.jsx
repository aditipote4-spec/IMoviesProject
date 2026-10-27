import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import MovieCard from './components/MovieCard';
import MovieDetailsModal from './components/MovieDetailsModal';
import BookingModal from './components/BookingModal';
import TicketConfirmation from './components/TicketConfirmation';
import MyBookingsModal from './components/MyBookingsModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { api } from './services/api';
import { Film, Clapperboard, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import './App.css';

export default function App() {
  // State
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState(['All']);
  const [cities, setCities] = useState(['All', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai']);
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [detailMovie, setDetailMovie] = useState(null);
  const [bookingMovie, setBookingMovie] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Data
  const [bookings, setBookings] = useState([]);
  const [dbStatus, setDbStatus] = useState({ isMongoAtlasConnected: false, mode: 'demo' });
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch initial meta and db status
  const loadInitialMetadata = async () => {
    try {
      const [healthRes, genresRes, citiesRes, bookingsRes] = await Promise.allSettled([
        api.getHealth(),
        api.getGenres(),
        api.getCities(),
        api.getBookings()
      ]);

      if (healthRes.status === 'fulfilled') {
        setDbStatus(healthRes.value);
      }

      if (genresRes.status === 'fulfilled' && genresRes.value.data) {
        setGenres(genresRes.value.data);
      }

      if (citiesRes.status === 'fulfilled' && citiesRes.value.data) {
        setCities(citiesRes.value.data);
      }

      if (bookingsRes.status === 'fulfilled' && bookingsRes.value.data) {
        setBookings(bookingsRes.value.data);
      }
    } catch (err) {
      console.warn('Initial metadata error:', err);
    }
  };

  // Fetch movies with active filters
  const fetchMoviesList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getMovies({
        search: searchQuery,
        genre: selectedGenre,
        city: selectedCity,
      });

      if (res && res.data) {
        setMovies(res.data);
      }
    } catch (err) {
      console.error('Failed to load movies:', err);
      setError('Unable to load movies. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedGenre, selectedCity]);

  // Initial load
  useEffect(() => {
    loadInitialMetadata();
  }, []);

  // Load movies on filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMoviesList();
    }, 200); // 200ms debounce
    return () => clearTimeout(timer);
  }, [fetchMoviesList]);

  // Featured movie for Hero banner (prefers featured flag, or first movie)
  const featuredMovie = useMemo(() => {
    if (!movies.length) return null;
    return movies.find((m) => m.featured) || movies[0];
  }, [movies]);

  // Booking submit handler
  const handleBookingSubmit = async (bookingData) => {
    setIsSubmittingBooking(true);
    try {
      const res = await api.createBooking(bookingData);

      if (res && res.data) {
        setBookingMovie(null); // close booking modal
        setConfirmedBooking(res.data); // open ticket confirmation modal
        setBookings((prev) => [res.data, ...prev]);
        addToast(`Ticket confirmed for ${res.data.movieTitle}!`, 'success');
      }
    } catch (err) {
      addToast(err.message || 'Booking failed. Please try again.', 'error');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Booking cancel handler
  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const res = await api.cancelBooking(id);
      if (res && res.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id || b.bookingId === id
              ? { ...b, paymentStatus: 'Cancelled' }
              : b
          )
        );
        addToast('Booking cancelled successfully', 'info');
      }
    } catch (err) {
      addToast(err.message || 'Could not cancel booking', 'error');
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedGenre('All');
    setSelectedCity('All');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedGenre !== 'All' || selectedCity !== 'All' || searchQuery !== '';

  return (
    <div className="app-container">
      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Top Navbar */}
      <Navbar
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        cities={cities}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingCount={bookings.filter((b) => b.paymentStatus !== 'Cancelled').length}
        dbStatus={dbStatus}
      />

      <main className="main-content">
        {/* Hero Spotlight Banner */}
        {!hasActiveFilters && featuredMovie && (
          <HeroBanner
            movie={featuredMovie}
            onBookNow={(movie) => setBookingMovie(movie)}
            onOpenDetails={(movie) => setDetailMovie(movie)}
          />
        )}

        {/* Filter & Genre Bar */}
        <FilterBar
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
          totalResults={movies.length}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            <Clapperboard size={22} color="var(--accent-pink)" />
            {hasActiveFilters ? 'Filtered' : 'Now'} <span>Showing</span>
          </h2>
        </div>

        {/* Movie Grid or Loading / Error states */}
        {loading ? (
          <div className="empty-state" style={{ minHeight: '300px', justifyContent: 'center' }}>
            <Loader2 size={36} color="var(--accent-pink)" className="animate-spin" />
            <h3>Loading Blockbuster Movies...</h3>
          </div>
        ) : error ? (
          <div className="empty-state">
            <AlertCircle size={40} color="var(--accent-danger)" />
            <h3>Connection Error</h3>
            <p>{error}</p>
            <button onClick={fetchMoviesList} className="nav-btn primary">
              Try Again
            </button>
          </div>
        ) : movies.length === 0 ? (
          <div className="empty-state">
            <Film size={44} color="var(--text-muted)" />
            <h3>No Movies Found</h3>
            <p>
              We couldn't find any movies matching your current filters
              {searchQuery && ` for "${searchQuery}"`}. Try choosing a different genre or city.
            </p>
            <button onClick={handleResetFilters} className="nav-btn primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id || movie.title}
                movie={movie}
                onSelectMovie={(m) => setDetailMovie(m)}
                onBookMovie={(m) => setBookingMovie(m)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Movie Details Modal */}
      {detailMovie && (
        <MovieDetailsModal
          movie={detailMovie}
          onClose={() => setDetailMovie(null)}
          onBookNow={(m) => setBookingMovie(m)}
        />
      )}

      {/* Seat Booking Modal */}
      {bookingMovie && (
        <BookingModal
          movie={bookingMovie}
          selectedCity={selectedCity}
          onClose={() => setBookingMovie(null)}
          onSubmitBooking={handleBookingSubmit}
          isSubmitting={isSubmittingBooking}
        />
      )}

      {/* Ticket Confirmation Pass Modal */}
      {confirmedBooking && (
        <TicketConfirmation
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
          onViewMyBookings={() => {
            setConfirmedBooking(null);
            setIsMyBookingsOpen(true);
          }}
        />
      )}

      {/* My Bookings History Modal */}
      {isMyBookingsOpen && (
        <MyBookingsModal
          bookings={bookings}
          onClose={() => setIsMyBookingsOpen(false)}
          onViewTicket={(b) => {
            setIsMyBookingsOpen(false);
            setConfirmedBooking(b);
          }}
          onCancelBooking={handleCancelBooking}
          onRefreshBookings={() => api.getBookings().then((r) => setBookings(r.data))}
        />
      )}

      {/* Footer */}
      <Footer dbStatus={dbStatus} />
    </div>
  );
}
