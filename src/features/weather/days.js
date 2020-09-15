import { range, mathMod } from 'ramda';
import slugify from 'slugify';

const weekDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const slugToTime = (slug) => {
  const weekDay = weekDays.findIndex((dayName) => slugify(dayName) === slug);
  if (weekDay === -1) {
    return undefined;
  }
  const day = new Date();
  while (day.getDay() !== weekDay) {
    day.setDate(day.getDate() + 1);
    break;
  }
  return day.getTime();
};

export const timeToSlug = (time) => time ? slugify(dayName(time)) : '';

export const datesEqual = (timeA, timeB) => timeA && timeB && (new Date(timeA)).toDateString() === (new Date(timeB)).toDateString();

export const dayName = (time) =>
  weekDays[(new Date(time)).getDay()];

// export const dayNames = (today) =>
//   range(0, 5)
//   .map((i) => {
//     const index = (today + i) % weekDays.length;
//     const dayName = weekDays[index];
//     return i === 0
//       ? dayName + ' (hoy)'
//       : dayName;
//   });

// export const dayToIndex = (day) => {
//   const parsed = parseInt(day);
//   return !isNaN(parsed) && parsed >= 0 && parsed < dayNames(0).length
//     ? parsed
//     : NaN;
// };

// export const weekDayToIndex = (today, weekDay) => mathMod(weekDay - today, weekDays.length);
