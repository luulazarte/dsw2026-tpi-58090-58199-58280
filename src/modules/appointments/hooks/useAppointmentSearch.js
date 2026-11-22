import { useEffect, useState } from 'react';
import { searchAppointments } from '../services/appointmentsService';
import useDoctorOptions from '../../doctors/hooks/useDoctorOptions';
import useSpecialtyOptions from '../../specialties/hooks/useSpecialtyOptions';
import { formatShortDate } from '../../shared/helpers/calendar';

export const EMPTY_FILTERS = {
  dni: '',
  specialtyId: '',
  doctorId: '',
  date: '',
};

export default function useAppointmentSearch({ pageSize }) {
  const { specialties } = useSpecialtyOptions();
  const { doctors } = useDoctorOptions();

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);
  const [dniError, setDniError] = useState('');

  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      setError('');
      const { data, error: requestError } = await searchAppointments({
        ...appliedFilters,
        pageSize,
        pageIndex: page,
      });

      if (requestError) {
        setError(requestError);
      } else {
        setAppointments(data.data);
        setTotal(data.total);
      }

      setIsLoading(false);
    };

    loadAppointments();
  }, [page, appliedFilters, pageSize]);

  const changeFilter = (field, value) => {
    const newFilters = { ...filters, [field]: value };

    if (field === 'specialtyId') {
      newFilters.doctorId = '';
    }

    setFilters(newFilters);
  };

  const applyFilters = () => {
    if (filters.dni && !/^\d{7,10}$/.test(filters.dni)) {
      setDniError('El DNI debe tener entre 7 y 10 dígitos');

      return;
    }

    setDniError('');
    setPage(1);
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    setDniError('');
    setFilters(EMPTY_FILTERS);
    setPage(1);
    setAppliedFilters(EMPTY_FILTERS);
  };

  const doctorOptions = doctors.filter(
    (doc) =>
      !filters.specialtyId ||
      doc.speciality?.specialityId === filters.specialtyId
  );

  const activeChips = [
    appliedFilters.dni && `DNI: ${appliedFilters.dni}`,
    appliedFilters.specialtyId &&
      `Especialidad: ${specialties.find((s) => s.id === appliedFilters.specialtyId)?.name ?? ''}`,
    appliedFilters.doctorId &&
      `Doctor: ${doctors.find((d) => d.id === appliedFilters.doctorId)?.name ?? ''}`,
    appliedFilters.date && `Fecha: ${formatShortDate(appliedFilters.date)}`,
  ].filter(Boolean);

  return {
    specialties,
    doctorOptions,
    activeChips,
    filters,
    dniError,
    changeFilter,
    applyFilters,
    clearFilters,
    appointments,
    page,
    setPage,
    total,
    isLoading,
    error,
  };
}
