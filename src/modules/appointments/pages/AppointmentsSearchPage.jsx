import { useEffect, useState } from 'react';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import TablePagination from '../../shared/components/TablePagination';
import { getSpecialties } from '../../specialties/services/specialtiesService';
import { getDoctors } from '../../doctors/services/doctorsService';
import { searchAppointments } from '../services/appointmentsService';

const PAGE_SIZE = 5;

const EMPTY_FILTERS = { dni: '', specialtyId: '', doctorId: '', date: '' };

// Cómo se muestra cada estado del turno (estados del enunciado)
const STATUS_STYLES = {
  BOOKED: {
    label: 'RESERVADO',
    className: 'bg-med-active-bg text-med-active-text',
  },
  CANCELLED: {
    label: 'CANCELADO',
    className: 'bg-med-danger-bg text-med-danger-text',
  },
  ATTENDED: { label: 'ATENDIDO', className: 'bg-slate-100 text-slate-700' },
  NO_SHOW: { label: 'AUSENTE', className: 'bg-slate-100 text-slate-700' },
};

const fieldClass =
  'w-full px-3 py-2 text-xs bg-white border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600';

// "2026-11-24T00:00:00" → "24 nov 2026"
const formatDate = (dateText) => {
  if (!dateText) {
    return '-';
  }

  const [year, month, day] = dateText.slice(0, 10).split('-').map(Number);

  return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

function AppointmentsSearchPage() {
  // Lo que se está escribiendo en los filtros
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  // Los filtros con los que se hizo la última búsqueda
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);
  const [dniError, setDniError] = useState('');

  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Al abrir: especialidades y médicos para los desplegables
  useEffect(() => {
    const loadOptions = async () => {
      const [specialtiesResult, doctorsResult] = await Promise.all([
        getSpecialties({ pageSize: 100 }),
        getDoctors({ pageSize: 100 }),
      ]);

      if (!specialtiesResult.error) {
        setSpecialties(specialtiesResult.data.data);
      }

      if (!doctorsResult.error) {
        setDoctors(doctorsResult.data.data);
      }
    };

    loadOptions();
  }, []);

  // Busca en el backend cada vez que cambian la página o los filtros aplicados
  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      setErrorMessage('');
      const { data, error } = await searchAppointments({
        ...appliedFilters,
        pageSize: PAGE_SIZE,
        pageIndex: page,
      });

      if (error) {
        setErrorMessage(error);
      } else {
        setAppointments(data.data);
        setTotal(data.total);
      }

      setIsLoading(false);
    };

    loadAppointments();
  }, [page, appliedFilters]);

  // Si hay especialidad elegida, el desplegable de doctores muestra solo los suyos
  const doctorOptions = doctors.filter(
    (doc) =>
      !filters.specialtyId ||
      doc.speciality?.specialityId === filters.specialtyId
  );

  const handleChange = (field) => (e) => {
    const newFilters = { ...filters, [field]: e.target.value };

    // Al cambiar de especialidad, el doctor elegido puede no corresponder
    if (field === 'specialtyId') {
      newFilters.doctorId = '';
    }

    setFilters(newFilters);
  };

  const handleApply = () => {
    // DNI opcional, pero si se escribe: solo números, 7 a 10 dígitos
    if (filters.dni && !/^\d{7,10}$/.test(filters.dni)) {
      setDniError('El DNI debe tener entre 7 y 10 dígitos');

      return;
    }

    setDniError('');
    setPage(1);
    setAppliedFilters(filters);
  };

  const handleClear = () => {
    setDniError('');
    setFilters(EMPTY_FILTERS);
    setPage(1);
    setAppliedFilters(EMPTY_FILTERS);
  };

  // Chips con los filtros que se están usando
  const activeChips = [
    appliedFilters.dni && `DNI: ${appliedFilters.dni}`,
    appliedFilters.specialtyId &&
      `Especialidad: ${specialties.find((s) => s.id === appliedFilters.specialtyId)?.name ?? ''}`,
    appliedFilters.doctorId &&
      `Doctor: ${doctors.find((d) => d.id === appliedFilters.doctorId)?.name ?? ''}`,
    appliedFilters.date && `Fecha: ${formatDate(appliedFilters.date)}`,
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      {/* Título de la página */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
          Búsqueda y Filtrado de Citas
        </h1>
        <p className="text-sm text-med-text-sub mt-1">
          Gestione y supervise el flujo de pacientes del departamento.
        </p>
      </div>

      {/* Card Superior: Criterios de Búsqueda */}
      <Card className="p-6">
        <div className="pb-4 border-b border-med-border-subtle">
          <h2 className="text-base font-bold text-med-primary-900">
            Criterios de Búsqueda
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-4 items-start">
          {/* DNI */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="dni"
              className="text-xs font-semibold text-med-text-sub"
            >
              DNI del Paciente
            </label>
            <input
              id="dni"
              type="text"
              inputMode="numeric"
              value={filters.dni}
              onChange={handleChange('dni')}
              placeholder="Ej. 40123456"
              className={`${fieldClass} ${dniError ? 'border-red-400' : 'border-med-border'}`}
            />
            {dniError && (
              <p className="text-xs text-red-500 font-medium">{dniError}</p>
            )}
          </div>

          {/* Especialidad */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="specialty"
              className="text-xs font-semibold text-med-text-sub"
            >
              Especialidad
            </label>
            <select
              id="specialty"
              value={filters.specialtyId}
              onChange={handleChange('specialtyId')}
              className={`${fieldClass} border-med-border`}
            >
              <option value="">Todas las Especialidades</option>
              {specialties.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="doctor"
              className="text-xs font-semibold text-med-text-sub"
            >
              Doctor
            </label>
            <select
              id="doctor"
              value={filters.doctorId}
              onChange={handleChange('doctorId')}
              className={`${fieldClass} border-med-border`}
            >
              <option value="">Todos los Doctores</option>
              {doctorOptions.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="date"
              className="text-xs font-semibold text-med-text-sub"
            >
              Fecha
            </label>
            <input
              id="date"
              type="date"
              value={filters.date}
              onChange={handleChange('date')}
              className={`${fieldClass} border-med-border`}
            />
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-2 lg:mt-5">
            <Button
              onClick={handleApply}
              className="w-full flex items-center justify-center gap-2 py-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>Aplicar Filtros</span>
            </Button>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-med-text-muted hover:text-med-primary-900 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Chips de filtros activos */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-med-border-subtle">
            {activeChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100/70 text-sky-800"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Card Inferior: Registros de Citas */}
      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de Citas
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border">
              <tr>
                <th className="px-6 py-3.5">Fecha</th>
                <th className="px-6 py-3.5">Departamento</th>
                <th className="px-6 py-3.5">Paciente</th>
                <th className="px-6 py-3.5 text-center">Estado</th>
                <th className="px-6 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-med-border-subtle">
              {isLoading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-med-text-muted"
                  >
                    Buscando turnos...
                  </td>
                </tr>
              )}

              {!isLoading && errorMessage && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-red-600"
                  >
                    {errorMessage}
                  </td>
                </tr>
              )}

              {!isLoading && !errorMessage && appointments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-med-text-muted"
                  >
                    No se encontraron turnos con esos filtros.
                  </td>
                </tr>
              )}

              {!isLoading &&
                appointments.map((item) => {
                  const status = STATUS_STYLES[item.appointmentsStatus] ?? {
                    label: item.appointmentsStatus,
                    className: 'bg-slate-100 text-slate-700',
                  };

                  return (
                    <tr
                      key={item.appointmentsId}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      {/* Fecha y hora */}
                      <td className="px-6 py-4">
                        <p className="font-bold text-med-primary-900 text-sm">
                          {formatDate(item.date)}
                        </p>
                        <p className="text-xs text-med-text-muted mt-0.5">
                          {item.startTime
                            ? `${item.startTime.slice(0, 5)} hs`
                            : ''}
                        </p>
                      </td>

                      {/* Especialidad y doctor */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-med-primary-900">
                          {item.doctor.specialty.name}
                        </p>
                        <p className="text-xs text-med-text-muted">
                          {item.doctor.name}
                        </p>
                      </td>

                      {/* Paciente */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-med-text-main">
                          {item.patient.fullName || 'Paciente'}
                        </p>
                        <p className="text-xs text-med-text-muted mt-0.5">
                          DNI: {item.patient.dni}
                        </p>
                      </td>

                      {/* Estado */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {status.label}
                        </span>
                      </td>

                      {/* Acciones: visible, sin función (no es obligatorio) */}
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          className="text-xs font-semibold text-med-primary-700 hover:text-med-primary-900 transition hover:underline"
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <TablePagination
          currentPage={page}
          totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
          totalItems={total}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </Card>
    </div>
  );
}

export default AppointmentsSearchPage;
