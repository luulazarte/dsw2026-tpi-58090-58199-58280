import { useState } from 'react';
import { getWeekDays } from '../../shared/helpers/calendar';

export default function useWeekNavigator() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [mobileDayIndex, setMobileDayIndex] = useState(0);

  const weekDays = getWeekDays(weekOffset);
  const weekLabel = `${weekDays[0].getDate()} al ${weekDays[5].getDate()} de ${weekDays[5].toLocaleDateString('es-AR', { month: 'long' })}`;

  const changeWeek = (step) => {
    setWeekOffset((current) => current + step);
    setMobileDayIndex(0);
  };

  const resetWeek = () => {
    setWeekOffset(0);
    setMobileDayIndex(0);
  };

  return {
    weekDays,
    weekLabel,
    weekOffset,
    changeWeek,
    resetWeek,
    mobileDay: weekDays[mobileDayIndex],
    mobileDayIndex,
    setMobileDayIndex,
  };
}
