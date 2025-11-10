# Cinema Booking Management System (CBMS)

A complete **Movie Ticket Booking and Review System** implementing all DBMS concepts with a modern React frontend.

---

## 🎯 Project Overview

This project is a comprehensive database management system for movie theatre operations, implementing:
- **10 Database Tables** with proper relationships
- **Complete Booking Transaction Flow** (seat selection → payment → confirmation)
- **User Authentication & Authorization**
- **Review & Rating System**
- **Admin Reporting Features**
- **Real-time Seat Availability**

---

## 📊 Database Schema

### Tables Implemented

1. **USERS** - User accounts (customers & admins)
2. **THEATRES** - Movie theatre locations
3. **SCREENS** - Theatre screens/halls
4. **MOVIES** - Movie information
5. **SHOWS** - Showtimes with pricing
6. **SEATS** - Seat layouts per screen
7. **BOOKINGS** - Ticket reservations
8. **BOOKING_SEATS** - Junction table (bookings ↔ seats)
9. **PAYMENTS** - Payment transactions
10. **REVIEWS** - Movie ratings & reviews

See [ER_DIAGRAM.md](./ER_DIAGRAM.md) for complete entity-relationship diagram.

---

## ✨ Features

### User Features
- ✅ User Registration & Login
- ✅ Browse Movies with Ratings
- ✅ View Showtimes by Theatre/City
- ✅ Interactive Seat Selection
- ✅ Real-time Seat Availability
- ✅ Premium Seat Pricing (1.5× base price)
- ✅ Booking Confirmation with Payment
- ✅ Submit Movie Reviews (1-5 stars)
- ✅ View Booking History

### Admin Features
- ✅ Revenue Reports by Movie/Theatre
- ✅ Occupancy Rate Analysis
- ✅ Daily Booking Statistics
- ✅ Top Movies by Revenue

### Technical Features
- ✅ **ACID Transactions** (simulated) for booking flow
- ✅ **Foreign Key Constraints** across all tables
- ✅ **UNIQUE Constraints** (email, seats, reviews)
- ✅ **CHECK Constraints** (rating 1-5)
- ✅ **Data Integrity Validation**
- ✅ **Session Management** (localStorage)
- ✅ **JOIN Operations** (shows + theatres + screens + movies)
- ✅ **Aggregate Functions** (AVG, SUM, COUNT)

---

## 🏗️ Architecture

### Frontend
- **React 19.1.1** - Component-based UI
- **Vite 7.2.2** - Fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS 3.4.0** - Utility-first styling
- **Material Icons** - Icon library

### Database Layer
- **Mock In-Memory Store** - JavaScript object (production: MySQL/PostgreSQL)
- **Service Layer Pattern** - Separation of concerns
- **Transaction Simulation** - Atomic booking operations

### File Structure
```
CBMS/
├── src/
│   ├── services/
│   │   └── database.js           # Complete DBMS implementation
│   ├── components/
│   │   ├── Login.jsx             # User authentication
│   │   ├── Register.jsx          # User registration
│   │   ├── Home.jsx              # Movie browsing
│   │   ├── MovieDetails.jsx      # Movie info + reviews + showtimes
│   │   ├── SeatSelection.jsx     # Seat booking interface
│   │   └── Sidebar.jsx           # Navigation
│   ├── App.jsx                   # Routing setup
│   └── main.jsx                  # Entry point
├── DBMS_PROJECT_DOCUMENTATION.md # Full technical docs
├── ER_DIAGRAM.md                 # Entity-relationship diagram
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# 1. Navigate to project directory
cd CBMS

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:5173
```

### Demo Login
Use these credentials to test:
- **Email:** `john@email.com`
- **Password:** (any value - mock authentication)

Or create a new account via the Register page.

---

## 📖 Usage Guide

### 1. Browse Movies
- View movie listings on the home page
- See ratings from user reviews
- Click on any movie card to view details

