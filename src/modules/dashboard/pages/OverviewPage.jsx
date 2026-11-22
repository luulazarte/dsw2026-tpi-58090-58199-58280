import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import PageHeader from '../../shared/components/PageHeader';
import TableCard from '../../shared/components/TableCard';
import TablePagination from '../../shared/components/TablePagination';
import {
  BriefcaseIcon,
  CalendarIcon,
  GridIcon,
  SearchIcon,
} from '../../shared/components/icons';
import usePaginatedSearch from '../../shared/hooks/usePaginatedSearch';
import { getDoctors } from '../../doctors/services/doctorsService';
import useDashboardStats from '../hooks/useDashboardStats';
import StatCard from '../components/StatCard';
import DoctorsSummaryTable from '../components/DoctorsSummaryTable';

const PAGE_SIZE = 5;

function OverviewPage() {
  const navigate = useNavigate();

  const stats = useDashboardStats();

  const {
    items: doctors,
    total,
    page,
    setPage,
    searchTerm,
    changeSearch,
    isLoading,
    error,
  } = usePaginatedSearch({ fetchPage: getDoctors, pageSize: PAGE_SIZE });

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Vista General de Gestión"
        subtitle="Configure el personal médico y las especialidades del departamento."
        actions={
          <>
            <Button
              onClick={() => navigate('/admin/doctors/new')}
              className="flex items-center gap-2"
            >
              <span>+</span>
              <span>Agregar Nuevo Doctor</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/admin/specialties/new')}
              className="flex items-center gap-2"
            >
              <span>+</span>
              <span>Agregar Nueva Especialidad</span>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          icon={<BriefcaseIcon className="w-6 h-6" />}
          label="Doctores Activos"
          value={stats.doctors}
          badgeLabel="Registrados"
          badgeVariant="success"
        />
        <StatCard
          icon={<GridIcon className="w-6 h-6" />}
          label="Especialidades Activas"
          value={stats.specialties}
          badgeLabel="Registradas"
          badgeVariant="neutral"
        />
        <StatCard
          icon={<CalendarIcon className="w-6 h-6" />}
          label="Turnos Confirmados Para Hoy"
          value={stats.todayAppointments}
          badgeLabel="Hoy"
        />
      </div>

      <TableCard
        title="Directorio de Profesionales Médicos"
        headerContent={
          <div className="w-full sm:w-72">
            <Input
              type="text"
              aria-label="Buscar médico"
              placeholder="Buscar por nombre (mín. 3 letras)..."
              value={searchTerm}
              onChange={(e) => changeSearch(e.target.value)}
              leftIcon={<SearchIcon />}
            />
          </div>
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
        <DoctorsSummaryTable
          doctors={doctors}
          isLoading={isLoading}
          error={error}
          onViewDetail={() => navigate('/admin/doctors')}
        />
      </TableCard>
    </div>
  );
}

export default OverviewPage;
