import { useState } from 'react';
import { createDoctor } from '../services/doctorsService';

export default function useCreateDoctor() {
  const [error, setError] = useState('');

  const create = async (doctor) => {
    setError('');
    const { error: requestError } = await createDoctor(doctor);

    if (requestError) {
      setError(requestError);

      return false;
    }

    return true;
  };

  return { create, error };
}
