import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import PageHeader from '../../shared/components/PageHeader';
import TableCard from '../../shared/components/TableCard';
import TablePagination from '../../shared/components/TablePagination';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import { SearchIcon } from '../../shared/components/icons';
import useSpecialtiesList from '../hooks/useSpecialtiesList';
import SpecialtiesTable from '../components/SpecialtiesTable';

const PAGE_SIZE = 5;

function SpecialtiesPage() {
  const navigate = useNavigate();
  const {
    items: specialties,
    total,
    page,
    setPage,
    searchTerm,
    changeSearch,
    isLoading,
    error,
    specialtyToDelete,
    deleteError,
    askDelete,
    cancelDelete,
    confirmDelete,
  } = useSpecialtiesList({ pageSize: PAGE_SIZE });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Directorio de Especialidades"
        subtitle="Administre las categorías médicas, servicios y disponibilidad del personal especializado."
        actions={
          <>
            <div className="min-w-[240px] flex-1 sm:flex-initial">
              <Input
                type="text"
                aria-label="Buscar especialidad"
                placeholder="Buscar especialidad..."
                value={searchTerm}
                onChange={(e) => changeSearch(e.target.value)}
                leftIcon={<SearchIcon />}
              />
            </div>
            <Button
              onClick={() => navigate('/admin/specialties/new')}
              className="flex items-center gap-1.5"
            >
              <span>+</span>
              <span>Nueva Especialidad</span>
            </Button>
          </>
        }
      />

      <TableCard
        title="Registros de Especialidades"
        headerContent={
          deleteError && <p className="text-xs text-red-600">{deleteError}</p>
        }
        footer={
          <TablePagination
            currentPage={page}
            totalItems={total}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        }
      >
        <SpecialtiesTable
          specialties={specialties}
          isLoading={isLoading}
          error={error}
          onDelete={askDelete}
        />
      </TableCard>

      <ConfirmDialog
        isOpen={Boolean(specialtyToDelete)}
        title="Eliminar especialidad"
        message={`¿Eliminar la especialidad "${specialtyToDelete?.name}"?`}
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default SpecialtiesPage;
