import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import useCreateSpecialty from '../hooks/useCreateSpecialty';
import SpecialtyForm from '../components/SpecialtyForm';

function SpecialtyFormPage() {
  const navigate = useNavigate();
  const { create, error } = useCreateSpecialty();

  const handleSubmit = async (formData) => {
    const saved = await create(formData);

    if (saved) {
      navigate('/admin/specialties');
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <PageHeader
        title="Registrar Nueva Especialidad"
        subtitle="Complete la información para dar de alta una especialidad médica en el sistema hospitalario."
        breadcrumbs={[
          { label: 'Especialidades', to: '/admin/specialties' },
          { label: 'Agregar Nueva Especialidad' },
        ]}
      />

      <Card className="p-6">
        <SpecialtyForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/specialties')}
          errorMessage={error}
        />
      </Card>
    </div>
  );
}

export default SpecialtyFormPage;
