import { Navigate } from 'react-router-dom';
import { ProtectedAndPublicRouteProps } from '../interfaces/auth';
import { isAdminLoggedIn, isLoggedIn } from '../helpers/isLoggedIn';

export const PublicRoute: React.FC<ProtectedAndPublicRouteProps> = ({ children }) => {
  const token = isLoggedIn()
  return token ? <Navigate to="/" replace /> : children;
};

export const AdminPublicRoute: React.FC<ProtectedAndPublicRouteProps> = ({ children }) => {
  const token = isAdminLoggedIn();
  return token ? <Navigate to="/admin/dashboard" replace /> : children;
};
