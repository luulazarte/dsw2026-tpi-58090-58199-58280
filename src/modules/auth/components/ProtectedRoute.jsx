import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { ROLE_HOME } from '../constants/roles';

function ProtectedRoute({
  children,
  allowedRoles = [],
  redirectTo = '/login',
}) {
  const { isAuthenticated, hasRole, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return <Navigate to={ROLE_HOME[role] ?? redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;
