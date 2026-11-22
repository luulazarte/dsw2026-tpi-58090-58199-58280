import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import useSpecialtyOptions from '../../specialties/hooks/useSpecialtyOptions';
import useCreateDoctor from '../hooks/useCreateDoctor';
import DoctorForm from '../components/DoctorForm';

function DoctorFormPage() {
  const navigate = useNavigate();
  const { specialties, error: specialtiesError } = useSpecialtyOptions();
  const { create, error: createError } = useCreateDoctor();

  const handleSubmit = async (formData) => {
    const saved = await create(formData);

    if (saved) {
      navigate('/admin/doctors');
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <PageHeader
        title="Registrar Nuevo Doctor"
        subtitle="Complete todos los campos obligatorios para integrar un nuevo facultativo al sistema del centro médico."
        breadcrumbs={[
          { label: 'Doctores', to: '/admin/doctors' },
          { label: 'Agregar Nuevo Doctor' },
        ]}
      />

      <Card className="p-6">
        <DoctorForm
          specialties={specialties}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/doctors')}
          errorMessage={createError || specialtiesError}
        />
      </Card>
    </div>
  );
}

export default DoctorFormPage;