### 2. Select a Show
- On Movie Details page, switch to "Showtimes" tab
- View available shows with theatre information
- Click "Book Now" for your preferred show

### 3. Choose Seats
- Interactive seat map with color coding:
  - **Gray** = Available
  - **Amber** = Premium seats
  - **Blue** = Your selection
  - **Dark Gray** = Occupied
- Select multiple seats
- View live price calculation

### 4. Complete Booking
- Review booking summary
- Choose payment method (Card/UPI/Wallet)
- Click "Confirm Booking"
- Receive booking confirmation

### 5. Write Reviews
- After viewing a movie, go to Movie Details
- Switch to "Reviews" tab
- Submit your rating (1-5 stars) and review text
- **Note:** One review per user per movie (UNIQUE constraint)

---

## 🗄️ Database Operations

### Sample Queries Implemented

#### 1. Get Movies with Ratings
```javascript
const movies = movieService.getAllMovies();
// Returns: movies with calculated avg rating from reviews table
```

#### 2. Shows by City
```javascript
const shows = showService.getShowsByCity('New York');
// JOIN: shows → screens → theatres (WHERE city = 'New York')
```

#### 3. Seat Availability
```javascript
const layout = seatService.getSeatLayout(screenId, showId);
// Returns: seats with is_available flag
// Logic: LEFT JOIN with booking_seats WHERE status='booked'
```

#### 4. Create Booking (Transactional)
```javascript
const result = bookingService.createBooking({
  show_id: 1,
  seat_ids: [45, 46],
  total_amount: 34.50,
  payment_method: 'card'
});
```

**Transaction Steps:**
1. Validate user authentication
2. Verify show exists
3. Check seat availability (prevent double-booking)
4. Create booking record
5. Insert booking_seats entries
6. Create payment record
7. Update show.seats_available
8. Return confirmation

#### 5. Revenue Report
```javascript
const revenue = reportService.getRevenueByMovie(movieId);
// SUM(bookings.total_amount) WHERE status='booked'
// JOIN: bookings → shows → movies
```

---

## 🔐 Constraints & Validation

### Enforced Constraints

1. **PRIMARY KEYS**
   - All tables have AUTO_INCREMENT PKs

2. **FOREIGN KEYS**
   - Cascading deletes where appropriate
   - Referential integrity maintained

3. **UNIQUE CONSTRAINTS**
   - `users.email` - No duplicate emails
   - `seats(screen_id, row_label, seat_number)` - No duplicate seats
   - `reviews(user_id, movie_id)` - One review per user per movie

4. **CHECK CONSTRAINTS**
   - `reviews.rating` - Must be between 1 and 5

5. **BUSINESS RULES**
   - Cannot book occupied seats
   - Cannot double-book same seat for same show
   - Seat prices: Premium = 1.5× base price
   - Booking status: 'booked', 'cancelled', 'refunded'

---

## 📊 Normalization

### First Normal Form (1NF) ✅
- All attributes are atomic (single values)
- No repeating groups
- Each table has a primary key

### Second Normal Form (2NF) ✅
- All 1NF requirements met
- No partial dependencies
- All non-key attributes fully depend on primary key

### Third Normal Form (3NF) ✅
- All 2NF requirements met
- No transitive dependencies
- **Exception:** `shows.seats_available` denormalized for performance

---

## 🧪 Test Scenarios

### Test Case 1: User Registration
1. Navigate to `/register`
2. Fill form with valid data
3. Submit
**Expected:** Account created, auto-login, redirect to home

### Test Case 2: Seat Booking
1. Select a movie → Choose show → Click "Book Now"
2. Select 3 seats (mix of regular and premium)
3. Confirm booking
**Expected:**
- Booking record created
- booking_seats entries inserted
- Payment record created
- seats_available decremented
- Confirmation message shown

