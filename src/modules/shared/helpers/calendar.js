export const toDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const getWeekDays = (weekOffset) => {
  const today = new Date();
  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - mondayOffset + weekOffset * 7
  );

  return Array.from(
    { length: 6 },
    (_, i) =>
      new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i)
  );
};

export const formatLongDate = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number);

  return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatTime = (time) => time.slice(0, 5);

export const isFutureSlot = (slot) => {
  const [year, month, day] = slot.slotDate.slice(0, 10).split('-').map(Number);
  const [hours, minutes] = slot.startTime.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes) > new Date();
};

export const formatShortDate = (dateText) => {
  if (!dateText) {
    return '-';
  }

  const [year, month, day] = dateText.slice(0, 10).split('-').map(Number);

  return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatWeekdayDate = (dateText) => {
  const [year, month, day] = dateText.slice(0, 10).split('-').map(Number);

  return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

const DAY_NAMES = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

export const getDayName = (date) => DAY_NAMES[date.getDay()];
