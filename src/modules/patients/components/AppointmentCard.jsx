import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import Badge from '../../shared/components/Badge';
import { formatTime, formatWeekdayDate } from '../../shared/helpers/calendar';

function AppointmentCard({
  doctorName,
  specialtyName,
  date,
  startTime,
  onCancel,
}) {
  return (
    <Card className="flex flex-col justify-between gap-4 p-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge>{specialtyName}</Badge>
          <Badge variant="success" withDot>
            Confirmado
          </Badge>
        </div>
        <h3 className="text-lg font-bold text-med-primary-900">{doctorName}</h3>
        <p className="text-sm text-med-text-sub mt-2">
          Fecha:{' '}
          <strong className="text-med-text-main font-semibold">
            {formatWeekdayDate(date)}
          </strong>{' '}
          a las{' '}
          <strong className="text-med-text-main font-semibold">
            {formatTime(startTime)} hs
          </strong>
        </p>
      </div>
      <div className="flex gap-2 pt-3 border-t border-med-border">
        <Button variant="outline" className="w-full text-xs" onClick={onCancel}>
          Cancelar Turno
        </Button>
      </div>
    </Card>
  );
}

export default AppointmentCard;
