import Modal from '../../shared/components/Modal';
import Button from '../../shared/components/Button';
import { formatLongDate, formatTime } from '../../shared/helpers/calendar';

function BookingConfirmationModal({
  appointment,
  patientDni,
  onClose,
  onViewAppointments,
}) {
  return (
    <Modal
      isOpen={Boolean(appointment)}
      className="text-center"
      footer={
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <Button
            className="w-full text-xs py-2.5"
            onClick={onViewAppointments}
          >
            Ver Mis Turnos
          </Button>
          <Button
            variant="secondary"
            className="w-full text-xs py-2.5"
            onClick={onClose}
          >
            Reservar Otro
          </Button>
        </div>
      }
    >
      {appointment && (
        <>
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 mt-2 text-2xl font-bold">
            ✓
          </div>
          <h3 className="text-xl font-bold text-med-primary-900">
            ¡Turno Confirmado con Éxito!
          </h3>
          <p className="text-xs text-med-text-sub mt-2 leading-relaxed">
            Tu turno con{' '}
            <strong className="text-med-text-main">
              {appointment.doctorName}
            </strong>{' '}
            quedó reservado para el{' '}
            <strong className="text-med-text-main">
              {formatLongDate(appointment.date.slice(0, 10))} a las{' '}
              {formatTime(appointment.startTime)} hs
            </strong>
            .
          </p>

          <div className="mt-5 p-3.5 bg-med-primary-50 border border-med-primary-200/60 rounded-xl text-xs text-med-primary-900 text-left space-y-1">
            <p>
              <strong>Especialidad:</strong> {appointment.specialtyName}
            </p>
            <p>
              <strong>Paciente:</strong> DNI {patientDni}
            </p>
          </div>
        </>
      )}
    </Modal>
  );
}

export default BookingConfirmationModal;
