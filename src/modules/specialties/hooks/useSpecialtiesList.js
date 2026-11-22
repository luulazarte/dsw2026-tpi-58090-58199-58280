import { useState } from 'react';
import usePaginatedSearch from '../../shared/hooks/usePaginatedSearch';
import {
  deleteSpecialty,
  getSpecialties,
} from '../services/specialtiesService';

export default function useSpecialtiesList({ pageSize }) {
  const list = usePaginatedSearch({ fetchPage: getSpecialties, pageSize });
  const [specialtyToDelete, setSpecialtyToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  const askDelete = (specialty) => setSpecialtyToDelete(specialty);

  const cancelDelete = () => setSpecialtyToDelete(null);

  const confirmDelete = async () => {
    setDeleteError('');
    const { error } = await deleteSpecialty(specialtyToDelete.id);

    setSpecialtyToDelete(null);

    if (error) {
      setDeleteError(error);

      return;
    }

    list.refreshAfterDelete();
  };

  return {
    ...list,
    specialtyToDelete,
    deleteError,
    askDelete,
    cancelDelete,
    confirmDelete,
  };
}
