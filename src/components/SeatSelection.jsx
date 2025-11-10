import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { showService, seatService, bookingService, authService } from '../services/database';
import Sidebar from './Sidebar';

function SeatSelection() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    const showData = showService.getShowById(showId);
    if (!showData) {
      navigate('/');
      return;
    }
    setShow(showData);

    const seatLayout = seatService.getSeatLayout(showData.screen.screen_id, showId);
    setSeats(seatLayout);
  }, [showId, navigate]);

  const handleSeatClick = (seat) => {
    if (!seat.is_available) return;

    setSelectedSeats(prev =>
      prev.find(s => s.seat_id === seat.seat_id)
        ? prev.filter(s => s.seat_id !== seat.seat_id)
        : [...prev, seat]
    );
  };

  const getSeatClass = (seat) => {
    if (!seat.is_available) return 'size-6 rounded bg-gray-500 cursor-not-allowed';
    if (selectedSeats.find(s => s.seat_id === seat.seat_id)) return 'size-6 rounded bg-gradient-to-r from-primary-light to-primary-dark cursor-pointer shadow-lg shadow-primary/30';
    return seat.seat_type === 'premium' ? 'size-6 rounded bg-amber-700/30 hover:bg-amber-700/50 cursor-pointer border border-amber-500/50' : 'size-6 rounded bg-gray-700/50 hover:bg-gray-700 cursor-pointer';
  };

  const calculateTotal = () => {
    if (!show) return 0;
    let subtotal = 0;
    selectedSeats.forEach(seat => {
      subtotal += seat.seat_type === 'premium' ? show.base_price * 1.5 : show.base_price;
    });
    return subtotal;
  };

  const handleBooking = () => {
    const user = authService.getCurrentUser();
    if (!user) {
      alert('Please login to book tickets');
      navigate('/login');
      return;
    }

    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    const result = bookingService.createBooking({
      show_id: parseInt(showId),
      seat_ids: selectedSeats.map(s => s.seat_id),
      total_amount: calculateTotal() + 2.5,
      payment_method: paymentMethod
    });

    if (result.success) {
      alert(`Booking confirmed!\n\nBooking ID: ${result.booking.booking_id}\nSeats: ${selectedSeats.map(s => s.display_name).join(', ')}\nTotal: $${(calculateTotal() + 2.5).toFixed(2)}`);
      navigate('/');
    } else {
      alert(result.message);
    }
  };

  if (!show) {
    return (
      <div className="relative flex min-h-screen w-full bg-background-dark text-white">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <p className="text-xl">Loading...</p>
        </main>
      </div>
    );
  }

  const groupedSeats = {};
  seats.forEach(seat => {
    if (!groupedSeats[seat.row_label]) {
      groupedSeats[seat.row_label] = [];
    }
    groupedSeats[seat.row_label].push(seat);
  });

  const rows = Object.keys(groupedSeats).sort().reverse();

  return (
    <div className="flex min-h-screen w-full bg-background-dark">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <Link to="/" className="text-gray-400 hover:text-primary">Home</Link>
            <span className="material-symbols-outlined text-gray-500 text-base">chevron_right</span>
            <Link to={`/movie/${show.movie.movie_id}`} className="text-gray-400 hover:text-primary">{show.movie.title}</Link>
            <span className="material-symbols-outlined text-gray-500 text-base">chevron_right</span>
            <span className="text-white font-medium">Select Seats</span>
          </div>

          <div className="bg-card-dark border border-border-dark p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-2">{show.movie.title}</h2>
            <p className="text-gray-400 mb-1">{show.theatre.name}</p>
            <p className="text-gray-300 text-sm">{show.screen.name} • {new Date(show.show_date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} • {show.start_time}</p>
          </div>

          <div className="flex flex-col items-center gap-8 bg-card-dark border border-border-dark p-6 rounded-xl shadow-lg">
            <div className="w-full flex flex-col items-center gap-2">
              <div className="h-1.5 w-full max-w-md rounded-t-full bg-gradient-to-b from-primary/40 to-transparent"></div>
              <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Screen</p>
            </div>

            <div className="flex flex-col gap-3 w-full justify-center items-center">
              {rows.map(row => (
                <div key={row} className="flex items-center gap-4">
                  <div className="w-6 text-center text-sm font-medium text-gray-400">{row}</div>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {groupedSeats[row].sort((a, b) => a.seat_number - b.seat_number).map((seat, index) => {
                      if (index === 2 || index === 9) {
                        return <div key={`spacer-${index}`} className="w-6" />;
                      }
                      return (
                        <div
                          key={seat.seat_id}
                          className={getSeatClass(seat)}
                          onClick={() => handleSeatClick(seat)}
                          title={`${seat.display_name} (${seat.seat_type})`}
                        />
                      );
                    })}
                  </div>
                  <div className="w-6 text-center text-sm font-medium text-gray-400">{row}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-x-6 gap-y-2 pt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-sm bg-gray-700/50"></div>
                <span className="text-xs text-gray-400">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-sm bg-amber-700/30 border border-amber-500/50"></div>
                <span className="text-xs text-gray-400">Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-sm bg-gradient-to-r from-primary-light to-primary-dark"></div>
                <span className="text-xs text-gray-400">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-sm bg-gray-500"></div>
                <span className="text-xs text-gray-400">Occupied</span>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 w-full space-y-6">
          <div className="bg-card-dark border border-border-dark p-6 rounded-xl shadow-lg sticky top-8">
            <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Movie</span>
                <span className="font-medium text-gray-100 text-right text-sm">{show.movie.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Theatre</span>
                <span className="font-medium text-gray-100 text-sm">{show.theatre.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Date & Time</span>
                <span className="font-medium text-gray-100 text-sm">{new Date(show.show_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {show.start_time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Tickets</span>
                <span className="font-medium text-gray-100">{selectedSeats.length} Ticket(s)</span>
              </div>
              {selectedSeats.length > 0 && (
                <div className="flex justify-between items-start">
                  <span className="text-gray-400">Seats</span>
                  <div className="text-right">
                    {selectedSeats.map(seat => (
                      <div key={seat.seat_id} className="font-medium text-primary text-sm">
                        {seat.display_name} {seat.seat_type === 'premium' && '(Premium)'}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="my-6 border-t border-dashed border-border-dark"></div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-100">${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Booking Fee</span>
                <span className="font-medium text-gray-100">$2.50</span>
              </div>
            </div>
            <div className="my-6 border-t border-dashed border-border-dark"></div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-primary">${(calculateTotal() + 2.5).toFixed(2)}</span>
            </div>

            <div className="mt-6">
              <label className="text-white text-sm font-medium mb-2 block">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-background-dark border border-border-dark rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>

            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
              className={`mt-6 w-full h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-light to-primary-dark text-white text-base font-semibold transition-all duration-200 shadow-lg shadow-primary/30 ${selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              <span className="material-symbols-outlined mr-2">confirmation_number</span>
              Confirm Booking
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SeatSelection;
