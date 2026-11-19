import { instance } from '../../shared/api/axiosInstance';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';

export const loginAdmin = async (email, password) => {
  try {
    const response = await instance.post('api/auth/admin/login', {
      email,
      password,
    });

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

export const loginPatient = async (email, dni) => {
  try {
    const response = await instance.post('api/auth/patient/login', {
      email,
      dni: Number(dni),
    });

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};
