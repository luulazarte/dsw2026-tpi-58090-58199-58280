const messagesByCode = {
    AUTHENTICATION_FAILED: 'Email y/o contraseña incorrectos.',
    AUTHORIZATION_FAILED: 'No tenés permisos para realizar esta acción.',
    ENTITY_NOTFOUND: 'El registro solicitado no existe.',
    APPOINTMENT_CONFLICT:
        'Ese turno acaba de ser reservado por otra persona. Elegí otro horario.',
    REGISTER_USER_CONFLICT: 'No se pudo registrar el usuario.',
    UNHANDLED_ERROR: 'Ocurrió un error inesperado. Intentá nuevamente.',
};

const messagesByStatus = {
    401: 'Tu sesión expiró. Volvé a iniciar sesión.',
    403: 'No tenés permisos para realizar esta acción.',
    429: 'Hiciste demasiados intentos. Esperá un minuto y volvé a probar.',
};

export const getErrorMessage = (error) => {
    // Sin respuesta: el backend está apagado o no hay conexión
    if (!error?.response) {
        return 'No se pudo conectar con el servidor. Verificá que el backend esté levantado.';
    }

    const { status, data } = error.response;

    if (data?.errorCode === 'VALIDATION_ERROR' && data?.message) {
        // Los mensajes de validación del backend ya están en español
        return data.message;
    }

    return (
        messagesByCode[data?.errorCode] ||
        messagesByStatus[status] ||
        data?.message ||
        'Ocurrió un error inesperado. Intentá nuevamente.'
    );
};