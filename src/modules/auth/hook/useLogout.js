import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export default function useLogout(redirectTo) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return () => {
    signOut();
    navigate(redirectTo);
  };
}
