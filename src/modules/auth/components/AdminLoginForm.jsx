import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import Alert from '../../shared/components/Alert';
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
} from '../../shared/components/icons';

function AdminLoginForm({ onSubmit, errorMessage }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Correo Electrónico"
        type="email"
        placeholder="admin@system.com"
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
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        leftIcon={<LockIcon />}
        error={errors.password?.message}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
            title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="text-med-text-muted hover:text-med-text-main"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
        {...register('password', {
          required: 'La contraseña es obligatoria',
          minLength: {
            value: 8,
            message: 'Debe tener al menos 8 caracteres',
          },
        })}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full py-2.5"
      >
        {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión →'}
      </Button>

      <Alert>{errorMessage}</Alert>
    </form>
  );
}

export default AdminLoginForm;
