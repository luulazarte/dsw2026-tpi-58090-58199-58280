import { useEffect, useState } from 'react';
import useAuth from '../../auth/hook/useAuth';
import {
  cancelAppointment,
  getPatientAppointments,
} from '../../appointments/services/appointmentsService';

export default function usePatientAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      const { data, error: requestError } = await getPatientAppointments(
        user.dni
      );

      if (requestError) {
        setError(requestError);
      } else {
        setAppointments(
          [...data].sort((a, b) =>
            `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)
          )
        );
      }

      setIsLoading(false);
    };

    loadAppointments();
  }, [user.dni]);

  const askCancel = (appointment) => setAppointmentToCancel(appointment);

  const closeCancel = () => setAppointmentToCancel(null);

  const confirmCancel = async () => {
    const id = appointmentToCancel.id;

    setError('');
    setAppointmentToCancel(null);
    const { error: requestError } = await cancelAppointment(id);

    if (requestError) {
      setError(requestError);

      return;
    }

    setAppointments((current) => current.filter((item) => item.id !== id));
  };

  return {
    appointments,
    isLoading,
    error,
    appointmentToCancel,
    askCancel,
    closeCancel,
    confirmCancel,
  };
}
