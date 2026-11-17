import { instance } from '../../shared/api/axiosInstance';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';

// POST /api/auth/admin/login → { token, role }
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

// POST /api/auth/patient/login → { token, role }
// Si el paciente no existe, el backend lo registra automáticamente (RN06)
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