import { useState } from 'react';
import { saveAvailability } from '../services/availabilitiesService';

// Guarda los días y horarios de atención de un médico.
// Devuelve true si se guardó.
export default function useSaveAvailability() {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const save = async ({ doctorId, days }) => {
    setError('');
    setSuccessMessage('');

    // Solo mandamos los días que tienen el interruptor en "Activo"
    const activeDays = days
      .filter((item) => item.enabled)
      .map(({ day, startTime, endTime }) => ({ day, startTime, endTime }));

    if (activeDays.length === 0) {
      setError('Activá al menos un día de atención.');

      return false;
    }

    const { data, error: requestError } = await saveAvailability({
      doctorId,
      days: activeDays,
    });

    if (requestError) {
      setError(requestError);

      return false;
    }

    setSuccessMessage(
      `Disponibilidad guardada: se generaron ${data.length} turnos de 30 minutos para el resto del mes.`
    );

    return true;
  };

  return { save, error, successMessage };
}
