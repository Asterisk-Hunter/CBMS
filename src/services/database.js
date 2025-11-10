// Mock database service implementing the complete DBMS schema
// Simulates all tables: users, theatres, screens, movies, shows, seats, bookings, booking_seats, payments, reviews

const mockData = {
  // USERS table
  users: [
    { 
      user_id: 1, 
      name: 'Admin User',
      username: 'admin', 
      email: 'admin@cinema.com', 
      password_hash: 'hashed123',
      phone: '1234567890',
      role: 'admin',
      created_at: '2025-01-01 10:00:00'
    },
    { 
      user_id: 2, 
      name: 'John Doe',
      username: 'john_doe', 
      email: 'john@email.com', 
      password_hash: 'hashed456',
      phone: '9876543210',
      role: 'customer',
      created_at: '2025-01-15 14:30:00'
    }
  ],
  
  // THEATRES table
  theatres: [
    { 
      theatre_id: 1, 
      name: 'Cinemark Palace 20 and XD', 
      city: 'New York', 
      address: '123 Broadway St, New York, NY 10001',
      created_at: '2024-01-01 09:00:00'
    },
    { 
      theatre_id: 2, 
      name: 'AMC Empire 25', 
      city: 'New York', 
      address: '234 Times Square, New York, NY 10036',
      created_at: '2024-01-01 09:00:00'
    },
    { 
      theatre_id: 3, 
      name: 'Regal Cinemas LA Live', 
      city: 'Los Angeles', 
      address: '1000 W Olympic Blvd, Los Angeles, CA 90015',
      created_at: '2024-01-01 09:00:00'
    }
  ],
  
  // SCREENS table
  screens: [
    { screen_id: 1, theatre_id: 1, name: 'Screen 1', total_seats: 120 },
    { screen_id: 2, theatre_id: 1, name: 'Screen 2', total_seats: 100 },
    { screen_id: 3, theatre_id: 2, name: 'Screen 1', total_seats: 150 },
    { screen_id: 4, theatre_id: 2, name: 'Screen 2', total_seats: 120 },
    { screen_id: 5, theatre_id: 3, name: 'Screen 1', total_seats: 140 }
  ],
  
  // MOVIES table
  movies: [
    {
      movie_id: 1,
      title: 'Inception',
      language: 'English',
      duration_minutes: 148,
      release_date: '2010-07-16',
      genre: 'Sci-Fi, Action',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      director: 'Christopher Nolan',
      cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
      poster_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGZIFoJ-TFlTlSkKol09Ozy1dAmw7Qq4cIcbgyxXw2WxRkfOpgsYHv3CgSwSBc_ucwA6pm4oKiyif9JpJkNaQpoNcIpTDSXgyWDitNxVPsD2ueBvu1yy-D1AJWo0aCSCneUkLpAN5SA5vUoK57qpwofmHck8KsP52WI-zVjhzk3uTWfXYIToU8lMJR_wUgYRHVlvvWoMipiyk50mhhIcOWsNsR58c3Fr9JDQghcvdv0uDeCInail77rLc3xowUKcW0rlgThP8O5SZm'
    },
    {
      movie_id: 2,
      title: 'The Dark Knight',
      language: 'English',
      duration_minutes: 152,
      release_date: '2008-07-18',
      genre: 'Action, Crime',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
      director: 'Christopher Nolan',
      cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
      poster_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8F7VKmCBZ7TDnZQr5h3XcTfOXD9FdqZL3OmYBq3w8UU4c8h7JCwVwScTnw5_RFKxAWb8pDO3Hv5xQqYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFGOXb8qYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFGOXb8qYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFG'
    },
    {
      movie_id: 3,
      title: 'Interstellar',
      language: 'English',
      duration_minutes: 169,
      release_date: '2014-11-07',
      genre: 'Sci-Fi, Drama',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      director: 'Christopher Nolan',
      cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
      poster_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqBGBZmCBZ7TDnZQr5h3XcTfOXD9FdqZL3OmYBq3w8UU4c8h7JCwVwScTnw5_RFKxAWb8pDO3Hv5xQqYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFGOXb8qYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFGOXb8qYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFG'
    },
    {
      movie_id: 4,
      title: 'Parasite',
      language: 'Korean',
      duration_minutes: 132,
      release_date: '2019-05-30',
      genre: 'Thriller, Drama',
      description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
      director: 'Bong Joon-ho',
      cast: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong',
      poster_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmeIHtYLn81jdLlBHFn6vx6HkUUNWjCYuyw1SG-3M3Hc-4OF4QyK3DqsS9LIWBdGJcGAeQdR7d4i02EDXJZZPxo0mIA9nd30nv20-qNbVe49N60aZNyhEgZgEmvE2ST5UpcRytA5M0EWIQYG6N9l4ZHEiNRRRuKaTAu_X9WnjAeTeBOSTJDsiML5gE4vrVBuiVj9OytdrKYKguFIAN6nocr3hx2ykDqXBoDsbKS5_115mfNqYsLK3GQEGAfCa2wFzp7f0FMgHwOf7'
    },
    {
      movie_id: 5,
      title: 'Dune',
      language: 'English',
      duration_minutes: 155,
      release_date: '2021-10-22',
      genre: 'Sci-Fi, Adventure',
      description: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family tasked with protecting the most valuable asset.',
      director: 'Denis Villeneuve',
      cast: 'Timothée Chalamet, Rebecca Ferguson, Zendaya',
      poster_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoc_ho_4_tG6pFKHQpZBFqpxPdk4icg9iwAoq_Qm3xx4wSSU9T38xsDP9WwwVzx1VHZyeCbEYrnq2NgWqtBiOQHPv4Fu5kmDF1ohelypuI9GXSStP4pEhoFm8AceyznzIxATDvCyiG4B05XyZdzUQAEyENPkx-n6FWMYCgUthOMh6G67D1roeY1TZ-iFzDE4DVpa9iPAC7SpzMbsrnRUrreUSW-FpuUB0QQ0VZbbYZrd8HhPZhHbHgA6ZhBux3rjNjZyV6QGZNcBnn'
    },
    {
      movie_id: 6,
      title: 'Joker',
      language: 'English',
      duration_minutes: 122,
      release_date: '2019-10-04',
      genre: 'Crime, Drama',
      description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.',
      director: 'Todd Phillips',
      cast: 'Joaquin Phoenix, Robert De Niro, Zazie Beetz',
      poster_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrI2ctMkwgcvmxKmBpsNfzJf2jDbte_H6BpLD4NLHRGKpB-UVDPVEQDifWf3s_9sdTyz7RstMFpd3l-QFzKmjCbv7Jlnciw6V0xmg3Jiq62IuzHzGF6wf2c4PMJdfLzmLqLS_Sqf9D_XTgbUU1T-mi8grbHSNH633LIMi5GcgTTnZkAiwnU0TBEBDsHs8xscMRIYGBvEbWWZmtZsAEF93uANl8WD-g5JAaiJVcco9H5q8sTYjtRXB97YuZ4GkmPwWBOp-oebBtvg6b'
    },
    {
      movie_id: 7,
      title: 'Avengers: Endgame',
      language: 'English',
      duration_minutes: 181,
      release_date: '2019-04-26',
      genre: 'Action, Adventure',
      description: 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
      director: 'Anthony Russo, Joe Russo',
      cast: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
      poster_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZXmCBZ7TDnZQr5h3XcTfOXD9FdqZL3OmYBq3w8UU4c8h7JCwVwScTnw5_RFKxAWb8pDO3Hv5xQqYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFGOXb8qYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFGOXb8qYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFG'
    },
    {
      movie_id: 8,
      title: 'Spider-Man: No Way Home',
      language: 'English',
      duration_minutes: 148,
      release_date: '2021-12-17',
      genre: 'Action, Adventure',
      description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.',
      director: 'Jon Watts',
      cast: 'Tom Holland, Zendaya, Benedict Cumberbatch',
      poster_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEQmCBZ7TDnZQr5h3XcTfOXD9FdqZL3OmYBq3w8UU4c8h7JCwVwScTnw5_RFKxAWb8pDO3Hv5xQqYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFGOXb8qYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFGOXb8qYqV2G-A4rD3Gb7KGk3LCzlGb9q5r8Vz3fFG'
    }
  ],
  
  // SHOWS table
  shows: [
    { 
      show_id: 1, 
      movie_id: 1, 
      screen_id: 1, 
      show_date: '2025-11-12', 
      start_time: '15:00', 
      end_time: '17:28', 
      base_price: 16.00, 
      seats_available: 120 
    },
    { 
      show_id: 2, 
      movie_id: 1, 
      screen_id: 1, 
      show_date: '2025-11-12', 
      start_time: '18:15', 
      end_time: '20:43', 
      base_price: 18.00, 
      seats_available: 120 
    },
    { 
      show_id: 3, 
      movie_id: 2, 
      screen_id: 2, 
      show_date: '2025-11-12', 
      start_time: '15:00', 
      end_time: '17:02', 
      base_price: 16.00, 
      seats_available: 100 
    },
    { 
      show_id: 4, 
      movie_id: 3, 
      screen_id: 3, 
      show_date: '2025-11-13', 
      start_time: '14:00', 
      end_time: '16:35', 
      base_price: 20.00, 
      seats_available: 150 
    },
    { 
      show_id: 5, 
      movie_id: 4, 
      screen_id: 5, 
      show_date: '2025-11-13', 
      start_time: '19:00', 
      end_time: '21:12', 
      base_price: 18.00, 
      seats_available: 140 
    }
  ],
  
  // SEATS table (pre-generated for each screen)
  seats: [],
  
  // BOOKINGS table - Sample bookings for demo
  bookings: [
    {
      booking_id: 1,
      user_id: 2,
      show_id: 1,
      booking_time: '2025-11-10 14:30:00',
      total_amount: 50.50,
      status: 'booked'
    },
    {
      booking_id: 2,
      user_id: 2,
      show_id: 4,
      booking_time: '2025-11-08 10:15:00',
      total_amount: 42.50,
      status: 'booked'
    }
  ],
  
  // BOOKING_SEATS table - Seats for sample bookings
  booking_seats: [
    // Booking 1 - Inception show
    { booking_seat_id: 1, booking_id: 1, seat_id: 45, price: 16.00, show_id: 1 },
    { booking_seat_id: 2, booking_id: 1, seat_id: 46, price: 16.00, show_id: 1 },
    { booking_seat_id: 3, booking_id: 1, seat_id: 47, price: 16.00, show_id: 1 },
    // Booking 2 - Dune show
    { booking_seat_id: 4, booking_id: 2, seat_id: 370, price: 20.00, show_id: 4 },
    { booking_seat_id: 5, booking_id: 2, seat_id: 371, price: 20.00, show_id: 4 }
  ],
  
  // PAYMENTS table - Payments for sample bookings
  payments: [
    {
      payment_id: 1,
      booking_id: 1,
      payment_time: '2025-11-10 14:31:00',
      amount: 50.50,
      payment_method: 'card',
      payment_status: 'success',
      transaction_ref: 'TXN1730989860123'
    },
    {
      payment_id: 2,
      booking_id: 2,
      payment_time: '2025-11-08 10:16:00',
      amount: 42.50,
      payment_method: 'upi',
      payment_status: 'success',
      transaction_ref: 'TXN1730817360456'
    }
  ],
  
  // REVIEWS table
  reviews: [
    {
      review_id: 1,
      user_id: 2,
      movie_id: 4,
      rating: 5,
      review_text: 'Absolutely brilliant! A masterpiece of modern cinema.',
      review_time: '2025-10-20 18:45:00'
    }
  ]
};

