import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Koristi za rute koje zahtijevaju prijavu (admin panel)
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
