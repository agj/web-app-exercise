import { range } from 'ramda';

const weekDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const today = (new Date()).getDay();

export const dayNames =
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
  return !isNaN(parsed) && parsed >= 0 && parsed < dayNames.length
    ? parsed
    : NaN;
};
