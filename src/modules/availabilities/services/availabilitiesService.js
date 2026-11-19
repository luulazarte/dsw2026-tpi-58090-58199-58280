import { instance } from '../../shared/api/axiosInstance';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';

const URL = 'api/availabilities';

// Guarda la disponibilidad horaria de un médico para el resto del mes.
// body: { doctorId, days: [{ day: 'Lunes', startTime: '08:00', endTime: '12:00' }] }
//
// Primero intenta crearla (POST). Si el médico ya tenía disponibilidad
// cargada este mes, el backend responde 409 (Conflict): en ese caso la
// sobrescribimos con PUT, que recibe el mismo body.
export const saveAvailability = async (availability) => {
  try {
    const response = await instance.post(URL, availability);

    return { data: response.data, error: null };
  } catch (error) {
    if (error.response?.status !== 409) {
      return { data: null, error: getErrorMessage(error) };
    }
  }

  try {
    const response = await instance.put(URL, availability);

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};
