import { instance } from '../../shared/api/axiosInstance';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';

const URL = 'api/appointments';

// POST /api/appointments
// body: { doctorId, availabilitySlotId, patient: { dni }, reason }
export const createAppointment = async (appointment) => {
  try {
    const response = await instance.post(URL, appointment);

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: getErrorMessage(error) };
  }
};

// GET /api/appointments/patient?dni=
// Respuesta: turnos activos (BOOKED y futuros) del paciente
// [{ id, date, startTime, doctorName, specialtyName, status }]
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

// DELETE /api/appointments/{id}  → cancela el turno (solo si está BOOKED)
export const cancelAppointment = async (id) => {
  try {
    await instance.delete(`${URL}/${id}`);

    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

// GET /api/appointments/search?specialtyId=&doctorId=&dni=&date=&pageSize=&pageIndex=
// Respuesta: { pageSize, pageIndex, total, data: [{ appointmentsId,
//   appointmentsStatus, patient: { dni, fullName },
//   doctor: { doctorId, name, specialty: { specialtyId, name } },
//   date, startTime }] }
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
      // Los filtros vacíos no se mandan (undefined)
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

// GET /api/appointments?date=YYYY-MM-DD&pageSize=&pageIndex=
// Respuesta: { pageSize, pageIndex, total, data: [...] } (turnos de ese día)
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
