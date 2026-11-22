import { useNavigate } from 'react-router-dom';
import PageHeader from '../../shared/components/PageHeader';
import useDoctorOptions from '../../doctors/hooks/useDoctorOptions';
import useSaveAvailability from '../hooks/useSaveAvailability';
import AvailabilityForm from '../components/AvailabilityForm';

function AvailabilityPage() {
  const navigate = useNavigate();
  const { doctors, error: doctorsError } = useDoctorOptions();
  const { save, error: saveError, successMessage } = useSaveAvailability();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestionar Disponibilidad Horaria"
        subtitle="Defina los días y rangos horarios de atención para el profesional seleccionado."
        breadcrumbs={[
          { label: 'Doctores', to: '/admin/doctors' },
          { label: 'Disponibilidad Horaria' },
        ]}
      />

      <AvailabilityForm
        doctors={doctors}
        onSubmit={save}
        onCancel={() => navigate('/admin/doctors')}
        errorMessage={saveError || doctorsError}
        successMessage={successMessage}
      />
    </div>
  );
}

export default AvailabilityPage;
