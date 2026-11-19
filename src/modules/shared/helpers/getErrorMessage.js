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
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (!error?.response || (status >= 500 && !data?.errorCode)) {
    return 'No se pudo conectar con el servidor.';
  }

  if (data?.errorCode === 'VALIDATION_ERROR' && data?.message) {
    return data.message;
  }

  return (
    messagesByCode[data?.errorCode] ||
    messagesByStatus[status] ||
    data?.message ||
    'Ocurrió un error inesperado. Intentá nuevamente.'
  );
};
