import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import Select from '../../shared/components/Select';
import Alert from '../../shared/components/Alert';
import { SearchIcon } from '../../shared/components/icons';

function DoctorPicker({
  specialties,
  doctors,
  specialtyId,
  doctorId,
  onSpecialtyChange,
  onDoctorChange,
  onSearch,
  isSearching,
  errorMessage,
}) {
  return (
    <Card className="p-6 sm:p-7">
      <div className="mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-primary-900">
          Reservar Turno Médico
        </h1>
        <p className="text-xs sm:text-sm text-med-text-sub mt-1">
          Seleccione la especialidad y el profesional para continuar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-5">
          <Select
            id="specialty"
            label="Seleccionar Especialidad"
            value={specialtyId}
            onChange={(e) => onSpecialtyChange(e.target.value)}
          >
            <option value="">Seleccione especialidad</option>
            {specialties.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="md:col-span-4">
          <Select
            id="doctor"
            label="Seleccionar Doctor"
            value={doctorId}
            onChange={(e) => onDoctorChange(e.target.value)}
            disabled={!specialtyId}
          >
            <option value="">
              {specialtyId && doctors.length === 0
                ? 'No hay doctores en esta especialidad'
                : 'Seleccione doctor'}
            </option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="md:col-span-3">
          <Button
            onClick={onSearch}
            disabled={isSearching}
            className="w-full flex items-center justify-center gap-2 py-2.5"
          >
            <SearchIcon />
            <span>{isSearching ? 'Buscando...' : 'Buscar Disponibilidad'}</span>
          </Button>
        </div>
      </div>

      <Alert className="mt-4">{errorMessage}</Alert>
    </Card>
  );
}

export default DoctorPicker;
