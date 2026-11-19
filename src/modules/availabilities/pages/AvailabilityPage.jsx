import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { getDoctors } from '../../doctors/services/doctorsService';
import { saveAvailability } from '../services/availabilitiesService';

// Los nombres de los días tal cual los espera el backend
// (AvailabilityService, diccionario _diasSemana)
const WEEK_DAYS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const timeInputClass =
  'border rounded-lg px-2.5 py-1.5 text-sm bg-white text-med-text-main focus:outline-none focus:ring-2 focus:ring-med-primary-600 disabled:bg-gray-100 disabled:text-med-text-muted';

function AvailabilityPage() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
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

  // watch "mira" el formulario: se actualiza cada vez que cambia un campo
  const days = watch('days');
  const selectedDoctor = doctors.find((doc) => doc.id === watch('doctorId'));

  // Al abrir la página traemos los médicos para el desplegable
  useEffect(() => {
    const loadDoctors = async () => {
      const { data, error } = await getDoctors({ pageSize: 100 });

      if (error) {
        setErrorMessage(error);
      } else {
        setDoctors(data.data);
      }
    };

    loadDoctors();
  }, []);

  const onValid = async (formData) => {
    setErrorMessage('');
    setSuccessMessage('');

    // Solo mandamos los días que tienen el interruptor en "Activo"
    const activeDays = formData.days
      .filter((item) => item.enabled)
      .map(({ day, startTime, endTime }) => ({ day, startTime, endTime }));

    if (activeDays.length === 0) {
      setErrorMessage('Activá al menos un día de atención.');

      return;
    }

    const { data, error } = await saveAvailability({
      doctorId: formData.doctorId,
      days: activeDays,
    });

    if (error) {
      setErrorMessage(error);

      return;
    }

    setSuccessMessage(
      `Disponibilidad guardada: se generaron ${data.length} turnos de 30 minutos para el resto del mes.`
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Migas de pan + título */}
      <div>
        <p className="text-xs text-med-text-muted">
          <Link to="/admin/doctors" className="hover:text-med-primary-900">
            Doctores
          </Link>
          <span className="mx-2">›</span>
          <span className="text-med-text-sub">Disponibilidad Horaria</span>
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main mt-2">
          Gestionar Disponibilidad Horaria
        </h1>
        <p className="text-sm text-med-text-sub mt-1">
          Defina los días y rangos horarios de atención para el profesional
          seleccionado.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onValid)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        noValidate
      >
        {/* Columna izquierda: profesional */}
        <div className="flex flex-col gap-4">
          <Card className="p-5 flex flex-col gap-3">
            <label
              htmlFor="doctorId"
              className="text-xs font-semibold text-med-text-main"
            >
              Seleccionar Profesional
            </label>
            <select
              id="doctorId"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white text-med-text-main focus:outline-none focus:ring-2 focus:ring-med-primary-600 ${errors.doctorId ? 'border-red-400' : 'border-med-border'}`}
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
            </select>
            {errors.doctorId && (
              <p className="text-xs text-red-500 font-medium">
                {errors.doctorId.message}
              </p>
            )}

            {selectedDoctor && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-med-primary-50">
                <div className="w-10 h-10 rounded-xl bg-med-primary-100 flex items-center justify-center text-xl">
                  👨‍⚕️
                </div>
                <div>
                  <p className="text-sm font-semibold text-med-primary-900">
                    {selectedDoctor.name}
                  </p>
                  <p className="text-xs text-med-text-muted">
                    {selectedDoctor.speciality?.name} · Matrícula{' '}
                    {selectedDoctor.licenseNumber}
                  </p>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-4 text-xs text-med-text-sub leading-relaxed">
            Los cambios se aplican desde hoy hasta fin de mes. Se generan turnos
            de 30 minutos en los días activos, excepto feriados. Si el
            profesional ya tenía horarios este mes, se reemplazan los turnos
            libres; los ya reservados se mantienen.
          </Card>
        </div>

        {/* Columna derecha: configuración de horarios */}
        <Card className="p-0 overflow-hidden lg:col-span-2">
          <div className="p-5 border-b border-med-border">
            <h2 className="text-base font-bold text-med-primary-900">
              Configuración de Horarios
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border">
                <tr>
                  <th className="px-5 py-3">Día</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3">Entrada</th>
                  <th className="px-5 py-3">Salida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-med-border-subtle">
                {WEEK_DAYS.map((day, index) => {
                  const enabled = days[index].enabled;

                  return (
                    <tr key={day}>
                      <td className="px-5 py-3 font-semibold text-med-primary-900">
                        {day}
                      </td>
                      <td className="px-5 py-3">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-med-primary-900"
                            {...register(`days.${index}.enabled`)}
                          />
                          <span className="text-xs text-med-text-sub">
                            {enabled ? 'Activo' : 'Inactivo'}
                          </span>
                        </label>
                      </td>
                      <td className="px-5 py-3">
                        <input
                          type="time"
                          step="1800"
                          disabled={!enabled}
                          className={`${timeInputClass} border-med-border`}
                          {...register(`days.${index}.startTime`)}
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          type="time"
                          step="1800"
                          disabled={!enabled}
                          className={`${timeInputClass} ${errors.days?.[index]?.endTime ? 'border-red-400' : 'border-med-border'}`}
                          {...register(`days.${index}.endTime`, {
                            // RN: startTime < endTime (solo si el día está activo)
                            validate: (endTime, formValues) =>
                              !formValues.days[index].enabled ||
                              endTime > formValues.days[index].startTime ||
                              'La salida debe ser posterior a la entrada',
                          })}
                        />
                        {errors.days?.[index]?.endTime && (
                          <p className="text-xs text-red-500 font-medium mt-1">
                            {errors.days[index].endTime.message}
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-5 border-t border-med-border flex flex-col gap-3">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 text-center">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700 text-center">
                {successMessage}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/doctors')}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar Disponibilidad'}
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}

export default AvailabilityPage;
