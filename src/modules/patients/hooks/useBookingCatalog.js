import useDoctorOptions from '../../doctors/hooks/useDoctorOptions';
import useSpecialtyOptions from '../../specialties/hooks/useSpecialtyOptions';

export default function useBookingCatalog() {
  const { specialties, error: specialtiesError } = useSpecialtyOptions();
  const { doctors, error: doctorsError } = useDoctorOptions();

  const getDoctorsBySpecialty = (specialtyId) =>
    doctors.filter((doc) => doc.speciality?.specialityId === specialtyId);

  const getDoctorById = (doctorId) =>
    doctors.find((doc) => doc.id === doctorId);

  return {
    specialties,
    getDoctorsBySpecialty,
    getDoctorById,
    error: specialtiesError || doctorsError,
  };
}