// Initialize seats for all screens
function initializeSeats() {
  mockData.screens.forEach(screen => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = Math.ceil(screen.total_seats / rows.length);
    
    rows.forEach((row, rowIndex) => {
      for (let num = 1; num <= seatsPerRow; num++) {
        if (mockData.seats.length < screen.total_seats * mockData.screens.indexOf(screen) + screen.total_seats) {
          mockData.seats.push({
            seat_id: mockData.seats.length + 1,
            screen_id: screen.screen_id,
            row_label: row,
            seat_number: num,
            seat_type: rowIndex >= 7 ? 'premium' : rowIndex >= 4 ? 'regular' : 'regular'
          });
        }
      }
    });
  });
}

initializeSeats();

// Session management
let currentUser = null;

// AUTH SERVICE - User login, register, logout
export const authService = {
  login: (email) => {
    // In production, validate password hash
    const user = mockData.users.find(u => u.email === email);
    if (user) {
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  },
  
  register: (userData) => {
    // Check if email already exists
    if (mockData.users.find(u => u.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }
    
    const newUser = {
      user_id: mockData.users.length + 1,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      password_hash: 'hashed_' + userData.password, // In production: bcrypt hash
      phone: userData.phone || null,
      role: 'customer',
      created_at: new Date().toISOString()
    };
    mockData.users.push(newUser);
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },
  
  logout: () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
  },
  
  getCurrentUser: () => {
    if (!currentUser) {
      const stored = localStorage.getItem('currentUser');
      currentUser = stored ? JSON.parse(stored) : null;
    }
    return currentUser;
  },
  
  isAuthenticated: () => !!authService.getCurrentUser()
};

// MOVIE SERVICE - Movie-related queries
export const movieService = {
  getAllMovies: () => {
    // Add calculated average rating from reviews
    return mockData.movies.map(movie => ({
      ...movie,
      rating: movieService.getAverageRating(movie.movie_id),
      review_count: mockData.reviews.filter(r => r.movie_id === movie.movie_id).length
    }));
  },
  
  getMovieById: (id) => {
    const movie = mockData.movies.find(m => m.movie_id === parseInt(id));
    if (!movie) return null;
    
    return {
      ...movie,
      rating: movieService.getAverageRating(movie.movie_id),
      review_count: mockData.reviews.filter(r => r.movie_id === movie.movie_id).length
    };
  },
  
  getMoviesByGenre: (genre) => {
    return mockData.movies.filter(m => m.genre.toLowerCase().includes(genre.toLowerCase()));
  },
  
  getMoviesByLanguage: (language) => {
    return mockData.movies.filter(m => m.language === language);
  },
  
  getAverageRating: (movieId) => {
    const movieReviews = mockData.reviews.filter(r => r.movie_id === movieId);
    if (movieReviews.length === 0) return 0;
    const sum = movieReviews.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat((sum / movieReviews.length).toFixed(1));
  }
};

// THEATRE SERVICE - Theatre and screen management
export const theatreService = {
  getAllTheatres: () => mockData.theatres,
  
  getTheatreById: (id) => {
    return mockData.theatres.find(t => t.theatre_id === parseInt(id));
  },
  
  getTheatresByCity: (city) => {
    return mockData.theatres.filter(t => t.city === city);
  },
  
  getScreensByTheatre: (theatreId) => {
    return mockData.screens.filter(s => s.theatre_id === parseInt(theatreId));
  },
  
  getScreenById: (screenId) => {
    const screen = mockData.screens.find(s => s.screen_id === parseInt(screenId));
    if (!screen) return null;
    
    const theatre = mockData.theatres.find(t => t.theatre_id === screen.theatre_id);
    return { ...screen, theatre };
  }
};

// SHOW SERVICE - Show scheduling and availability
export const showService = {
  getShowsByMovie: (movieId) => {
    return mockData.shows
      .filter(s => s.movie_id === parseInt(movieId))
      .map(show => {
        const screen = mockData.screens.find(sc => sc.screen_id === show.screen_id);
        const theatre = mockData.theatres.find(t => t.theatre_id === screen?.theatre_id);
        const movie = mockData.movies.find(m => m.movie_id === show.movie_id);
        
        return {
          ...show,
          screen,
          theatre,
          movie
        };
      });
  },
  
  getShowById: (showId) => {
    const show = mockData.shows.find(s => s.show_id === parseInt(showId));
    if (!show) return null;
    
    const screen = mockData.screens.find(sc => sc.screen_id === show.screen_id);
    const theatre = mockData.theatres.find(t => t.theatre_id === screen?.theatre_id);
    const movie = mockData.movies.find(m => m.movie_id === show.movie_id);
    
    return {
      ...show,
      screen,
      theatre,
      movie
    };
  },
  
  getShowsByCity: (city) => {
    const cityTheatres = mockData.theatres.filter(t => t.city === city);
    const theatreIds = cityTheatres.map(t => t.theatre_id);
    const cityScreens = mockData.screens.filter(s => theatreIds.includes(s.theatre_id));
    const screenIds = cityScreens.map(s => s.screen_id);
    
    return mockData.shows.filter(s => screenIds.includes(s.screen_id));
  },
  
  getShowsByDate: (date) => {
    return mockData.shows.filter(s => s.show_date === date);
  },
  
  getShowsByTheatre: (theatreId) => {
    const screens = mockData.screens.filter(s => s.theatre_id === parseInt(theatreId));
    const screenIds = screens.map(s => s.screen_id);
    return mockData.shows.filter(s => screenIds.includes(s.screen_id));
  }
};

// SEAT SERVICE - Seat layout and availability
export const seatService = {
  getSeatsByScreen: (screenId) => {
    return mockData.seats.filter(s => s.screen_id === parseInt(screenId));
  },
  
  getSeatById: (seatId) => {
    return mockData.seats.find(s => s.seat_id === parseInt(seatId));
  },
  
  getBookedSeatsForShow: (showId) => {
    // Get all bookings for this show that are active (not cancelled)
    const activeBookings = mockData.bookings.filter(
      b => b.show_id === parseInt(showId) && b.status === 'booked'
    );
    const bookingIds = activeBookings.map(b => b.booking_id);
    
    // Get all seat IDs from booking_seats
    const bookedSeatIds = mockData.booking_seats
      .filter(bs => bookingIds.includes(bs.booking_id))
      .map(bs => bs.seat_id);
    
    return bookedSeatIds;
  },
  
  isSeatAvailable: (showId, seatId) => {
    const bookedSeats = seatService.getBookedSeatsForShow(showId);
    return !bookedSeats.includes(parseInt(seatId));
  },
  
  getSeatLayout: (screenId, showId) => {
    const seats = seatService.getSeatsByScreen(screenId);
    const bookedSeatIds = seatService.getBookedSeatsForShow(showId);
    
    return seats.map(seat => ({
      ...seat,
      is_available: !bookedSeatIds.includes(seat.seat_id),
      display_name: `${seat.row_label}${seat.seat_number}`
    }));
  }
};

// BOOKING SERVICE - Booking transactions
export const bookingService = {
  createBooking: (bookingData) => {
    const user = authService.getCurrentUser();
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }
    
    // Validate show exists
    const show = mockData.shows.find(s => s.show_id === bookingData.show_id);
    if (!show) {
      return { success: false, message: 'Show not found' };
    }
    
    // Validate seats are available
    const bookedSeats = seatService.getBookedSeatsForShow(bookingData.show_id);
    const requestedSeats = bookingData.seat_ids;
    const unavailableSeats = requestedSeats.filter(seatId => bookedSeats.includes(seatId));
    
    if (unavailableSeats.length > 0) {
      return { success: false, message: 'Some seats are no longer available' };
    }
    
    // Create booking
    const newBooking = {
      booking_id: mockData.bookings.length + 1,
      user_id: user.user_id,
      show_id: bookingData.show_id,
      booking_time: new Date().toISOString(),
      total_amount: bookingData.total_amount,
      status: 'booked'
    };
    mockData.bookings.push(newBooking);
    
    // Create booking_seats entries
    requestedSeats.forEach(seatId => {
      const seat = mockData.seats.find(s => s.seat_id === seatId);
      const price = seat.seat_type === 'premium' ? show.base_price * 1.5 : show.base_price;
      
      mockData.booking_seats.push({
        booking_seat_id: mockData.booking_seats.length + 1,
        booking_id: newBooking.booking_id,
        seat_id: seatId,
        price: price,
        show_id: bookingData.show_id
      });
    });
    
    // Update show's available seats
    show.seats_available -= requestedSeats.length;
    
    // Create payment record
    const payment = {
      payment_id: mockData.payments.length + 1,
      booking_id: newBooking.booking_id,
      payment_time: new Date().toISOString(),
      amount: bookingData.total_amount,
      payment_method: bookingData.payment_method || 'card',
      payment_status: 'success',
      transaction_ref: 'TXN' + Date.now()
    };
    mockData.payments.push(payment);
    
    return { 
      success: true, 
      booking: newBooking,
      payment: payment,
      message: 'Booking confirmed successfully'
    };
  },
  
  cancelBooking: (bookingId) => {
    const booking = mockData.bookings.find(b => b.booking_id === parseInt(bookingId));
    if (!booking) {
      return { success: false, message: 'Booking not found' };
    }
    
    const user = authService.getCurrentUser();
    if (booking.user_id !== user?.user_id && user?.role !== 'admin') {
      return { success: false, message: 'Unauthorized' };
    }
    
    if (booking.status !== 'booked') {
      return { success: false, message: 'Booking already cancelled or refunded' };
    }
    
    // Update booking status
    booking.status = 'cancelled';
    
    // Restore seats to show
    const bookedSeats = mockData.booking_seats.filter(bs => bs.booking_id === parseInt(bookingId));
    const show = mockData.shows.find(s => s.show_id === booking.show_id);
    if (show) {
      show.seats_available += bookedSeats.length;
    }
    
    return { success: true, message: 'Booking cancelled successfully' };
  },
  
  getUserBookings: (userId) => {
    return mockData.bookings
      .filter(b => b.user_id === userId)
      .map(booking => {
        const show = showService.getShowById(booking.show_id);
        const seats = mockData.booking_seats
          .filter(bs => bs.booking_id === booking.booking_id)
          .map(bs => {
            const seat = seatService.getSeatById(bs.seat_id);
            return {
              ...bs,
              seat_info: seat,
              display_name: `${seat.row_label}${seat.seat_number}`
            };
          });
        const payment = mockData.payments.find(p => p.booking_id === booking.booking_id);
        
        return {
          ...booking,
          show,
          seats,
          payment
        };
      })
      .sort((a, b) => new Date(b.booking_time) - new Date(a.booking_time));
  },
  
  getBookingById: (bookingId) => {
    const booking = mockData.bookings.find(b => b.booking_id === parseInt(bookingId));
    if (!booking) return null;
    
    const show = showService.getShowById(booking.show_id);
    const seats = mockData.booking_seats
      .filter(bs => bs.booking_id === booking.booking_id)
      .map(bs => {
        const seat = seatService.getSeatById(bs.seat_id);
        return {
          ...bs,
          seat_info: seat,
          display_name: `${seat.row_label}${seat.seat_number}`
        };
      });
    const payment = mockData.payments.find(p => p.booking_id === booking.booking_id);
    
    return {
      ...booking,
      show,
      seats,
      payment
    };
  }
};

