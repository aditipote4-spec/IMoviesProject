const Booking = require('../models/Booking');
const inMemoryStore = require('../config/inMemoryStore');
const { getDBStatus } = require('../config/db');

// Helper to generate readable Booking Reference like IMV-74912
const generateBookingId = () => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `IMV-${randomNum}`;
};

// @desc    Create a new movie ticket booking
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const {
      movieId,
      movieTitle,
      poster,
      duration,
      language,
      city,
      theater,
      date,
      showtime,
      ticketTier = 'Standard',
      seats,
      pricePerTicket,
      customer
    } = req.body;

    // --- Strict Validation ---
    const errors = [];

    if (!movieId) errors.push('Movie selection is required');
    if (!movieTitle) errors.push('Movie title is required');
    if (!city) errors.push('City is required');
    if (!theater) errors.push('Theater is required');
    if (!date) errors.push('Booking date is required');
    if (!showtime) errors.push('Showtime is required');

    if (!Array.isArray(seats) || seats.length === 0) {
      errors.push('At least one seat must be selected');
    }

    if (!customer) {
      errors.push('Customer details are required');
    } else {
      if (!customer.name || customer.name.trim().length < 2) {
        errors.push('Please enter a valid customer name (at least 2 characters)');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!customer.email || !emailRegex.test(customer.email.trim())) {
        errors.push('Please enter a valid email address');
      }
      const cleanPhone = (customer.phone || '').replace(/\D/g, '');
      if (!customer.phone || cleanPhone.length < 10) {
        errors.push('Please enter a valid 10-digit mobile number');
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // --- Dynamic Pricing Calculation ---
    const validTicketPrice = Number(pricePerTicket) > 0 ? Number(pricePerTicket) : 200;
    const ticketCount = seats.length;
    const subtotal = validTicketPrice * ticketCount;
    // 12% GST + convenience fee
    const taxAndFees = Math.round(subtotal * 0.12);
    const totalAmount = subtotal + taxAndFees;

    const bookingPayload = {
      bookingId: generateBookingId(),
      movieId,
      movieTitle,
      poster: poster || '',
      duration: duration || '2h',
      language: language || 'English',
      city,
      theater,
      date,
      showtime,
      ticketTier,
      seats,
      ticketCount,
      pricePerTicket: validTicketPrice,
      subtotal,
      taxAndFees,
      totalAmount,
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim()
      },
      paymentStatus: 'Paid',
      paymentMethod: 'Online Demo UPI/Card',
      createdAt: new Date()
    };

    const dbStatus = getDBStatus();

    if (dbStatus.isConnected) {
      const newBooking = new Booking(bookingPayload);
      const savedBooking = await newBooking.save();

      return res.status(201).json({
        success: true,
        message: 'Booking confirmed successfully!',
        dataSource: 'MongoDB Atlas',
        data: savedBooking
      });
    } else {
      const savedBooking = inMemoryStore.createBooking(bookingPayload);

      return res.status(201).json({
        success: true,
        message: 'Booking confirmed successfully! (Demo Mode)',
        dataSource: 'Demo In-Memory Mode',
        data: savedBooking
      });
    }
  } catch (error) {
    console.error('Error in createBooking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
};

// @desc    Get all bookings (optional email filter)
// @route   GET /api/bookings
const getBookings = async (req, res) => {
  try {
    const { email } = req.query;
    const dbStatus = getDBStatus();

    if (dbStatus.isConnected) {
      const filter = {};
      if (email) {
        filter['customer.email'] = email.trim().toLowerCase();
      }
      const bookings = await Booking.find(filter).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: bookings.length,
        dataSource: 'MongoDB Atlas',
        data: bookings
      });
    } else {
      let bookings = inMemoryStore.getAllBookings();
      if (email) {
        bookings = bookings.filter(b => b.customer.email.toLowerCase() === email.trim().toLowerCase());
      }

      return res.status(200).json({
        success: true,
        count: bookings.length,
        dataSource: 'Demo In-Memory Mode',
        data: bookings
      });
    }
  } catch (error) {
    console.error('Error in getBookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: error.message
    });
  }
};

// @desc    Get booking by ID or reference code
// @route   GET /api/bookings/:id
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isConnected) {
      const isValidObjectId = id.match(/^[0-9a-fA-F]{24}$/);
      let booking = null;

      if (isValidObjectId) {
        booking = await Booking.findById(id);
      }
      if (!booking) {
        booking = await Booking.findOne({ bookingId: id });
      }

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      return res.status(200).json({
        success: true,
        dataSource: 'MongoDB Atlas',
        data: booking
      });
    } else {
      const booking = inMemoryStore.getBookingById(id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      return res.status(200).json({
        success: true,
        dataSource: 'Demo In-Memory Mode',
        data: booking
      });
    }
  } catch (error) {
    console.error('Error in getBookingById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking',
      error: error.message
    });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.isConnected) {
      let booking = await Booking.findOne({ $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { bookingId: id }] });
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      booking.paymentStatus = 'Cancelled';
      await booking.save();

      return res.status(200).json({
        success: true,
        message: 'Booking cancelled successfully',
        data: booking
      });
    } else {
      const booking = inMemoryStore.cancelBooking(id);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'Booking cancelled successfully',
        data: booking
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking
};
