import { range, mathMod } from 'ramda';

const weekDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const dayNames = (today) =>
  range(0, 5)
  .map((i) => {
    const index = (today + i) % weekDays.length;
    const dayName = weekDays[index];
    return i === 0
      ? dayName + ' (hoy)'
      : dayName;
  });

export const dayToIndex = (day) => {
  const parsed = parseInt(day);
  return !isNaN(parsed) && parsed >= 0 && parsed < dayNames(0).length
    ? parsed
    : NaN;
};

export const weekDayToIndex = (today, weekDay) => mathMod(weekDay - today, weekDays.length);
