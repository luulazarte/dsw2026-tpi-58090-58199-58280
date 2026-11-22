import { useState } from 'react';
import useAuth from '../../auth/hook/useAuth';
import { createAppointment } from '../../appointments/services/appointmentsService';

export default function useBookAppointment() {
  const { user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  const book = async ({ doctorId, slotId, reason }) => {
    setError('');
    setIsBooking(true);
    const { data, error: requestError } = await createAppointment({
      doctorId,
      availabilitySlotId: slotId,
      patient: { dni: Number(user.dni) },
      reason: reason.trim(),
    });

    setIsBooking(false);

    if (requestError) {
      setError(requestError);

      return false;
    }

    setConfirmedAppointment(data);

    return true;
  };

  const clearConfirmation = () => setConfirmedAppointment(null);

  return { book, isBooking, error, confirmedAppointment, clearConfirmation };
}
