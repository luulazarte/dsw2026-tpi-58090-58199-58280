import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';
import { FilterIcon } from '../../shared/components/icons';

function AppointmentFilters({
  filters,
  dniError,
  specialties,
  doctorOptions,
  activeChips,
  onChange,
  onApply,
  onClear,
}) {
  const handleChange = (field) => (e) => onChange(field, e.target.value);

  return (
    <Card className="p-6">
      <div className="pb-4 border-b border-med-border-subtle">
        <h2 className="text-base font-bold text-med-primary-900">
          Criterios de Búsqueda
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-4 items-start">
        <Input
          id="dni"
          label="DNI del Paciente"
          type="text"
          inputMode="numeric"
          value={filters.dni}
          onChange={handleChange('dni')}
          placeholder="Ej. 40123456"
          error={dniError}
        />

        <Select
          id="specialty"
          label="Especialidad"
          value={filters.specialtyId}
          onChange={handleChange('specialtyId')}
        >
          <option value="">Todas las Especialidades</option>
          {specialties.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.name}
            </option>
          ))}
        </Select>

        <Select
          id="doctor"
          label="Doctor"
          value={filters.doctorId}
          onChange={handleChange('doctorId')}
        >
          <option value="">Todos los Doctores</option>
          {doctorOptions.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </Select>

        <Input
          id="date"
          label="Fecha"
          type="date"
          value={filters.date}
          onChange={handleChange('date')}
        />

        <div className="flex flex-col gap-2 lg:mt-5">
          <Button
            onClick={onApply}
            className="w-full flex items-center justify-center gap-2 py-2"
          >
            <FilterIcon />
            <span>Aplicar Filtros</span>
          </Button>
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-med-text-muted hover:text-med-primary-900 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

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
  );
}

export default AppointmentFilters;
