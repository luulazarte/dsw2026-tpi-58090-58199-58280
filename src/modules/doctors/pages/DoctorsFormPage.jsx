import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { createDoctor } from '../services/doctorsService';
import { getSpecialties } from '../../specialties/services/specialtiesService';

const inputClass =
    'w-full border rounded-lg px-3.5 py-2.5 text-sm bg-white text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent';

// Página para registrar un médico (/admin/doctors/new)
function DoctorFormPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [specialties, setSpecialties] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { name: '', licenseNumber: '', specialityId: '' },
    });

    // Al abrir la página, traemos las especialidades para el desplegable
    useEffect(() => {
        const loadSpecialties = async () => {
            const { data, error } = await getSpecialties({ pageSize: 100 });

            if (error) {
                setErrorMessage(error);
            } else {
                setSpecialties(data.data);
            }
        };

        loadSpecialties();
    }, []);

    const onValid = async (formData) => {
        setErrorMessage('');
        const { error } = await createDoctor(formData);

        if (error) {
            setErrorMessage(error);

            return;
        }

        navigate('/admin/doctors');
    };

    return (
        <div className="flex flex-col gap-6 max-w-3xl">
            {/* Migas de pan + título */}
            <div>
                <p className="text-xs text-med-text-muted">
                    <Link to="/admin/doctors" className="hover:text-med-primary-900">
                        Doctores
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="text-med-text-sub">Agregar Nuevo Doctor</span>
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main mt-2">
                    Registrar Nuevo Doctor
                </h1>
                <p className="text-sm text-med-text-sub mt-1">
                    Complete todos los campos obligatorios para integrar un nuevo
                    facultativo al sistema del centro médico.
                </p>
            </div>

            <Card className="p-6">
                <form
                    onSubmit={handleSubmit(onValid)}
                    className="flex flex-col gap-5"
                    noValidate
                >
                    {/* Nombre completo */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="name"
                            className="text-xs font-semibold text-med-text-main"
                        >
                            Nombre Completo del Doctor
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ej. Dr. Alejandro Martínez"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Especialidad */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="specialityId"
                                className="text-xs font-semibold text-med-text-main"
                            >
                                Especialidad
                            </label>
                            <select
                                id="specialityId"
                                className={`${inputClass} ${errors.specialityId ? 'border-red-400 bg-red-50/20' : 'border-med-border'}`}
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
                            </select>
                            {errors.specialityId && (
                                <p className="text-xs text-red-500 font-medium">
                                    {errors.specialityId.message}
                                </p>
                            )}
                        </div>

                        {/* Número de licencia */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="licenseNumber"
                                className="text-xs font-semibold text-med-text-main"
                            >
                                Número de Licencia Médica
                            </label>
                            <input
                                id="licenseNumber"
                                type="text"
                                placeholder="Ej. MP-45832"
                                className={`${inputClass} ${errors.licenseNumber ? 'border-red-400 bg-red-50/20' : 'border-med-border'}`}
                                {...register('licenseNumber', {
                                    required: 'El número de licencia es obligatorio',
                                    maxLength: {
                                        value: 50,
                                        message: 'La licencia puede tener hasta 50 caracteres',
                                    },
                                })}
                            />
                            {errors.licenseNumber && (
                                <p className="text-xs text-red-500 font-medium">
                                    {errors.licenseNumber.message}
                                </p>
                            )}
                        </div>
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
                            onClick={() => navigate('/admin/doctors')}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Guardando...' : 'Guardar Doctor'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default DoctorFormPage;