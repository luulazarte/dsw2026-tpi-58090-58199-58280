import { useState } from 'react';
import useAuth from '../../auth/hook/useAuth';
import useBookingCatalog from './useBookingCatalog';
import useAvailableSlots from './useAvailableSlots';
import useWeekNavigator from './useWeekNavigator';
import useBookAppointment from './useBookAppointment';

export default function useBooking() {
  const { user } = useAuth();
  const catalog = useBookingCatalog();
  const availability = useAvailableSlots();
  const week = useWeekNavigator();
  const booking = useBookAppointment();

  const [specialtyId, setSpecialtyId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState('');

  const [formError, setFormError] = useState('');
  const [reasonError, setReasonError] = useState('');

  const selectSpecialty = (value) => {
    setSpecialtyId(value);
    setDoctorId('');
    setSelectedSlot(null);
    availability.reset();
  };

  const selectDoctor = (value) => {
    setDoctorId(value);
    setSelectedSlot(null);
    availability.reset();
  };

  const searchSlots = async () => {
    setFormError('');

    if (!doctorId) {
      setFormError('Seleccioná una especialidad y un doctor.');

      return;
    }

    setSelectedSlot(null);
    week.resetWeek();
    await availability.search(doctorId);
  };

  const confirmBooking = async () => {
    setFormError('');
    setReasonError('');

    if (!selectedSlot) {
      setFormError('Elegí un horario disponible.');

      return;
    }

    if (reason.trim().length < 5) {
      setReasonError('El motivo debe tener al menos 5 caracteres.');

      return;
    }

    const booked = await booking.book({
      doctorId,
      slotId: selectedSlot.id,
      reason,
    });

    if (!booked) {
      setSelectedSlot(null);
      await availability.search(doctorId);

      return;
    }

    availability.removeSlot(selectedSlot.id);
    setSelectedSlot(null);
    setReason('');
  };

  return {
    specialties: catalog.specialties,
    doctorsOfSpecialty: catalog.getDoctorsBySpecialty(specialtyId),
    currentDoctor: catalog.getDoctorById(doctorId),
    specialtyId,
    doctorId,
    selectSpecialty,
    selectDoctor,
    searchSlots,
    isLoadingSlots: availability.isLoading,
    errorMessage:
      formError || catalog.error || availability.error || booking.error,

    hasSearched: availability.hasSearched,
    getSlotsOfDay: availability.getSlotsOfDay,
    week,
    selectedSlot,
    selectSlot: setSelectedSlot,

    reason,
    setReason,
    reasonError,
    confirmBooking,
    isBooking: booking.isBooking,

    confirmedAppointment: booking.confirmedAppointment,
    clearConfirmation: booking.clearConfirmation,
    patientDni: user?.dni,
  };
}
