import Card from '../../shared/components/Card';
import DoctorAvatar from './DoctorAvatar';

function DoctorProfileCard({ name, specialtyName, licenseNumber }) {
  return (
    <Card className="p-5 sm:p-6 flex items-center gap-4 border-med-border">
      <DoctorAvatar size="lg" showStatus />

      <div className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-med-primary-900">
            {name}
          </h2>
          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-med-primary-100 text-med-primary-700">
            Matrícula {licenseNumber}
          </span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-med-primary-700 mt-0.5">
          {specialtyName}
        </p>
      </div>
    </Card>
  );
}

export default DoctorProfileCard;