### Test Case 3: Double-Booking Prevention
1. User A books seat F7 for Show 1
2. User B tries to book seat F7 for Show 1
**Expected:** Seat shown as occupied, cannot be selected

### Test Case 4: Review Constraint
1. User submits review for Movie 1
2. User tries to submit another review for Movie 1
**Expected:** Second submission rejected (UNIQUE constraint)

### Test Case 5: Cancellation
1. User cancels a booking
**Expected:**
- Booking status → 'cancelled'
- seats_available incremented
- Seats become available again

---

## 📚 Documentation

- **[DBMS_PROJECT_DOCUMENTATION.md](./DBMS_PROJECT_DOCUMENTATION.md)** - Complete technical documentation
  - All tables with schema
  - Service layer methods
  - Sample queries
  - Transaction flows
  - Report functions

- **[ER_DIAGRAM.md](./ER_DIAGRAM.md)** - Entity-relationship diagram
  - Mermaid diagram code
  - Cardinality explanations
  - Constraint details
  - Data flow examples

---

## 🛠️ Technologies

| Category | Technology |
|----------|-----------|
| Frontend | React 19.1.1, Vite 7.2.2 |
| Routing | react-router-dom 7.1.3 |
| Styling | Tailwind CSS 3.4.0, PostCSS |
| Icons | Material Symbols Outlined |
| Fonts | Be Vietnam Pro (Google Fonts) |
| State | React Hooks (useState, useEffect) |
| Database | Mock JS (production: MySQL/PostgreSQL) |
| Session | localStorage |

---

## 🎨 Design System

### Color Palette
- **Primary Blue:** `#135bec` (buttons, links, accents)
- **Dark Background:** `#101622`
- **Card Dark:** `#1a212e`
- **Border Dark:** `#2d3748`
- **Text Colors:** White, gray-300, gray-400

### Typography
- **Font:** Be Vietnam Pro (400/500/700/900)
- **Base Size:** 16px
- **Headings:** Bold, tracking-tight

---

## 🚧 Limitations & Future Work

### Current Limitations
1. **In-Memory Database** - Data resets on page refresh
2. **Mock Authentication** - No real password hashing
3. **No Backend API** - All logic runs client-side
4. **Simulated Transactions** - No real ACID compliance
5. **No Email Verification**

### Future Enhancements
1. **Backend Integration**
   - MySQL/PostgreSQL database
   - Express.js REST API
   - Real ACID transactions
   - bcrypt password hashing

2. **Payment Processing**
   - Stripe/Razorpay integration
   - Multiple payment methods
   - Refund handling

3. **Admin Dashboard**
   - Manage theatres, screens, shows
   - Add/edit movies
   - View analytics
   - User management

4. **Enhanced Features**
   - Booking history page
   - Email notifications
   - QR code tickets
   - Seat hold timer (5 min)
   - Movie recommendations
   - Social sharing
   - Booking cancellation policy

5. **Performance**
   - Redis caching for seat availability
   - Database indexing optimization
   - CDN for movie posters
   - Load balancing

---

## 📄 License

This project is created for educational purposes as a DBMS project demonstration.

---

## 👥 Author

Created as part of DBMS coursework - Movie Ticket Booking and Review System

---

## 🙏 Acknowledgments

- **React Team** - Amazing frontend framework
- **Tailwind CSS** - Beautiful utility-first styling
- **Material Design** - Icon system
- **Vite** - Lightning-fast build tool

---

## 📞 Support

For questions or issues:
1. Check [DBMS_PROJECT_DOCUMENTATION.md](./DBMS_PROJECT_DOCUMENTATION.md) for detailed technical info
2. Review [ER_DIAGRAM.md](./ER_DIAGRAM.md) for database schema
3. Examine code comments in `src/services/database.js`

---

**Project Status:** ✅ **COMPLETE**

All DBMS requirements have been implemented with a fully functional UI connected to a comprehensive database service layer.

**Last Updated:** November 9, 2025

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
