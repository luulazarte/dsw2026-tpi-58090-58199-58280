import DoctorAvatar from './DoctorAvatar';

function DoctorSummary({ name, specialtyName, licenseNumber }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-med-primary-50">
      <DoctorAvatar />
      <div>
        <p className="text-sm font-semibold text-med-primary-900">{name}</p>
        <p className="text-xs text-med-text-muted">
          {specialtyName} · Matrícula {licenseNumber}
        </p>
      </div>
    </div>
  );
}

export default DoctorSummary;
