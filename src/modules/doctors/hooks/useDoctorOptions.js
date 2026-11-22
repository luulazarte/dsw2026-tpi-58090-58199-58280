import { useEffect, useState } from 'react';
import { getDoctors } from '../services/doctorsService';

export default function useDoctorOptions() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDoctors = async () => {
      const { data, error: requestError } = await getDoctors({ pageSize: 100 });

      if (requestError) {
        setError(requestError);
      } else {
        setDoctors(data.data);
      }
    };

    loadDoctors();
  }, []);

  return { doctors, error };
}