// REVIEW SERVICE - Movie reviews and ratings
export const reviewService = {
  addReview: (reviewData) => {
    const user = authService.getCurrentUser();
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }
    
    // Check if user already reviewed this movie (UNIQUE constraint)
    const existing = mockData.reviews.find(
      r => r.user_id === user.user_id && r.movie_id === reviewData.movie_id
    );
    if (existing) {
      return { success: false, message: 'You have already reviewed this movie' };
    }
    
    // Validate rating range (1-5)
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return { success: false, message: 'Rating must be between 1 and 5' };
    }
    
    const newReview = {
      review_id: mockData.reviews.length + 1,
      user_id: user.user_id,
      movie_id: reviewData.movie_id,
      rating: reviewData.rating,
      review_text: reviewData.review_text || null,
      review_time: new Date().toISOString()
    };
    mockData.reviews.push(newReview);
    return { success: true, review: newReview };
  },
  
  getMovieReviews: (movieId) => {
    return mockData.reviews
      .filter(r => r.movie_id === parseInt(movieId))
      .map(review => {
        const user = mockData.users.find(u => u.user_id === review.user_id);
        return {
          ...review,
          user_name: user?.name || 'Anonymous',
          user_username: user?.username
        };
      })
      .sort((a, b) => new Date(b.review_time) - new Date(a.review_time));
  },
  
  updateReview: (reviewId, updates) => {
    const review = mockData.reviews.find(r => r.review_id === parseInt(reviewId));
    if (!review) {
      return { success: false, message: 'Review not found' };
    }
    
    const user = authService.getCurrentUser();
    if (review.user_id !== user?.user_id) {
      return { success: false, message: 'Unauthorized' };
    }
    
    if (updates.rating && (updates.rating < 1 || updates.rating > 5)) {
      return { success: false, message: 'Rating must be between 1 and 5' };
    }
    
    if (updates.rating) review.rating = updates.rating;
    if (updates.review_text !== undefined) review.review_text = updates.review_text;
    
    return { success: true, review };
  },
  
  deleteReview: (reviewId) => {
    const index = mockData.reviews.findIndex(r => r.review_id === parseInt(reviewId));
    if (index === -1) {
      return { success: false, message: 'Review not found' };
    }
    
    const user = authService.getCurrentUser();
    if (mockData.reviews[index].user_id !== user?.user_id && user?.role !== 'admin') {
      return { success: false, message: 'Unauthorized' };
    }
    
    mockData.reviews.splice(index, 1);
    return { success: true, message: 'Review deleted' };
  }
};

