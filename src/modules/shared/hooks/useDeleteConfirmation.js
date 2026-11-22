import { useState } from 'react';

// Lógica común de "eliminar con confirmación":
// guarda qué elemento se quiere borrar (eso abre el modal),
// y al confirmar llama a la función de borrado que se le pase.
export default function useDeleteConfirmation({ deleteItem, onDeleted }) {
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState('');

    const askDelete = (item) => setItemToDelete(item);

    const cancelDelete = () => setItemToDelete(null);

    const confirmDelete = async () => {
        setDeleteError('');
        const { error } = await deleteItem(itemToDelete.id);

        setItemToDelete(null);

        if (error) {
            setDeleteError(error);

            return;
        }

        onDeleted();
    };

    return { itemToDelete, deleteError, askDelete, cancelDelete, confirmDelete };
}