import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import useAuth from '../../auth/hook/useAuth';
import {
  cancelAppointment,
  getPatientAppointments,
} from '../../appointments/services/appointmentsService';

// "2026-11-23T00:00:00" → "lunes, 23 de noviembre"
const formatDate = (dateText) => {
  const [year, month, day] = dateText.slice(0, 10).split('-').map(Number);

  return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};
function AppointmentsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Al abrir la pantalla pedimos los turnos del paciente que inició sesión
  useEffect(() => {
    const loadAppointments = async () => {
      const { data, error } = await getPatientAppointments(user.dni);

      if (error) {
        setErrorMessage(error);
      } else {
        // Ordenados del más próximo al más lejano
        setAppointments(
          [...data].sort((a, b) =>
            `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)
          )
        );
      }

      setIsLoading(false);
    };

    loadAppointments();
  }, [user.dni]);

  const handleCancel = async (appt) => {
    const confirmed = window.confirm(
      `¿Cancelar el turno con ${appt.doctorName}? El horario quedará libre para otro paciente.`
    );

    if (!confirmed) {
      return;
    }

    setErrorMessage('');
    const { error } = await cancelAppointment(appt.id);

    if (error) {
      setErrorMessage(error);

      return;
    }

    // Lo sacamos de la lista (el backend solo devuelve turnos activos)
    setAppointments(appointments.filter((item) => item.id !== appt.id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
            Mis Turnos Médicos
          </h1>
          <p className="text-sm text-med-text-sub mt-1">
            Consulta y gestiona las citas médicas programadas.
          </p>
        </div>
        <Button onClick={() => navigate('/')}>+ Solicitar Nuevo Turno</Button>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 text-center">
          {errorMessage}
        </div>
      )}

      {isLoading && (
        <p className="text-sm text-med-text-muted">Cargando tus turnos...</p>
      )}

      {!isLoading && !errorMessage && appointments.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-sm text-med-text-sub">No tenés turnos próximos.</p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {appointments.map((appt) => (
          <Card
            key={appt.id}
            className="flex flex-col justify-between gap-4 p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-med-primary-100 text-med-primary-700">
                  {appt.specialtyName}
                </span>
                {/* El backend solo devuelve turnos reservados (BOOKED) */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-med-active-bg text-med-active-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Confirmado
                </span>
              </div>
              <h3 className="text-lg font-bold text-med-primary-900">
                {appt.doctorName}
              </h3>
              <p className="text-sm text-med-text-sub mt-2">
                Fecha:{' '}
                <strong className="text-med-text-main font-semibold">
                  {formatDate(appt.date)}
                </strong>{' '}
                a las{' '}
                <strong className="text-med-text-main font-semibold">
                  {appt.startTime.slice(0, 5)} hs
                </strong>
              </p>
            </div>
            <div className="flex gap-2 pt-3 border-t border-med-border">
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => handleCancel(appt)}
              >
                Cancelar Turno
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AppointmentsPage;