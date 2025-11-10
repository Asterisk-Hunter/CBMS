-- ========================================
-- CINEMA BOOKING MANAGEMENT SYSTEM
-- Database Schema Definition (MySQL/InnoDB)
-- ========================================

-- Drop existing tables (if any) in correct order
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS booking_seats;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS seats;
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS screens;
DROP TABLE IF EXISTS theatres;
DROP TABLE IF EXISTS users;

-- ========================================
-- 1. USERS TABLE
-- ========================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 2. THEATRES TABLE
-- ========================================
CREATE TABLE theatres (
    theatre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    city VARCHAR(100),
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_city (city)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 3. SCREENS TABLE
-- ========================================
CREATE TABLE screens (
    screen_id INT AUTO_INCREMENT PRIMARY KEY,
    theatre_id INT NOT NULL,
    name VARCHAR(50),
    total_seats INT NOT NULL,
    FOREIGN KEY (theatre_id) REFERENCES theatres(theatre_id) ON DELETE CASCADE,
    INDEX idx_theatre (theatre_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 4. MOVIES TABLE
-- ========================================
CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    language VARCHAR(50),
    duration_minutes INT,
    release_date DATE,
    genre VARCHAR(100),
    INDEX idx_genre (genre),
    INDEX idx_language (language),
    INDEX idx_release_date (release_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 5. SHOWS TABLE
-- ========================================
CREATE TABLE shows (
    show_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    screen_id INT NOT NULL,
    show_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    base_price DECIMAL(8,2) NOT NULL,
    seats_available INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (screen_id) REFERENCES screens(screen_id) ON DELETE CASCADE,
    INDEX idx_movie (movie_id),
    INDEX idx_screen (screen_id),
    INDEX idx_show_date (show_date),
    INDEX idx_movie_date (movie_id, show_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 6. SEATS TABLE
-- ========================================
CREATE TABLE seats (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    screen_id INT NOT NULL,
    row_label VARCHAR(5),
    seat_number INT,
    seat_type ENUM('regular', 'premium', 'vip') DEFAULT 'regular',
    FOREIGN KEY (screen_id) REFERENCES screens(screen_id) ON DELETE CASCADE,
    UNIQUE KEY unique_seat (screen_id, row_label, seat_number),
    INDEX idx_screen (screen_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 7. BOOKINGS TABLE
-- ========================================
CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    show_id INT NOT NULL,
    booking_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status ENUM('booked', 'cancelled', 'refunded') DEFAULT 'booked',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (show_id) REFERENCES shows(show_id),
    INDEX idx_user (user_id),
    INDEX idx_show (show_id),
    INDEX idx_status (status),
    INDEX idx_booking_time (booking_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 8. BOOKING_SEATS TABLE
-- ========================================
CREATE TABLE booking_seats (
    booking_seat_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    seat_id INT NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    show_id INT NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(seat_id),
    FOREIGN KEY (show_id) REFERENCES shows(show_id),
    UNIQUE KEY unique_booking_seat (booking_id, seat_id),
    INDEX idx_booking (booking_id),
    INDEX idx_show_seat (show_id, seat_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 9. PAYMENTS TABLE
-- ========================================
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    payment_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status ENUM('success', 'failed', 'pending') DEFAULT 'pending',
    transaction_ref VARCHAR(200),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    INDEX idx_booking (booking_id),
    INDEX idx_status (payment_status),
    INDEX idx_payment_time (payment_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 10. REVIEWS TABLE
-- ========================================
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    review_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    UNIQUE KEY unique_user_movie (user_id, movie_id),
    INDEX idx_movie (movie_id),
    INDEX idx_rating (rating),
    INDEX idx_review_time (review_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- SAMPLE DATA INSERTION
-- ========================================

-- Insert Users
INSERT INTO users (name, email, password_hash, phone, role) VALUES
('Admin User', 'admin@cinema.com', '$2b$10$hashed_password_here', '1234567890', 'admin'),
('John Doe', 'john@email.com', '$2b$10$hashed_password_here', '9876543210', 'customer'),
('Jane Smith', 'jane@email.com', '$2b$10$hashed_password_here', '5556667777', 'customer'),
('Bob Wilson', 'bob@email.com', '$2b$10$hashed_password_here', '4443332222', 'customer');

-- Insert Theatres
INSERT INTO theatres (name, city, address) VALUES
('Cinemark Palace 20 and XD', 'New York', '123 Broadway St, New York, NY 10001'),
('AMC Empire 25', 'New York', '234 Times Square, New York, NY 10036'),
('Regal Cinemas LA Live', 'Los Angeles', '1000 W Olympic Blvd, Los Angeles, CA 90015');

-- Insert Screens
INSERT INTO screens (theatre_id, name, total_seats) VALUES
(1, 'Screen 1', 120),
(1, 'Screen 2', 100),
(1, 'Screen 3', 80),
(2, 'Screen 1', 150),
(2, 'Screen 2', 120),
(3, 'Screen 1', 140),
(3, 'Screen 2', 110);

-- Insert Movies
INSERT INTO movies (title, language, duration_minutes, release_date, genre) VALUES
('Inception', 'English', 148, '2010-07-16', 'Sci-Fi, Action'),
('The Dark Knight', 'English', 152, '2008-07-18', 'Action, Crime'),
('Interstellar', 'English', 169, '2014-11-07', 'Sci-Fi, Drama'),
('Parasite', 'Korean', 132, '2019-05-30', 'Thriller, Drama'),
('Dune', 'English', 155, '2021-10-22', 'Sci-Fi, Adventure'),
('Joker', 'English', 122, '2019-10-04', 'Crime, Drama'),
('Avengers: Endgame', 'English', 181, '2019-04-26', 'Action, Adventure'),
('Spider-Man: No Way Home', 'English', 148, '2021-12-17', 'Action, Adventure');

-- Insert Shows (upcoming shows for next 7 days)
INSERT INTO shows (movie_id, screen_id, show_date, start_time, end_time, base_price, seats_available) VALUES
-- Inception
(1, 1, '2025-11-12', '15:00:00', '17:28:00', 16.00, 120),
(1, 1, '2025-11-12', '18:15:00', '20:43:00', 18.00, 120),
(1, 4, '2025-11-13', '14:00:00', '16:28:00', 20.00, 150),
-- The Dark Knight
(2, 2, '2025-11-12', '16:00:00', '18:32:00', 16.00, 100),
(2, 5, '2025-11-13', '19:00:00', '21:32:00', 18.00, 120),
-- Interstellar
(3, 3, '2025-11-12', '17:00:00', '19:49:00', 16.00, 80),
(3, 6, '2025-11-13', '15:30:00', '18:19:00', 20.00, 140),
-- Parasite
(4, 5, '2025-11-12', '20:00:00', '22:12:00', 18.00, 120),
(4, 7, '2025-11-13', '18:00:00', '20:12:00', 18.00, 110),
-- Dune
(5, 4, '2025-11-12', '19:00:00', '21:35:00', 20.00, 150),
(5, 6, '2025-11-14', '16:00:00', '18:35:00', 20.00, 140),
-- Joker
(6, 2, '2025-11-13', '21:00:00', '23:02:00', 16.00, 100),
-- Avengers: Endgame
(7, 1, '2025-11-14', '18:00:00', '21:01:00', 22.00, 120),
-- Spider-Man
(8, 3, '2025-11-14', '19:30:00', '21:58:00', 20.00, 80);

-- Insert Seats (Sample for Screen 1 - 120 seats, 10 rows x 12 seats)
-- This is a sample; you would generate all seats programmatically
INSERT INTO seats (screen_id, row_label, seat_number, seat_type) VALUES
-- Row A (Regular)
(1, 'A', 1, 'regular'), (1, 'A', 2, 'regular'), (1, 'A', 3, 'regular'), (1, 'A', 4, 'regular'),
(1, 'A', 5, 'regular'), (1, 'A', 6, 'regular'), (1, 'A', 7, 'regular'), (1, 'A', 8, 'regular'),
(1, 'A', 9, 'regular'), (1, 'A', 10, 'regular'), (1, 'A', 11, 'regular'), (1, 'A', 12, 'regular'),
-- Row B (Regular)
(1, 'B', 1, 'regular'), (1, 'B', 2, 'regular'), (1, 'B', 3, 'regular'), (1, 'B', 4, 'regular'),
(1, 'B', 5, 'regular'), (1, 'B', 6, 'regular'), (1, 'B', 7, 'regular'), (1, 'B', 8, 'regular'),
(1, 'B', 9, 'regular'), (1, 'B', 10, 'regular'), (1, 'B', 11, 'regular'), (1, 'B', 12, 'regular');
-- Continue for all rows C-J, and for all screens...

-- Insert Sample Reviews
INSERT INTO reviews (user_id, movie_id, rating, review_text) VALUES
(2, 1, 5, 'Mind-blowing! Christopher Nolan at his best. The dream sequences are incredible.'),
(3, 1, 4, 'Great movie but a bit confusing at times. Needed a second watch to fully understand.'),
(2, 2, 5, 'The best Batman movie ever made. Heath Ledger is phenomenal as the Joker!'),
(4, 4, 5, 'Absolutely brilliant! A masterpiece of modern cinema. The social commentary is powerful.'),
(3, 5, 4, 'Visually stunning! Denis Villeneuve created an epic sci-fi masterpiece.');

-- ========================================
-- NORMALIZATION NOTES
-- ========================================
-- 1NF: All tables have atomic values and unique primary keys
-- 2NF: Non-key attributes fully dependent on PKs
-- 3NF: No transitive dependencies
--      - shows.seats_available is denormalized for performance
--      - Can be recalculated from booking_seats joins

-- ========================================
-- CONSTRAINTS & RELATIONSHIPS
-- ========================================
-- Foreign Keys:
--   screens.theatre_id -> theatres.theatre_id
--   shows.movie_id -> movies.movie_id
--   shows.screen_id -> screens.screen_id
--   seats.screen_id -> screens.screen_id
--   bookings.user_id -> users.user_id
--   bookings.show_id -> shows.show_id
--   booking_seats.booking_id -> bookings.booking_id
--   booking_seats.seat_id -> seats.seat_id
--   booking_seats.show_id -> shows.show_id
--   payments.booking_id -> bookings.booking_id
--   reviews.user_id -> users.user_id
--   reviews.movie_id -> movies.movie_id

-- Unique Constraints:
--   users.email (prevent duplicate accounts)
--   seats(screen_id, row_label, seat_number) (no duplicate seats)
--   booking_seats(booking_id, seat_id) (one seat per booking)
--   reviews(user_id, movie_id) (one review per user per movie)

-- Check Constraints:
--   reviews.rating BETWEEN 1 AND 5

-- ========================================
-- END OF SCHEMA DEFINITION
-- ========================================
