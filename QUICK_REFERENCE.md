# 🎬 Cinema Booking System - Quick Reference Guide

## 🚀 Getting Started

```powershell
# Start the development server
npm run dev

# Open in browser
# Navigate to: http://localhost:5173
```

---

## 👤 Test Accounts

| User | Email | Password | Notes |
|------|-------|----------|-------|
| John Doe | john@email.com | any | Has 2 sample bookings |
| Jane Smith | jane@email.com | any | Customer account |
| Bob Wilson | bob@email.com | any | Customer account |

*(Password validation is disabled for demo - any password works)*

---

## 🎬 Available Movies (8 Total)

1. **Inception** (2010)
   - Genre: Sci-Fi, Action
   - Duration: 148 mins
   - Director: Christopher Nolan

2. **The Dark Knight** (2008)
   - Genre: Action, Crime
   - Duration: 152 mins
   - Director: Christopher Nolan

3. **Interstellar** (2014)
   - Genre: Sci-Fi, Drama
   - Duration: 169 mins
   - Director: Christopher Nolan

4. **Parasite** (2019)
   - Genre: Thriller, Drama
   - Duration: 132 mins
   - Director: Bong Joon-ho

5. **Dune** (2021)
   - Genre: Sci-Fi, Adventure
   - Duration: 155 mins
   - Director: Denis Villeneuve

6. **Joker** (2019)
   - Genre: Crime, Drama
   - Duration: 122 mins
   - Director: Todd Phillips

7. **Avengers: Endgame** (2019)
   - Genre: Action, Adventure
   - Duration: 181 mins
   - Director: Anthony & Joe Russo

8. **Spider-Man: No Way Home** (2021)
   - Genre: Action, Adventure
   - Duration: 148 mins
   - Director: Jon Watts

---

## 🎫 Sample Bookings (Login as john@email.com to see)

### Booking #1: Inception
- **Theatre**: Cinemark Palace 20 and XD
- **Screen**: Screen 1
- **Date**: November 12, 2025
- **Time**: 3:00 PM
- **Seats**: E5, E6, E7 (3 tickets)
- **Amount**: $50.50
- **Payment**: Card
- **Status**: ✅ Booked

### Booking #2: Dune
- **Theatre**: AMC Empire 25
- **Screen**: Screen 1
- **Date**: November 13, 2025
- **Time**: 2:00 PM
- **Seats**: 2 tickets
- **Amount**: $42.50
- **Payment**: UPI
- **Status**: ✅ Booked

---

## 🎨 Theme Colors

| Element | Color | Hex |
|---------|-------|-----|
| Background | Dark Navy | `#0a0e14` |
| Cards | Slate | `#1a1f2e` |
| Borders | Gray | `#2d3748` |
| Primary (Light) | Purple Blue | `#667eea` |
| Primary (Dark) | Deep Purple | `#764ba2` |
| Text | White | `#ffffff` |
| Text Secondary | Gray | `#9ca3af` |
| Success | Green | `#10b981` |
| Error | Red | `#ef4444` |

---

## 🗺️ Navigation Map

```
/ (Home)
├── /movie/:id (Movie Details)
│   ├── Overview Tab
│   ├── Showtimes Tab
│   │   └── /booking/:showId (Seat Selection)
│   └── Reviews Tab
│
├── /my-tickets (My Tickets)
│   ├── All Bookings
│   ├── Upcoming Bookings
│   └── Past Bookings
│
├── /login (Login Page)
└── /register (Register Page)
```

---

## 🎯 User Flows

### Flow 1: Book a Movie
1. **Login** → Enter email (john@email.com) → Click "Login"
2. **Browse** → See 8 movies on home page
3. **Select Movie** → Click on any movie card
4. **View Showtimes** → Click "Showtimes" tab
5. **Book** → Click "Book Now" on desired showtime
6. **Select Seats** → Click seats on grid (blue = selected)
7. **Payment** → Choose payment method
8. **Confirm** → Click "Confirm Booking"
9. **Success** → See booking confirmation alert

### Flow 2: View Your Tickets
1. **Login** → john@email.com
2. **Sidebar** → Click "My Tickets"
3. **Filter** → All / Upcoming / Past
4. **View Details** → See all booking information
5. **Actions** → Cancel booking or View Movie

### Flow 3: Leave a Review
1. **Movie Details** → Navigate to any movie
2. **Reviews Tab** → Click "Reviews"
3. **Rate** → Select 1-5 stars
4. **Write** → Add review text
5. **Submit** → Click "Submit Review"
6. **See Review** → Your review appears instantly

---

## 🗄️ Database Schema (cinema_booking.sql)

### Tables Overview

```sql
users          -- User accounts (admin/customer)
  ↓
bookings       -- User's ticket bookings
  ↓
booking_seats  -- Individual seats in bookings
  ↓
seats          -- Physical seat layout
  ↓
screens        -- Theatre screens
  ↓
theatres       -- Theatre locations

movies         -- Movie information
  ↓
shows          -- Movie showtimes
  ↓
reviews        -- User movie reviews
  ↓
payments       -- Payment transactions
```

