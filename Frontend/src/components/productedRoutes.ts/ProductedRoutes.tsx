import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '../../interfaces/auth';
import { isAdminLoggedIn, isLoggedIn } from '../../helpers/isLoggedIn';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = isLoggedIn()
  return token ? children : <Navigate to="/" replace />;
};

export const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = isAdminLoggedIn();
  return token ? children : <Navigate to="/admin/login" replace />;
};
