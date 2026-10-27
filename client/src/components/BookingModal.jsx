import React, { useState, useMemo } from 'react';
import { X, Calendar, Clock, MapPin, User, Mail, Phone, Ticket, Check, AlertCircle } from 'lucide-react';

export default function BookingModal({
  movie,
  selectedCity,
  onClose,
  onSubmitBooking,
  isSubmitting
}) {
  if (!movie) return null;

  // Generate the next 3 dates dynamically
  const dates = useMemo(() => {
    const list = [];
    for (let i = 0; i < 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      const isoStr = d.toISOString().split('T')[0];
      list.push({ dayName, dateStr, isoStr });
    }
    return list;
  }, []);

  const [selectedDate, setSelectedDate] = useState(dates[0].isoStr);

  // Available theaters for this movie
  const availableTheaters = useMemo(() => {
    if (movie.theaters && movie.theaters.length > 0) {
      return movie.theaters;
    }
    return [
      {
        name: `PVR Cinemas ${selectedCity === 'All' ? 'Central' : selectedCity}`,
        location: 'Downtown Mall, Screen 2',
        showtimes: ['10:30 AM', '02:00 PM', '05:45 PM', '09:15 PM']
      },
      {
        name: `INOX Laser Multiplex`,
        location: 'Grand Galleria, Screen 4',
        showtimes: ['11:15 AM', '03:30 PM', '07:00 PM', '10:30 PM']
      }
    ];
  }, [movie, selectedCity]);

  const [selectedTheaterIndex, setSelectedTheaterIndex] = useState(0);
  const activeTheater = availableTheaters[selectedTheaterIndex] || availableTheaters[0];

  const [selectedShowtime, setSelectedShowtime] = useState(
    activeTheater.showtimes?.[0] || '06:00 PM'
  );

  // Ticket Tiers
  const tierPrices = {
    Standard: movie.price?.standard || 200,
    Premium: movie.price?.premium || 350,
    VIP: movie.price?.vip || 500,
  };

  const [selectedTier, setSelectedTier] = useState('Standard');

  // Realistic seat layout (Rows A to E, Seats 1 to 8)
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 8;

  // Predictable pseudo-booked seats based on movie title length so it feels alive
  const preBookedSeats = useMemo(() => {
    const seed = movie.title.length;
    return ['A3', 'A4', 'B6', 'C4', 'C5', 'D2', 'E7'].slice(0, 3 + (seed % 4));
  }, [movie.title]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  // Customer form details
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  // Toggle seat selection
  const handleSeatClick = (seatId) => {
    if (preBookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        alert('You can select a maximum of 8 seats per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Pricing calculations
  const pricePerTicket = tierPrices[selectedTier] || 200;
  const ticketCount = selectedSeats.length;
  const subtotal = ticketCount * pricePerTicket;
  const taxAndFees = Math.round(subtotal * 0.12);
  const totalAmount = subtotal + taxAndFees;

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (selectedSeats.length === 0) {
      newErrors.seats = 'Please select at least 1 seat on the screen layout.';
    }

    if (!customer.name.trim() || customer.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customer.email.trim() || !emailRegex.test(customer.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const cleanPhone = customer.phone.replace(/\D/g, '');
    if (!customer.phone.trim() || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit mobile number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      movieId: movie._id,
      movieTitle: movie.title,
      poster: movie.poster,
      duration: movie.duration,
      language: movie.language,
      city: selectedCity === 'All' ? 'Mumbai' : selectedCity,
      theater: activeTheater.name,
      date: selectedDate,
      showtime: selectedShowtime,
      ticketTier: selectedTier,
      seats: selectedSeats,
      pricePerTicket,
      customer,
    };

    onSubmitBooking(payload);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="booking-modal modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        <div className="booking-content">
          {/* Header */}
          <div className="booking-header">
            <div className="booking-movie-info">
              <h2>Book Tickets: {movie.title}</h2>
              <p>
                {movie.language} • {movie.duration} • {selectedCity === 'All' ? 'Mumbai' : selectedCity}
              </p>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Step 1: Date Selection */}
            <div>
              <div className="booking-section-title">
                <Calendar size={16} color="var(--accent-pink)" />
                <span>Select Date</span>
              </div>
              <div className="date-options">
                {dates.map((d) => (
                  <button
                    key={d.isoStr}
                    type="button"
                    onClick={() => setSelectedDate(d.isoStr)}
                    className={`date-card ${selectedDate === d.isoStr ? 'active' : ''}`}
                  >
                    <span className="date-day">{d.dayName}</span>
                    <span className="date-val">{d.dateStr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Cinema & Showtime */}
            <div>
              <div className="booking-section-title">
                <MapPin size={16} color="var(--accent-pink)" />
                <span>Select Cinema & Showtime</span>
              </div>
              <div className="theater-cards">
                {availableTheaters.map((t, idx) => (
                  <div
                    key={idx}
                    className={`theater-card ${selectedTheaterIndex === idx ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedTheaterIndex(idx);
                      setSelectedShowtime(t.showtimes[0]);
                    }}
                  >
                    <div>
                      <span className="theater-name">{t.name}</span>
                      <span className="theater-location"> • {t.location}</span>
                    </div>

                    <div className="showtime-pills">
                      {t.showtimes.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTheaterIndex(idx);
                            setSelectedShowtime(st);
                          }}
                          className={`showtime-pill ${
                            selectedTheaterIndex === idx && selectedShowtime === st ? 'active' : ''
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Ticket Class / Tier */}
            <div>
              <div className="booking-section-title">
                <Ticket size={16} color="var(--accent-pink)" />
                <span>Select Ticket Category</span>
              </div>
              <div className="tier-selector">
                {Object.entries(tierPrices).map(([tier, price]) => (
                  <div
                    key={tier}
                    className={`tier-card ${selectedTier === tier ? 'active' : ''}`}
                    onClick={() => setSelectedTier(tier)}
                  >
                    <span className="tier-name">{tier} Class</span>
                    <span className="tier-price">₹{price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Interactive Screen & Seat Matrix */}
            <div>
              <div className="booking-section-title">
                <span>Select Seats ({selectedSeats.length} Selected)</span>
              </div>

              {errors.seats && (
                <div style={{ color: 'var(--accent-danger)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertCircle size={16} />
                  <span>{errors.seats}</span>
                </div>
              )}

              <div className="seat-matrix-container">
                <div className="cinema-screen" />

                <div className="seat-grid">
                  {rows.map((row) => (
                    <div key={row} className="seat-row">
                      <span className="row-label">{row}</span>
                      <div className="seats-in-row">
                        {Array.from({ length: seatsPerRow }, (_, i) => {
                          const seatId = `${row}${i + 1}`;
                          const isBooked = preBookedSeats.includes(seatId);
                          const isSelected = selectedSeats.includes(seatId);

                          return (
                            <button
                              key={seatId}
                              type="button"
                              disabled={isBooked}
                              onClick={() => handleSeatClick(seatId)}
                              className={`seat-btn ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                              title={`Seat ${seatId} (${isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'})`}
                            >
                              {i + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seat Legend */}
                <div className="seat-legend">
                  <div className="legend-item">
                    <span className="legend-box available" />
                    <span>Available</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-box selected" />
                    <span>Selected</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-box booked" />
                    <span>Reserved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Contact Details Form */}
            <div className="customer-form">
              <div className="booking-section-title" style={{ marginBottom: 0 }}>
                <User size={16} color="var(--accent-pink)" />
                <span>Contact Information (For Ticket Delivery)</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <span className="input-error-msg">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="input-error-msg">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                  />
                  {errors.phone && <span className="input-error-msg">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Step 6: Order Summary & Checkout Button */}
            <div className="order-summary">
              <div className="summary-row">
                <span>Selected Seats</span>
                <span style={{ fontWeight: 700, color: '#fff' }}>
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                </span>
              </div>
              <div className="summary-row">
                <span>Ticket Price ({selectedTier})</span>
                <span>₹{pricePerTicket} × {ticketCount}</span>
              </div>
              <div className="summary-row">
                <span>Taxes & GST (12%)</span>
                <span>₹{taxAndFees}</span>
              </div>
              <div className="summary-row total">
                <span>Total Payable Amount</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || selectedSeats.length === 0}
                className="submit-booking-btn"
              >
                {isSubmitting ? (
                  <span>Processing Reservation...</span>
                ) : (
                  <>
                    <Ticket size={20} />
                    <span>Confirm & Pay ₹{totalAmount}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
