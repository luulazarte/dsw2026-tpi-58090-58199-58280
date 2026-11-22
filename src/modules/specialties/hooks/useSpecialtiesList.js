import usePaginatedSearch from '../../shared/hooks/usePaginatedSearch';
import useDeleteConfirmation from '../../shared/hooks/useDeleteConfirmation';
import {
    deleteSpecialty,
    getSpecialties,
} from '../services/specialtiesService';

export default function useSpecialtiesList({ pageSize }) {
    const list = usePaginatedSearch({ fetchPage: getSpecialties, pageSize });
    const deletion = useDeleteConfirmation({
        deleteItem: deleteSpecialty,
        onDeleted: list.refreshAfterDelete,
    });

    return {
        ...list,
        specialtyToDelete: deletion.itemToDelete,
        deleteError: deletion.deleteError,
        askDelete: deletion.askDelete,
        cancelDelete: deletion.cancelDelete,
        confirmDelete: deletion.confirmDelete,
    };
}