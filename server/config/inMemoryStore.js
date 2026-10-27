const seedMovies = require('../seed/seedMovies');

// Generate realistic mock IDs for demo mode
let mockMovies = seedMovies.map((m, index) => ({
  _id: `demo_mov_${index + 1}`,
  ...m,
  createdAt: new Date().toISOString()
}));

let mockBookings = [
  {
    _id: "demo_bk_1",
    bookingId: "IMV-88214",
    movieId: "demo_mov_1",
    movieTitle: "Dune: Part Two",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    duration: "2h 46m",
    language: "English",
    city: "Mumbai",
    theater: "PVR IMAX Phoenix Marketcity",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    showtime: "05:30 PM",
    ticketTier: "Premium",
    seats: ["C4", "C5"],
    ticketCount: 2,
    pricePerTicket: 350,
    subtotal: 700,
    taxAndFees: 84,
    totalAmount: 784,
    customer: {
      name: "Demo Student",
      email: "student@example.com",
      phone: "+91 9876543210"
    },
    paymentStatus: "Paid",
    paymentMethod: "Online Demo UPI/Card",
    createdAt: new Date()
  }
];

const inMemoryStore = {
  getMovies: (filter = {}) => {
    let result = [...mockMovies];

    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        (m.cast && m.cast.some(actor => actor.toLowerCase().includes(q)))
      );
    }

    if (filter.genre && filter.genre !== 'All') {
      result = result.filter(m =>
        m.genre.some(g => g.toLowerCase() === filter.genre.toLowerCase())
      );
    }

    if (filter.city && filter.city !== 'All') {
      result = result.filter(m =>
        !m.cities || m.cities.includes(filter.city)
      );
    }

    return result;
  },

  getMovieById: (id) => {
    return mockMovies.find(m => m._id.toString() === id.toString() || m.id === id);
  },

  getAllBookings: () => {
    return [...mockBookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getBookingById: (idOrBookingId) => {
    return mockBookings.find(b =>
      b._id.toString() === idOrBookingId.toString() ||
      b.bookingId === idOrBookingId
    );
  },

  createBooking: (bookingData) => {
    const newBooking = {
      _id: `demo_bk_${Date.now()}`,
      ...bookingData,
      createdAt: new Date()
    };
    mockBookings.unshift(newBooking);
    return newBooking;
  },

  cancelBooking: (idOrBookingId) => {
    const booking = mockBookings.find(b =>
      b._id.toString() === idOrBookingId.toString() ||
      b.bookingId === idOrBookingId
    );
    if (booking) {
      booking.paymentStatus = 'Cancelled';
      return booking;
    }
    return null;
  },

  getSeedMovies: () => seedMovies
};

module.exports = inMemoryStore;
