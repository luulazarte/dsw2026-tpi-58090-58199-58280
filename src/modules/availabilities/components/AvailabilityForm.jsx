import { useForm } from 'react-hook-form';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import Select from '../../shared/components/Select';
import Alert from '../../shared/components/Alert';
import DoctorSummary from '../../doctors/components/DoctorSummary';
import WeeklyScheduleTable from './WeeklyScheduleTable';

const WEEK_DAYS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

function AvailabilityForm({
  doctors,
  onSubmit,
  onCancel,
  errorMessage,
  successMessage,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      doctorId: '',
      days: WEEK_DAYS.map((day) => ({
        day,
        enabled: false,
        startTime: '08:00',
        endTime: '16:00',
      })),
    },
  });

  const days = watch('days');
  const selectedDoctor = doctors.find((doc) => doc.id === watch('doctorId'));
  const onValid = async (formData) => {
    const saved = await onSubmit(formData);

    if (saved) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      noValidate
    >
      <div className="flex flex-col gap-4">
        <Card className="p-5 flex flex-col gap-3">
          <Select
            id="doctorId"
            label="Seleccionar Profesional"
            error={errors.doctorId?.message}
            {...register('doctorId', {
              required: 'Seleccioná un profesional',
            })}
          >
            <option value="">Seleccione un médico</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} - {doc.speciality?.name}
              </option>
            ))}
          </Select>

          {selectedDoctor && (
            <DoctorSummary
              name={selectedDoctor.name}
              specialtyName={selectedDoctor.speciality?.name}
              licenseNumber={selectedDoctor.licenseNumber}
            />
          )}
        </Card>

        <Card className="p-4 text-xs text-med-text-sub leading-relaxed">
          Los cambios se aplican desde hoy hasta fin de mes. Se generan turnos
          de 30 minutos en los días activos, excepto feriados. Si el profesional
          ya tenía horarios este mes, se reemplazan los turnos libres; los ya
          reservados se mantienen.
        </Card>
      </div>

      <Card className="p-0 overflow-hidden lg:col-span-2">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Configuración de Horarios
          </h2>
        </div>

        <WeeklyScheduleTable
          weekDays={WEEK_DAYS}
          days={days}
          register={register}
          errors={errors}
        />

        <div className="p-5 border-t border-med-border flex flex-col gap-3">
          <Alert>{errorMessage}</Alert>
          <Alert variant="success">{successMessage}</Alert>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Disponibilidad'}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}

export default AvailabilityForm;
