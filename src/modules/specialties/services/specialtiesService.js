import { instance } from '../../shared/api/axiosInstance';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';

const URL = 'api/specialties';


export const getSpecialties = async ({ pageSize = 10, pageIndex = 1, name = '' } = {}) => {
    try {
        const response = await instance.get(URL, {
            params: { pageSize, pageIndex, name: name || undefined },
        });

        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: getErrorMessage(error) };
    }
};


export const createSpecialty = async (specialty) => {
    try {
        const response = await instance.post(URL, specialty);

        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: getErrorMessage(error) };
    }
};


export const deleteSpecialty = async (id) => {
    try {
        await instance.delete(`${URL}/${id}`);

        return { error: null };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
};
