# 🎬 Cinema Booking Management System - Quick Start

## ✅ System Status: FULLY FUNCTIONAL

All buttons, navigation paths, and features have been verified and are working correctly!

---

## 🚀 How to Run the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: `http://localhost:5173`

---

## 🎯 Testing the Application

### **First-Time User Flow**

1. **Register a New Account**
   - Open `http://localhost:5173` → Auto-redirect to `/login`
   - Click "Sign up here" → Navigate to `/register`
   - Fill in:
     - Username: `john_doe`
     - Email: `john@example.com`
     - Phone: `123-456-7890`
     - Password: `password123`
   - Click "Create Account" → Logged in → Navigate to Home

2. **Browse Movies**
   - Home page displays all available movies
   - Hover over any movie card to see "View Details" button
   - Click on a movie card → Navigate to Movie Details

3. **View Movie Details**
   - **Overview Tab**: See movie description, genre, duration, rating
   - **Showtimes Tab**: View all available shows
   - **Reviews Tab**: Read existing reviews and submit your own

4. **Book Tickets**
   - In "Showtimes" tab, click "Book Now" on any show
   - **Seat Selection Page**:
     - View screen and seat layout (10 rows × 12 seats)
     - Color coding:
       - Gray = Available
       - Amber = Premium (+50% price)
       - Blue = Your Selected Seats
       - Dark Gray = Already Booked
     - Click seats to select/deselect
     - See live booking summary on right sidebar
     - Choose payment method (Card/UPI/Wallet)
     - Click "Confirm Booking"
   - ✅ Booking confirmed! Alert shows booking details

5. **Submit a Review**
   - Go to any movie details page
   - Click "Reviews" tab
   - Rate the movie (1-5 stars)
   - Write your review
   - Click "Submit Review"
   - ✅ Review added to the list!

6. **Logout**
   - Click "Logout" button in sidebar
   - Redirected to login page

---

## 🧪 Pre-Loaded Test Data

The system comes with mock data for testing:

### **Test User Accounts**
| Username | Email | Password |
|----------|-------|----------|
| `john_doe` | john@email.com | password123 |
| `jane_smith` | jane@email.com | password123 |
| `bob_wilson` | bob@email.com | password123 |

### **Available Movies**
1. **Inception** - Sci-Fi, Thriller - 4.8⭐
2. **The Dark Knight** - Action, Crime - 4.9⭐
3. **Interstellar** - Sci-Fi, Drama - 4.7⭐
4. **The Shawshank Redemption** - Drama - 4.9⭐
5. **Pulp Fiction** - Crime, Drama - 4.8⭐

### **Theatres**
- **Cineplex Downtown** - 3 screens
- **Movieplex Central** - 2 screens

Each movie has multiple showtimes across different theatres!

---

## ✅ Verified Features

### **Authentication** ✓
- ✅ User registration with validation
- ✅ User login with credential verification
- ✅ Session persistence
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Logout functionality

### **Movie Browsing** ✓
- ✅ Display all movies with posters
- ✅ Movie details with tabs (Overview/Showtimes/Reviews)
- ✅ Dynamic star ratings
- ✅ Genre and duration display

### **Booking System** ✓
- ✅ View showtimes by movie and theatre
- ✅ Interactive seat selection (10×12 grid)
- ✅ Real-time seat availability
- ✅ Premium seat pricing (1.5× base price)
- ✅ Booking summary with live total calculation
- ✅ Payment method selection
- ✅ Booking confirmation with unique booking ID
- ✅ Seat booking prevents double-booking

### **Reviews** ✓
- ✅ Submit reviews with star ratings
- ✅ View all reviews for a movie
- ✅ Display reviewer username and timestamp
- ✅ One review per user per movie (UNIQUE constraint)

### **Navigation** ✓
- ✅ All buttons functional
- ✅ All routes working correctly
- ✅ Breadcrumb navigation
- ✅ Sidebar navigation
- ✅ Dynamic routing (`/movie/:id`, `/booking/:showId`)

---

## 🗄️ Database Schema

The system uses 10 interconnected tables:

1. **users** - User accounts
2. **theatres** - Theatre locations
3. **screens** - Theatre screens
4. **movies** - Movie information
5. **shows** - Movie showtimes
6. **seats** - Seat layouts
7. **bookings** - Booking records
8. **booking_seats** - Seat-booking mapping
9. **payments** - Payment transactions
10. **reviews** - Movie reviews

Full schema details in `DBMS_PROJECT_DOCUMENTATION.md`

---

## 📁 Project Structure

```
CBMS/
├── src/
│   ├── components/
│   │   ├── Home.jsx              ✅ Movie browsing
│   │   ├── MovieCard.jsx         ✅ Movie display card
│   │   ├── MovieDetails.jsx      ✅ Movie info + showtimes + reviews
│   │   ├── SeatSelection.jsx     ✅ Seat booking interface
│   │   ├── Login.jsx             ✅ Authentication
│   │   ├── Register.jsx          ✅ User registration
│   │   └── Sidebar.jsx           ✅ Navigation sidebar
│   ├── services/
│   │   └── database.js           ✅ Complete DBMS implementation
│   ├── App.jsx                   ✅ Route configuration
│   └── main.jsx                  ✅ App entry point
├── DBMS_PROJECT_DOCUMENTATION.md ✅ Full technical docs
├── ER_DIAGRAM.md                 ✅ Database design
├── NAVIGATION_TEST_GUIDE.md      ✅ All paths verified
└── QUICK_START.md                ✅ This file
```

---

## 🎨 UI Features

- **Dark Theme** with gradient accents
- **Tailwind CSS** styling
- **Material Symbols** icons
- **Responsive** layout
- **Smooth transitions** and hover effects
- **Interactive seat grid** with color coding
- **Real-time booking summary**

---

## 🔥 Ready to Use!

The Cinema Booking Management System is **100% functional** and ready for testing. All features have been implemented and verified:

- ✅ Complete database schema
- ✅ All service layers
- ✅ Full authentication system
- ✅ Movie browsing and details
- ✅ Interactive seat selection
- ✅ Booking creation and validation
- ✅ Review system
- ✅ All navigation working

**Just run `npm run dev` and start booking tickets!** 🎟️

---

## 📚 Additional Documentation

- **Full DBMS Documentation**: `DBMS_PROJECT_DOCUMENTATION.md`
- **ER Diagram**: `ER_DIAGRAM.md`
- **Navigation Test Guide**: `NAVIGATION_TEST_GUIDE.md`
- **Main README**: `README.md`
