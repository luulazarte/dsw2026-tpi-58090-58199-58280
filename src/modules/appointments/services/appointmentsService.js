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