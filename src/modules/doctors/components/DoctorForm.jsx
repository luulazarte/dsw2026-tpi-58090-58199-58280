import { useForm } from 'react-hook-form';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';
import Button from '../../shared/components/Button';
import Alert from '../../shared/components/Alert';

function DoctorForm({ specialties, onSubmit, onCancel, errorMessage }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', licenseNumber: '', specialityId: '' },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <Input
        id="name"
        label="Nombre Completo del Doctor"
        type="text"
        placeholder="Ej. Dr. Alejandro Martínez"
        error={errors.name?.message}
        {...register('name', {
          required: 'El nombre es obligatorio',
          minLength: {
            value: 3,
            message: 'El nombre debe tener al menos 3 caracteres',
          },
          maxLength: {
            value: 100,
            message: 'El nombre puede tener hasta 100 caracteres',
          },
        })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          id="specialityId"
          label="Especialidad"
          error={errors.specialityId?.message}
          {...register('specialityId', {
            required: 'Seleccioná una especialidad',
          })}
        >
          <option value="">Seleccione especialidad</option>
          {specialties.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.name}
            </option>
          ))}
        </Select>

        <Input
          id="licenseNumber"
          label="Número de Licencia Médica"
          type="text"
          placeholder="Ej. MP-45832"
          error={errors.licenseNumber?.message}
          {...register('licenseNumber', {
            required: 'El número de licencia es obligatorio',
            maxLength: {
              value: 50,
              message: 'La licencia puede tener hasta 50 caracteres',
            },
          })}
        />
      </div>

      <Alert>{errorMessage}</Alert>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar Doctor'}
        </Button>
      </div>
    </form>
  );
}

export default DoctorForm;
