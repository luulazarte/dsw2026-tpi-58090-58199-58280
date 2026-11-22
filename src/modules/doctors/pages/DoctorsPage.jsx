import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import PageHeader from '../../shared/components/PageHeader';
import TableCard from '../../shared/components/TableCard';
import TablePagination from '../../shared/components/TablePagination';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import { ClockIcon, SearchIcon } from '../../shared/components/icons';
import useDoctorsList from '../hooks/useDoctorsList';
import DoctorsTable from '../components/DoctorsTable';

const PAGE_SIZE = 5;

function DoctorsPage() {
  const navigate = useNavigate();
  const {
    items: doctors,
    total,
    page,
    setPage,
    searchTerm,
    changeSearch,
    isLoading,
    error,
    doctorToDelete,
    deleteError,
    askDelete,
    cancelDelete,
    confirmDelete,
  } = useDoctorsList({ pageSize: PAGE_SIZE });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Directorio de Doctores"
        subtitle="Gestione el personal médico y supervise su disponibilidad actual."
        actions={
          <>
            <div className="min-w-[240px] flex-1 sm:flex-initial">
              <Input
                type="text"
                aria-label="Buscar doctor"
                placeholder="Buscar doctor por nombre..."
                value={searchTerm}
                onChange={(e) => changeSearch(e.target.value)}
                leftIcon={<SearchIcon />}
              />
            </div>
            <Button
              onClick={() => navigate('/admin/doctors/availability')}
              className="flex items-center gap-2"
            >
              <ClockIcon />
              <span>Agregar Disponibilidad Horaria</span>
            </Button>
            <Button
              onClick={() => navigate('/admin/doctors/new')}
              className="flex items-center gap-1.5 bg-med-primary-700"
            >
              <span>+</span>
              <span>Nuevo Doctor</span>
            </Button>
          </>
        }
      />

      <TableCard
        title="Registros de Doctores"
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
        <DoctorsTable
          doctors={doctors}
          isLoading={isLoading}
          error={error}
          onDelete={askDelete}
        />
      </TableCard>

      <ConfirmDialog
        isOpen={Boolean(doctorToDelete)}
        title="Eliminar médico"
        message={`¿Eliminar al médico "${doctorToDelete?.name}"?`}
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default DoctorsPage;
