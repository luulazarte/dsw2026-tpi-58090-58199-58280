import Badge from '../../shared/components/Badge';

const STATUS_CONFIG = {
  BOOKED: { label: 'RESERVADO', variant: 'success' },
  CANCELLED: { label: 'CANCELADO', variant: 'danger' },
  ATTENDED: { label: 'ATENDIDO', variant: 'neutral' },
  NO_SHOW: { label: 'AUSENTE', variant: 'neutral' },
};

function AppointmentStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? { label: status, variant: 'neutral' };

  return (
    <Badge variant={config.variant} withDot>
      {config.label}
    </Badge>
  );
}

export default AppointmentStatusBadge;
