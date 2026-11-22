import { instance } from '../../shared/api/axiosInstance';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';

const URL = 'api/doctors';

export const getDoctors = async ({
  pageSize = 10,
  pageIndex = 1,
  name = '',
} = {}) => {
  try {
    const response = await instance.get(URL, {
      params: { pageSize, pageIndex, name: name || undefined },
    });

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

export const createDoctor = async (doctor) => {
  try {
    const response = await instance.post(URL, doctor);

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

export const deleteDoctor = async (id) => {
  try {
    await instance.delete(`${URL}/${id}`);

    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const getDoctorAvailabilities = async (doctorId) => {
  try {
    const response = await instance.get(`${URL}/${doctorId}/availabilities`);

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};
