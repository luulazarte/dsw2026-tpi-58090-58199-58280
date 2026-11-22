import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useLogin({ signIn, redirectTo }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (user, secret) => {
    setErrorMessage('');
    const { error } = await signIn(user, secret);

    if (error) {
      setErrorMessage(error);

      return;
    }

    navigate(redirectTo);
  };

  return { login, errorMessage };
}
