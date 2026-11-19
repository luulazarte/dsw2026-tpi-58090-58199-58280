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