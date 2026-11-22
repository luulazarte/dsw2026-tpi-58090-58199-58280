import { useForm } from 'react-hook-form';
import Input from '../../shared/components/Input';
import Textarea from '../../shared/components/Textarea';
import Button from '../../shared/components/Button';
import Alert from '../../shared/components/Alert';

function SpecialtyForm({ onSubmit, onCancel, errorMessage }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', description: '' } });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <Input
        id="name"
        label="Nombre de la Especialidad"
        type="text"
        placeholder="Ej. Cardiología Intervencionista"
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

      <Textarea
        id="description"
        label="Descripción"
        rows={4}
        placeholder="Detalle el alcance de la especialidad..."
        error={errors.description?.message}
        {...register('description', {
          required: 'La descripción es obligatoria',
          minLength: {
            value: 10,
            message: 'La descripción debe tener al menos 10 caracteres',
          },
          maxLength: {
            value: 100,
            message: 'La descripción puede tener hasta 100 caracteres',
          },
        })}
      />

      <Alert>{errorMessage}</Alert>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar Especialidad'}
        </Button>
      </div>
    </form>
  );
}

export default SpecialtyForm;
