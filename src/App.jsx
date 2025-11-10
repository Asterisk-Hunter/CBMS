import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import SeatSelection from './components/SeatSelection';
import MyTickets from './components/MyTickets';
import Login from './components/Login';
import Register from './components/Register';
import { authService } from './services/database';

function ProtectedRoute({ children }) {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/movie/:id" 
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/booking/:showId" 
          element={
            <ProtectedRoute>
              <SeatSelection />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-tickets" 
          element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


