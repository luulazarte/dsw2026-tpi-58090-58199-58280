import usePaginatedSearch from '../../shared/hooks/usePaginatedSearch';
import useDeleteConfirmation from '../../shared/hooks/useDeleteConfirmation';
import { deleteDoctor, getDoctors } from '../services/doctorsService';

export default function useDoctorsList({ pageSize }) {
  const list = usePaginatedSearch({ fetchPage: getDoctors, pageSize });
  const deletion = useDeleteConfirmation({
    deleteItem: deleteDoctor,
    onDeleted: list.refreshAfterDelete,
  });

  return {
    ...list,
    doctorToDelete: deletion.itemToDelete,
    deleteError: deletion.deleteError,
    askDelete: deletion.askDelete,
    cancelDelete: deletion.cancelDelete,
    confirmDelete: deletion.confirmDelete,
  };
}
