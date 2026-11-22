import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import DoctorAvatar from '../../doctors/components/DoctorAvatar';

const COLUMNS = [
  { label: 'Nombre del Doctor' },
  { label: 'Especialidad' },
  { label: 'Estado de Disponibilidad' },
  { label: 'Acciones', className: 'text-right' },
];

function DoctorsSummaryTable({ doctors, isLoading, error, onViewDetail }) {
  return (
    <DataTable
      columns={COLUMNS}
      isLoading={isLoading}
      error={error}
      isEmpty={doctors.length === 0}
      loadingText="Cargando médicos..."
      emptyText="No hay médicos para mostrar."
    >
      {doctors.map((doc) => (
        <tr key={doc.id} className="hover:bg-gray-50/70 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <DoctorAvatar size="sm" />
              <span className="font-semibold text-med-primary-900">
                {doc.name}
              </span>
            </div>
          </td>
          <td className="px-6 py-4 text-med-text-sub">
            {doc.speciality?.name}
          </td>
          <td className="px-6 py-4">
            <Badge variant="success" withDot>
              Activo
            </Badge>
          </td>
          <td className="px-6 py-4 text-right">
            <button
              type="button"
              onClick={onViewDetail}
              className="text-xs font-semibold text-med-primary-700 hover:text-med-primary-900"
            >
              Ver Detalle
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}

export default DoctorsSummaryTable;
