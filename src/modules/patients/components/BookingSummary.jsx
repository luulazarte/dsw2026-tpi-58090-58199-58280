import Button from '../../shared/components/Button';
import Textarea from '../../shared/components/Textarea';
import { CheckCircleIcon } from '../../shared/components/icons';
import { formatLongDate, formatTime } from '../../shared/helpers/calendar';

function BookingSummary({
  slotDate,
  startTime,
  doctorName,
  specialtyName,
  reason,
  reasonError,
  onReasonChange,
  onConfirm,
  isBooking,
}) {
  return (
    <div className="bg-med-primary-50 border border-med-primary-200/60 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
      <div className="border-l-4 border-med-primary-900 pl-3.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-med-text-sub">
          Resumen de Selección
        </span>
        <p className="text-base sm:text-lg font-bold text-med-primary-900 mt-0.5 capitalize">
          📅 {formatLongDate(slotDate.slice(0, 10))}, {formatTime(startTime)} HS
        </p>
        <p className="text-xs text-med-text-sub mt-0.5">
          {doctorName} • {specialtyName} • Duración: 30 min
        </p>
      </div>

      <Textarea
        id="reason"
        label="Motivo de la consulta"
        rows={2}
        value={reason}
        onChange={(e) => onReasonChange(e.target.value)}
        placeholder="Ej. Control anual, dolor de cabeza frecuente..."
        error={reasonError}
      />

      <div className="flex justify-end">
        <Button
          onClick={onConfirm}
          disabled={isBooking}
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl shadow-md text-sm"
        >
          <span>{isBooking ? 'Reservando...' : 'Confirmar Turno'}</span>
          <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
        </Button>
      </div>
    </div>
  );
}

export default BookingSummary;
