import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService, authService } from '../services/database';
import Sidebar from './Sidebar';

function MyTickets() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      const userBookings = bookingService.getUserBookings(user.user_id);
      setBookings(userBookings);
    }
  }, []);

  const filterBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter(booking => {
      const showDate = new Date(booking.show?.show_date);
      
      if (filter === 'upcoming') {
        return showDate >= today && booking.status === 'booked';
      } else if (filter === 'past') {
        return showDate < today || booking.status !== 'booked';
      }
      return true;
    });
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const result = bookingService.cancelBooking(bookingId);
      if (result.success) {
        const user = authService.getCurrentUser();
        const updated = bookingService.getUserBookings(user.user_id);
        setBookings(updated);
        alert('Booking cancelled successfully!');
      } else {
        alert(result.message);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      booked: 'bg-green-500/20 text-green-400 border-green-500/50',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/50',
      refunded: 'bg-blue-500/20 text-blue-400 border-blue-500/50'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const filteredBookings = filterBookings();

  return (
    <div className="flex min-h-screen w-full bg-background-dark">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">My Tickets</h1>
              <p className="text-gray-400 mt-1">View and manage your booking history</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-card-dark text-gray-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'upcoming'
                    ? 'bg-primary text-white'
                    : 'bg-card-dark text-gray-400 hover:text-white'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'past'
                    ? 'bg-primary text-white'
                    : 'bg-card-dark text-gray-400 hover:text-white'
                }`}
              >
                Past
              </button>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-card-dark border border-border-dark rounded-xl p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">
                confirmation_number
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">No tickets found</h3>
              <p className="text-gray-400 mb-6">
                {filter === 'all'
                  ? "You haven't booked any tickets yet"
                  : filter === 'upcoming'
                  ? 'No upcoming bookings'
                  : 'No past bookings'}
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-light to-primary-dark text-white rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined">movie</span>
                Browse Movies
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const showDate = new Date(booking.show?.show_date);
                const isPast = showDate < new Date();
                
                return (
                  <div
                    key={booking.booking_id}
                    className="bg-card-dark border border-border-dark rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                  >
                    <div className="flex gap-6 p-6">
                      <div className="flex-shrink-0 w-32 h-48 rounded-lg overflow-hidden">
                        <img
                          src={booking.show?.movie.poster_url}
                          alt={booking.show?.movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {booking.show?.movie.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {booking.show?.movie.genre} • {booking.show?.movie.language} • {booking.show?.movie.duration_minutes} mins
                            </p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Theatre</p>
                            <p className="text-white font-medium break-words">{booking.show?.theatre.name}</p>
                            <p className="text-gray-400 text-sm">{booking.show?.screen.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Date & Time</p>
                            <p className="text-white font-medium">
                              {new Date(booking.show?.show_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-gray-400 text-sm">{booking.show?.start_time}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Seats</p>
                            <p className="text-white font-medium break-words">
                              {booking.seats?.map(s => s.display_name).join(', ')}
                            </p>
                            <p className="text-gray-400 text-sm">{booking.seats?.length} ticket(s)</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Total Amount</p>
                            <p className="text-primary text-xl font-bold">${booking.total_amount?.toFixed(2)}</p>
                            <p className="text-gray-400 text-sm capitalize">{booking.payment?.payment_method}</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-border-dark">
                          <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm">
                            <span className="material-symbols-outlined text-base">receipt</span>
                            <span>Booking ID: #{booking.booking_id}</span>
                            <span className="hidden sm:inline mx-2">•</span>
                            <span>Booked on {new Date(booking.booking_time).toLocaleDateString()}</span>
                            {booking.payment?.transaction_ref && (
                              <>
                                <span className="hidden sm:inline mx-2">•</span>
                                <span className="text-xs">TXN: {booking.payment.transaction_ref}</span>
                              </>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {booking.status === 'booked' && !isPast && (
                              <button
                                onClick={() => handleCancelBooking(booking.booking_id)}
                                className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all"
                              >
                                Cancel Booking
                              </button>
                            )}
                            <Link
                              to={`/movie/${booking.show?.movie.movie_id}`}
                              className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg text-sm font-medium hover:bg-primary/30 transition-all"
                            >
                              View Movie
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyTickets;
