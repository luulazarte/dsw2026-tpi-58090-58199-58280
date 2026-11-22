import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import IconButton from '../../shared/components/IconButton';
import { EditIcon, EyeIcon, TrashIcon } from '../../shared/components/icons';
import DoctorAvatar from './DoctorAvatar';

const COLUMNS = [
  { label: 'Nombre del Doctor' },
  { label: 'Especialidad' },
  { label: 'Estado de Disponibilidad', className: 'text-center' },
  { label: 'Acciones', className: 'text-right' },
];

function DoctorsTable({ doctors, isLoading, error, onDelete }) {
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
              <DoctorAvatar showStatus />
              <div>
                <p className="font-semibold text-med-primary-900 leading-tight">
                  {doc.name}
                </p>
                <p className="text-xs text-med-text-muted mt-0.5">
                  Matrícula: {doc.licenseNumber}
                </p>
              </div>
            </div>
          </td>

          <td className="px-6 py-4">
            <Badge>{doc.speciality?.name}</Badge>
          </td>

          <td className="px-6 py-4 text-center">
            <Badge variant="success" withDot>
              Activo
            </Badge>
          </td>

          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
              <IconButton label="Ver detalle">
                <EyeIcon />
              </IconButton>
              <IconButton label="Editar profesional">
                <EditIcon />
              </IconButton>
              <IconButton
                label="Eliminar profesional"
                variant="danger"
                onClick={() => onDelete(doc)}
              >
                <TrashIcon />
              </IconButton>
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}

export default DoctorsTable;
