import { instance } from '../../shared/api/axiosInstance';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';

const URL = 'api/availabilities';

export const saveAvailability = async (availability) => {
  try {
    const response = await instance.post(URL, availability);

    return { data: response.data, error: null };
  } catch (error) {
    if (error.response?.status === 409) {
      return {
        data: null,
        error: 'Este médico ya tiene disponibilidad cargada para este mes.',
      };
    }

    return { data: null, error: getErrorMessage(error) };
  }
};
