import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import IconButton from '../../shared/components/IconButton';
import {
  ClipboardIcon,
  EditIcon,
  TrashIcon,
} from '../../shared/components/icons';

const COLUMNS = [
  { label: 'Nombre de la Especialidad' },
  { label: 'Descripción' },
  { label: 'Estado', className: 'text-center' },
  { label: 'Acciones', className: 'text-right' },
];

function SpecialtiesTable({ specialties, isLoading, error, onDelete }) {
  return (
    <DataTable
      columns={COLUMNS}
      isLoading={isLoading}
      error={error}
      isEmpty={specialties.length === 0}
      loadingText="Cargando especialidades..."
      emptyText="No hay especialidades para mostrar."
    >
      {specialties.map((spec) => (
        <tr key={spec.id} className="hover:bg-gray-50/70 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-med-primary-100 text-med-primary-700 flex items-center justify-center shrink-0">
                <ClipboardIcon className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <span className="font-semibold text-med-primary-900">
                {spec.name}
              </span>
            </div>
          </td>

          <td className="px-6 py-4 text-med-text-sub max-w-md">
            {spec.description}
          </td>

          <td className="px-6 py-4 text-center">
            <Badge variant="success">Activa</Badge>
          </td>

          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
              <IconButton label="Editar especialidad">
                <EditIcon />
              </IconButton>
              <IconButton
                label="Eliminar especialidad"
                variant="danger"
                onClick={() => onDelete(spec)}
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

export default SpecialtiesTable;
