import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { createSpecialty } from '../services/specialtiesService';

const inputClass =
  'w-full border rounded-lg px-3.5 py-2.5 text-sm bg-white text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent';

// Una sola página para crear (/admin/specialties/new)
function SpecialtyFormPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onValid = async (formData) => {
    setErrorMessage('');
    const { error } = await createSpecialty(formData);

    if (error) {
      setErrorMessage(error);

      return;
    }

    navigate('/admin/specialties');
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Migas de pan + título */}
      <div>
        <p className="text-xs text-med-text-muted">
          <Link to="/admin/specialties" className="hover:text-med-primary-900">
            Especialidades
          </Link>
          <span className="mx-2">›</span>
          <span className="text-med-text-sub">Agregar Nueva Especialidad</span>
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main mt-2">
          Registrar Nueva Especialidad
        </h1>
        <p className="text-sm text-med-text-sub mt-1">
          Complete la información para dar de alta una especialidad médica en el
          sistema hospitalario.
        </p>
      </div>

      <Card className="p-6">
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-xs font-semibold text-med-text-main"
            >
              Nombre de la Especialidad
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ej. Cardiología Intervencionista"
              className={`${inputClass} ${errors.name ? 'border-red-400 bg-red-50/20' : 'border-med-border'}`}
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
            {errors.name && (
              <p className="text-xs text-red-500 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-xs font-semibold text-med-text-main"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Detalle el alcance de la especialidad..."
              className={`${inputClass} resize-none ${errors.description ? 'border-red-400 bg-red-50/20' : 'border-med-border'}`}
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
            {errors.description && (
              <p className="text-xs text-red-500 font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Error que devuelve el backend */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 text-center">
              {errorMessage}
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/specialties')}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Especialidad'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SpecialtyFormPage;
