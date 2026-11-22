import DataTable from '../../shared/components/DataTable';
import { formatShortDate, formatTime } from '../../shared/helpers/calendar';
import AppointmentStatusBadge from './AppointmentStatusBadge';

const COLUMNS = [
  { label: 'Fecha' },
  { label: 'Departamento' },
  { label: 'Paciente' },
  { label: 'Estado', className: 'text-center' },
  { label: 'Acciones', className: 'text-right' },
];

function AppointmentsTable({ appointments, isLoading, error }) {
  return (
    <DataTable
      columns={COLUMNS}
      isLoading={isLoading}
      error={error}
      isEmpty={appointments.length === 0}
      loadingText="Buscando turnos..."
      emptyText="No se encontraron turnos con esos filtros."
    >
      {appointments.map((item) => (
        <tr
          key={item.appointmentsId}
          className="hover:bg-gray-50/70 transition-colors"
        >
          <td className="px-6 py-4">
            <p className="font-bold text-med-primary-900 text-sm">
              {formatShortDate(item.date)}
            </p>
            <p className="text-xs text-med-text-muted mt-0.5">
              {item.startTime ? `${formatTime(item.startTime)} hs` : ''}
            </p>
          </td>

          <td className="px-6 py-4">
            <p className="font-semibold text-med-primary-900">
              {item.doctor.specialty.name}
            </p>
            <p className="text-xs text-med-text-muted">{item.doctor.name}</p>
          </td>

          <td className="px-6 py-4">
            <p className="font-semibold text-med-text-main">
              {item.patient.fullName || 'Paciente'}
            </p>
            <p className="text-xs text-med-text-muted mt-0.5">
              DNI: {item.patient.dni}
            </p>
          </td>

          <td className="px-6 py-4 text-center">
            <AppointmentStatusBadge status={item.appointmentsStatus} />
          </td>

          <td className="px-6 py-4 text-right">
            <button
              type="button"
              className="text-xs font-semibold text-med-primary-700 hover:text-med-primary-900 transition hover:underline"
            >
              Ver Detalle
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}

export default AppointmentsTable;