// PAYMENT SERVICE - Payment records
export const paymentService = {
  getPaymentByBooking: (bookingId) => {
    return mockData.payments.find(p => p.booking_id === parseInt(bookingId));
  },
  
  getAllPayments: () => {
    return mockData.payments.map(payment => {
      const booking = mockData.bookings.find(b => b.booking_id === payment.booking_id);
      return { ...payment, booking };
    });
  }
};

// REPORTS SERVICE - Admin analytics and reports
export const reportService = {
  getDailyBookings: (date) => {
    return mockData.bookings.filter(b => 
      b.booking_time.startsWith(date)
    ).length;
  },
  
  getRevenueByMovie: (movieId) => {
    const movieBookings = mockData.bookings.filter(b => {
      const show = mockData.shows.find(s => s.show_id === b.show_id);
      return show?.movie_id === parseInt(movieId) && b.status === 'booked';
    });
    
    return movieBookings.reduce((sum, booking) => sum + booking.total_amount, 0);
  },
  
  getRevenueByTheatre: (theatreId) => {
    const theatreScreens = mockData.screens.filter(s => s.theatre_id === parseInt(theatreId));
    const screenIds = theatreScreens.map(s => s.screen_id);
    const theatreShows = mockData.shows.filter(s => screenIds.includes(s.screen_id));
    const showIds = theatreShows.map(s => s.show_id);
    
    const theatreBookings = mockData.bookings.filter(b => 
      showIds.includes(b.show_id) && b.status === 'booked'
    );
    
    return theatreBookings.reduce((sum, booking) => sum + booking.total_amount, 0);
  },
  
  getOccupancyRate: (showId) => {
    const show = mockData.shows.find(s => s.show_id === parseInt(showId));
    if (!show) return 0;
    
    const screen = mockData.screens.find(s => s.screen_id === show.screen_id);
    const bookedSeats = seatService.getBookedSeatsForShow(showId).length;
    
    return ((bookedSeats / screen.total_seats) * 100).toFixed(2);
  },
  
  getTopMovies: (limit = 10) => {
    const movieStats = mockData.movies.map(movie => {
      const revenue = reportService.getRevenueByMovie(movie.movie_id);
      const avgRating = movieService.getAverageRating(movie.movie_id);
      const reviewCount = mockData.reviews.filter(r => r.movie_id === movie.movie_id).length;
      
      return {
        ...movie,
        revenue,
        avgRating,
        reviewCount
      };
    });
    
    return movieStats
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  }
};
