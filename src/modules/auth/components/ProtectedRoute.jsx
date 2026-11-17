import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';

function ProtectedRoute({ children, role, redirectTo = '/login' }) {
  const auth = useAuth();

  if (!auth.isAuthenticated || (role && auth.role !== role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;
