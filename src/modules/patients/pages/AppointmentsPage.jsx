import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import Alert from '../../shared/components/Alert';
import PageHeader from '../../shared/components/PageHeader';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import usePatientAppointments from '../hooks/usePatientAppointments';
import AppointmentCard from '../components/AppointmentCard';

function AppointmentsPage() {
  const navigate = useNavigate();
  const {
    appointments,
    isLoading,
    error,
    appointmentToCancel,
    askCancel,
    closeCancel,
    confirmCancel,
  } = usePatientAppointments();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Mis Turnos Médicos"
        subtitle="Consulta y gestiona las citas médicas programadas."
        actions={
          <Button onClick={() => navigate('/')}>+ Solicitar Nuevo Turno</Button>
        }
      />

      <Alert>{error}</Alert>

      {isLoading && (
        <p className="text-sm text-med-text-muted">Cargando tus turnos...</p>
      )}

      {!isLoading && !error && appointments.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-sm text-med-text-sub">No tenés turnos próximos.</p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {appointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            doctorName={appt.doctorName}
            specialtyName={appt.specialtyName}
            date={appt.date}
            startTime={appt.startTime}
            onCancel={() => askCancel(appt)}
          />
        ))}
      </div>

      <ConfirmDialog
        isOpen={Boolean(appointmentToCancel)}
        title="Cancelar turno"
        message={`¿Cancelar el turno con ${appointmentToCancel?.doctorName}?`}
        confirmLabel="Sí, cancelar"
        cancelLabel="Volver"
        onConfirm={confirmCancel}
        onCancel={closeCancel}
      />
    </div>
  );
}

export default AppointmentsPage;
