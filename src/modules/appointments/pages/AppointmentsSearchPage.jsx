import PageHeader from '../../shared/components/PageHeader';
import TableCard from '../../shared/components/TableCard';
import TablePagination from '../../shared/components/TablePagination';
import useAppointmentSearch from '../hooks/useAppointmentSearch';
import AppointmentFilters from '../components/AppointmentFilters';
import AppointmentsTable from '../components/AppointmentsTable';

const PAGE_SIZE = 5;

function AppointmentsSearchPage() {
  const {
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
  } = useAppointmentSearch({ pageSize: PAGE_SIZE });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Búsqueda y Filtrado de Citas"
        subtitle="Gestione y supervise el flujo de pacientes del departamento."
      />

      <AppointmentFilters
        filters={filters}
        dniError={dniError}
        specialties={specialties}
        doctorOptions={doctorOptions}
        activeChips={activeChips}
        onChange={changeFilter}
        onApply={applyFilters}
        onClear={clearFilters}
      />

      <TableCard
        title="Registros de Citas"
        footer={
          <TablePagination
            currentPage={page}
            totalItems={total}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        }
      >
        <AppointmentsTable
          appointments={appointments}
          isLoading={isLoading}
          error={error}
        />
      </TableCard>
    </div>
  );
}

export default AppointmentsSearchPage;
