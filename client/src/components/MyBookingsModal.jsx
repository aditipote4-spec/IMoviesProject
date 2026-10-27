import React, { useState } from 'react';
import { X, Ticket, Calendar, Clock, MapPin, Search, Trash2, ExternalLink } from 'lucide-react';

export default function MyBookingsModal({
  bookings = [],
  onClose,
  onViewTicket,
  onCancelBooking,
  onRefreshBookings
}) {
  const [filterEmail, setFilterEmail] = useState('');

  const filteredBookings = filterEmail.trim()
    ? bookings.filter(b => b.customer?.email?.toLowerCase().includes(filterEmail.trim().toLowerCase()))
    : bookings;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="my-bookings-modal modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Ticket size={24} color="var(--accent-pink)" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>My Movie Bookings</h2>
          </div>

          {/* Quick email search */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Filter by email..."
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 0.8rem 0.4rem 2rem',
                color: '#fff',
                fontSize: '0.8rem'
              }}
            />
          </div>
        </div>

        {/* List of bookings */}
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <div className="empty-state" style={{ margin: '1rem 0' }}>
              <Ticket size={40} color="var(--text-muted)" />
              <h3>No Bookings Found</h3>
              <p>
                {filterEmail
                  ? `No reservations match "${filterEmail}".`
                  : "You haven't booked any movie tickets yet. Pick a movie and reserve your favorite seats!"}
              </p>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b._id || b.bookingId}
                className={`booking-item-card ${b.paymentStatus === 'Cancelled' ? 'cancelled' : ''}`}
              >
                {b.poster && (
                  <img
                    src={b.poster}
                    alt={b.movieTitle}
                    style={{
                      width: '70px',
                      aspectRatio: '2/3',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                )}

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{b.movieTitle}</h3>
                    <span className={`booking-status-tag ${b.paymentStatus === 'Cancelled' ? 'cancelled' : 'paid'}`}>
                      {b.paymentStatus}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {b.theater} ({b.city})
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} />
                      {b.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} />
                      {b.showtime}
                    </span>
                    <span style={{ color: 'var(--accent-pink)', fontWeight: 600 }}>
                      Seats: {Array.isArray(b.seats) ? b.seats.join(', ') : b.seats}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', fontSize: '0.8rem' }}>
                    <span style={{ fontFamily: 'monospace', color: '#94a3b8' }}>Ref: {b.bookingId}</span>
                    <span style={{ fontWeight: 800, color: '#fff' }}>₹{b.totalAmount}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    onClick={() => onViewTicket(b)}
                    className="nav-btn primary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                    title="View & Print Ticket"
                  >
                    <ExternalLink size={14} />
                    <span>Ticket</span>
                  </button>

                  {b.paymentStatus !== 'Cancelled' && (
                    <button
                      onClick={() => onCancelBooking(b._id || b.bookingId)}
                      className="nav-btn"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', color: 'var(--accent-danger)' }}
                      title="Cancel Reservation"
                    >
                      <Trash2 size={14} />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
