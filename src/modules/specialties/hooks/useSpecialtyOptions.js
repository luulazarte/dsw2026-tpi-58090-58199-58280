import { useEffect, useState } from 'react';
import { getSpecialties } from '../services/specialtiesService';

export default function useSpecialtyOptions() {
  const [specialties, setSpecialties] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSpecialties = async () => {
      const { data, error: requestError } = await getSpecialties({
        pageSize: 100,
      });

      if (requestError) {
        setError(requestError);
      } else {
        setSpecialties(data.data);
      }
    };

    loadSpecialties();
  }, []);

  return { specialties, error };
}
