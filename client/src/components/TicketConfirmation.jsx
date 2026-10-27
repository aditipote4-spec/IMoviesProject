import React, { useEffect } from 'react';
import { X, CheckCircle2, Printer, Film, Calendar, Clock, MapPin, User, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TicketConfirmation({
  booking,
  onClose,
  onViewMyBookings
}) {
  useEffect(() => {
    if (booking) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  }, [booking]);

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="ticket-modal modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        <div className="ticket-pass">
          {/* Header */}
          <div className="ticket-pass-header">
            <div className="ticket-brand">
              <Film size={22} />
              <span>iMovies Pass</span>
            </div>
            <div className="ticket-ref">
              ID: {booking.bookingId}
            </div>
          </div>

          {/* Ticket Body */}
          <div className="ticket-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700, fontSize: '0.95rem' }}>
              <CheckCircle2 size={20} />
              <span>Booking Confirmed & Seats Reserved</span>
            </div>

            <div className="ticket-movie-details">
              {booking.poster && (
                <img
                  src={booking.poster}
                  alt={booking.movieTitle}
                  className="ticket-poster-thumb"
                />
              )}
              <div className="ticket-meta">
                <div className="ticket-movie-title">{booking.movieTitle}</div>
                <div className="ticket-theater-text">{booking.theater}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {booking.city} • {booking.language || 'English'}
                </div>
              </div>
            </div>

            {/* Grid Info */}
            <div className="ticket-info-grid">
              <div className="info-item">
                <span className="info-label">Date</span>
                <span className="info-value">{booking.date}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Showtime</span>
                <span className="info-value">{booking.showtime}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Ticket Tier</span>
                <span className="info-value" style={{ color: 'var(--accent-pink)' }}>
                  {booking.ticketTier || 'Standard'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Seats</span>
                <span className="info-value" style={{ color: '#fff', letterSpacing: '0.5px' }}>
                  {Array.isArray(booking.seats) ? booking.seats.join(', ') : booking.seats}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Total Paid</span>
                <span className="info-value" style={{ color: '#10b981' }}>
                  ₹{booking.totalAmount}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Booked By</span>
                <span className="info-value">{booking.customer?.name || 'Guest'}</span>
              </div>
            </div>

            {/* Barcode / QR Simulation */}
            <div className="ticket-barcode-section">
              <div className="barcode-visual">
                <div className="bar thick"></div>
                <div className="bar"></div>
                <div className="bar medium"></div>
                <div className="bar"></div>
                <div className="bar thick"></div>
                <div className="bar"></div>
                <div className="bar medium"></div>
                <div className="bar thick"></div>
                <div className="bar"></div>
                <div className="bar medium"></div>
                <div className="bar thick"></div>
                <div className="bar"></div>
                <div className="bar thick"></div>
                <div className="bar medium"></div>
                <div className="bar"></div>
                <div className="bar thick"></div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                <QrCode size={36} color="#fff" />
                <span>Scan at Gate</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="ticket-actions">
            <button
              onClick={handlePrint}
              className="nav-btn"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <Printer size={16} />
              <span>Print Ticket</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onViewMyBookings();
              }}
              className="nav-btn primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <span>View All Bookings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
