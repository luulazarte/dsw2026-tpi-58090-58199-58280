import { useState } from 'react';
import usePaginatedSearch from '../../shared/hooks/usePaginatedSearch';
import { deleteDoctor, getDoctors } from '../services/doctorsService';

export default function useDoctorsList({ pageSize }) {
  const list = usePaginatedSearch({ fetchPage: getDoctors, pageSize });
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  const askDelete = (doctor) => setDoctorToDelete(doctor);

  const cancelDelete = () => setDoctorToDelete(null);

  const confirmDelete = async () => {
    setDeleteError('');
    const { error } = await deleteDoctor(doctorToDelete.id);

    setDoctorToDelete(null);

    if (error) {
      setDeleteError(error);

      return;
    }

    list.refreshAfterDelete();
  };

  return {
    ...list,
    doctorToDelete,
    deleteError,
    askDelete,
    cancelDelete,
    confirmDelete,
  };
}
