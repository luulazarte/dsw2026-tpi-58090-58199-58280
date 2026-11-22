import { instance } from '../../shared/api/axiosInstance';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';

const URL = 'api/appointments';

export const createAppointment = async (appointment) => {
  try {
    const response = await instance.post(URL, appointment);

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

export const getPatientAppointments = async (dni) => {
  try {
    const response = await instance.get(`${URL}/patient`, {
      params: { dni },
    });

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

export const cancelAppointment = async (id) => {
  try {
    await instance.delete(`${URL}/${id}`);

    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const searchAppointments = async ({
  specialtyId,
  doctorId,
  dni,
  date,
  pageSize = 10,
  pageIndex = 1,
}) => {
  try {
    const response = await instance.get(`${URL}/search`, {
      params: {
        specialtyId: specialtyId || undefined,
        doctorId: doctorId || undefined,
        dni: dni || undefined,
        date: date || undefined,
        pageSize,
        pageIndex,
      },
    });

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

export const getAppointmentsByDate = async (date, pageSize = 100) => {
  try {
    const response = await instance.get(URL, {
      params: { date, pageSize, pageIndex: 1 },
    });

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};
