import { useState } from 'react';
import { getDoctorAvailabilities } from '../../doctors/services/doctorsService';
import { isFutureSlot, toDateKey } from '../../shared/helpers/calendar';

export default function useAvailableSlots() {
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const search = async (doctorId) => {
    setError('');
    setIsLoading(true);
    const { data, error: requestError } =
      await getDoctorAvailabilities(doctorId);

    setIsLoading(false);

    if (requestError) {
      setError(requestError);

      return;
    }

    setSlots(
      data.filter((slot) => slot.status === 'AVAILABLE' && isFutureSlot(slot))
    );
    setHasSearched(true);
  };

  const reset = () => {
    setSlots([]);
    setHasSearched(false);
    setError('');
  };

  const removeSlot = (slotId) =>
    setSlots((current) => current.filter((slot) => slot.id !== slotId));

  const getSlotsOfDay = (date) =>
    slots
      .filter((slot) => slot.slotDate.slice(0, 10) === toDateKey(date))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return {
    getSlotsOfDay,
    isLoading,
    hasSearched,
    error,
    search,
    reset,
    removeSlot,
  };
}
