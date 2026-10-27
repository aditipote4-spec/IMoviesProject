const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Common fetch wrapper with error parsing
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = data.message ||
        (Array.isArray(data.errors) ? data.errors.join(', ') : 'An unexpected error occurred');
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${url}:`, error.message);
    throw error;
  }
}

export const api = {
  // System health & mode check
  getHealth: () => request('/health'),

  // Movie APIs
  getMovies: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.genre && params.genre !== 'All') query.append('genre', params.genre);
    if (params.city && params.city !== 'All') query.append('city', params.city);
    if (params.featured) query.append('featured', 'true');

    const qs = query.toString();
    return request(`/movies${qs ? `?${qs}` : ''}`);
  },

  getMovieById: (id) => request(`/movies/${id}`),

  getGenres: () => request('/movies/meta/genres'),

  getCities: () => request('/movies/meta/cities'),

  // Booking APIs
  createBooking: (bookingData) =>
    request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),

  getBookings: (email = '') => {
    const qs = email ? `?email=${encodeURIComponent(email)}` : '';
    return request(`/bookings${qs}`);
  },

  getBookingById: (id) => request(`/bookings/${id}`),

  cancelBooking: (id) =>
    request(`/bookings/${id}/cancel`, {
      method: 'PUT',
    }),
};

export default api;