### Key Relationships

```
users (1) → (N) bookings
bookings (1) → (N) booking_seats
booking_seats (N) → (1) seats
seats (N) → (1) screens
screens (N) → (1) theatres
shows (N) → (1) movies
shows (N) → (1) screens
bookings (1) → (1) payments
reviews (N) → (1) users
reviews (N) → (1) movies
```

---

## 📊 Features Checklist

### ✅ Authentication
- [x] User login
- [x] User registration
- [x] Session management (localStorage)
- [x] Protected routes
- [x] Logout functionality

### ✅ Movies
- [x] Browse all movies (8 available)
- [x] View movie details
- [x] Movie posters and information
- [x] Genre, duration, cast, director
- [x] Star ratings (calculated from reviews)
- [x] Review count

### ✅ Showtimes
- [x] View showtimes by movie
- [x] Multiple theatres
- [x] Multiple screens per theatre
- [x] Date and time display
- [x] Seat availability count
- [x] Dynamic pricing (base + premium)

### ✅ Booking
- [x] Interactive seat selection (10x12 grid)
- [x] Seat availability checking
- [x] Premium seat pricing (+50%)
- [x] Booking summary
- [x] Payment method selection
- [x] Total calculation
- [x] Booking confirmation
- [x] Transaction reference

### ✅ My Tickets
- [x] View all bookings
- [x] Filter (All/Upcoming/Past)
- [x] Booking details display
- [x] Status badges (Booked/Cancelled)
- [x] Cancel booking
- [x] Payment information
- [x] Link to movie details

### ✅ Reviews
- [x] Submit movie reviews
- [x] Star rating (1-5)
- [x] Review text
- [x] One review per user per movie
- [x] Display all reviews
- [x] Show reviewer name
- [x] Timestamp

### ✅ UI/UX
- [x] Dark theme (no white backgrounds)
- [x] Smooth transitions
- [x] Hover effects
- [x] Responsive layout
- [x] Material icons
- [x] Gradient buttons
- [x] Status badges
- [x] Loading states

---

## 🔧 Technical Stack

| Technology | Purpose |
|------------|---------|
| React 19.1.1 | UI Framework |
| React Router 6.30.1 | Navigation |
| Vite 7.1.7 | Build tool |
| Tailwind CSS 3.4.18 | Styling |
| Material Symbols | Icons |
| JavaScript (ES6+) | Programming |
| LocalStorage | Session management |

---

## 📦 Mock Data Summary

### Users: 2
- john_doe (customer) - has bookings
- jane_smith (customer)

### Theatres: 3
- Cinemark Palace 20 and XD (New York)
- AMC Empire 25 (New York)
- Regal Cinemas LA Live (Los Angeles)

### Screens: 5
- Screen 1-2 (Cinemark)
- Screen 1-2 (AMC)
- Screen 1 (Regal)

### Movies: 8
- All with full details, posters, cast info

### Shows: 5+
- Multiple showtimes for different movies
- Nov 12-13, 2025

### Seats: 540+
- Auto-generated for all screens
- 10 rows (A-J) × 12 seats per row
- Mix of regular and premium seats

### Bookings: 2
- John Doe has 2 active bookings

### Reviews: 1
- Sample review on Parasite

---

## 🚨 Important Notes

### Mock Data vs Production
- **Current**: All data stored in `database.js` (in-memory)
- **Production**: Use `cinema_booking.sql` with real MySQL database

### localStorage
- Stores current user session
- Persists across page refreshes
- Clear to logout: `localStorage.clear()`

### Password Security
- Currently **disabled** for demo
- Production: Implement bcrypt hashing
- Use password field value for real validation

### Seat Availability
- Automatically prevents double-booking
- Updates `seats_available` count
- Booking_seats table tracks occupied seats

---

## 🎓 Learning Points

### Database Design
- 3NF normalization
- Foreign key relationships
- Unique constraints
- Check constraints
- Indexes for performance

### React Patterns
- Component composition
- Protected routes
- State management
- Props drilling
- useEffect for data fetching
- useParams for dynamic routing

### UI/UX Design
- Consistent color scheme
- Visual hierarchy
- Status indicators
- Responsive grids
- Hover feedback
- Loading states

---

## 🏆 Project Achievements

✅ Complete DBMS implementation (10 tables)
✅ Full booking transaction flow
✅ Beautiful dark theme UI
✅ Production-ready SQL schema
✅ Mock data for testing
✅ Dynamic routing
✅ Authentication system
✅ Review system
✅ My Tickets page
✅ No compilation errors
✅ Fully functional

---

## 📞 Support

**Common Issues:**

**Q: White background appears?**
A: Clear browser cache and refresh

**Q: Login not working?**
A: Use any email from test accounts with any password

**Q: No bookings showing?**
A: Login as john@email.com (only user with bookings)

**Q: Can't select seats?**
A: Gray seats are occupied, click available seats only

**Q: Want to use real database?**
A: Import `cinema_booking.sql` into MySQL and create backend API

---

**🎉 You're all set! Enjoy your Cinema Booking System!**
