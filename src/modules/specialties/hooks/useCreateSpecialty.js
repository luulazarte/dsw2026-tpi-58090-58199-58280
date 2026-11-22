import { useState } from 'react';
import { createSpecialty } from '../services/specialtiesService';

export default function useCreateSpecialty() {
  const [error, setError] = useState('');

  const create = async (specialty) => {
    setError('');
    const { error: requestError } = await createSpecialty(specialty);

    if (requestError) {
      setError(requestError);

      return false;
    }

    return true;
  };

  return { create, error };
}
