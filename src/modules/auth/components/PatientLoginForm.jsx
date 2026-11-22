import { useForm } from 'react-hook-form';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import Alert from '../../shared/components/Alert';
import { IdCardIcon, MailIcon } from '../../shared/components/icons';

function PatientLoginForm({ onSubmit, errorMessage }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', dni: '' } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Correo Electrónico"
        type="email"
        placeholder="paciente@medportal.com"
        leftIcon={<MailIcon />}
        error={errors.email?.message}
        {...register('email', {
          required: 'El correo electrónico es obligatorio',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Ingresá un correo electrónico válido',
          },
        })}
      />

      <Input
        label="DNI"
        type="text"
        inputMode="numeric"
        placeholder="Número de documento (sin puntos)"
        leftIcon={<IdCardIcon />}
        error={errors.dni?.message}
        {...register('dni', {
          required: 'El DNI es obligatorio',
          pattern: {
            value: /^\d{7,8}$/,
            message: 'El DNI debe tener 7 u 8 dígitos (sin puntos)',
          },
        })}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full mt-1">
        {isSubmitting ? 'Ingresando...' : 'Ingresar Paciente'}
      </Button>

      <Alert>{errorMessage}</Alert>
    </form>
  );
}

export default PatientLoginForm;
