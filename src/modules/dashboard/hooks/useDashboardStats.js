import { useEffect, useState } from 'react';
import { getDoctors } from '../../doctors/services/doctorsService';
import { getSpecialties } from '../../specialties/services/specialtiesService';
import { getAppointmentsByDate } from '../../appointments/services/appointmentsService';
import { toDateKey } from '../../shared/helpers/calendar';

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    doctors: '-',
    specialties: '-',
    todayAppointments: '-',
  });

  useEffect(() => {
    const loadStats = async () => {
      const [doctorsResult, specialtiesResult, appointmentsResult] =
        await Promise.all([
          getDoctors({ pageSize: 1 }),
          getSpecialties({ pageSize: 1 }),
          getAppointmentsByDate(toDateKey(new Date())),
        ]);

      const bookedToday = appointmentsResult.data?.data?.filter(
        (appt) => appt.appointmentsStatus === 'BOOKED'
      ).length;

      setStats({
        doctors: doctorsResult.data?.total ?? '-',
        specialties: specialtiesResult.data?.total ?? '-',
        todayAppointments: bookedToday ?? '-',
      });
    };

    loadStats();
  }, []);

  return stats;
}
