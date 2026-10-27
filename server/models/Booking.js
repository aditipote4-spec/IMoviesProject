const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  movieId: {
    type: mongoose.Schema.Types.Mixed, // supports ObjectId or string ID in demo mode
    required: [true, 'Movie ID is required']
  },
  movieTitle: {
    type: String,
    required: [true, 'Movie title is required']
  },
  poster: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: '2h'
  },
  language: {
    type: String,
    default: 'English'
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  theater: {
    type: String,
    required: [true, 'Theater is required']
  },
  date: {
    type: String,
    required: [true, 'Booking date is required']
  },
  showtime: {
    type: String,
    required: [true, 'Showtime is required']
  },
  ticketTier: {
    type: String,
    enum: ['Standard', 'Premium', 'VIP'],
    default: 'Standard'
  },
  seats: {
    type: [String],
    required: [true, 'At least one seat must be selected'],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'Seats array cannot be empty'
    }
  },
  ticketCount: {
    type: Number,
    required: true,
    min: [1, 'Must book at least 1 ticket']
  },
  pricePerTicket: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  taxAndFees: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  customer: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Customer phone number is required'],
      trim: true
    }
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Cancelled'],
    default: 'Paid'
  },
  paymentMethod: {
    type: String,
    default: 'Online Demo UPI/Card'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
