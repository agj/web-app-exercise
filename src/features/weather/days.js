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

const toSlug = (string) => slugify(string, { lower: true });

export const slugToTime = (slug) => {
  const weekDay = weekDays.findIndex((dayName) => toSlug(dayName) === slug);
  if (weekDay === -1) {
    return undefined;
  }
  const day = new Date();
  while (day.getDay() !== weekDay) {
    day.setDate(day.getDate() + 1);
  }
  return day.getTime();
};

export const timeToSlug = (time) => time ? toSlug(dayName(time)) : '';

export const datesEqual = (timeA, timeB) => timeA && timeB && (new Date(timeA)).toDateString() === (new Date(timeB)).toDateString();

export const dayName = (time) =>
  weekDays[(new Date(time)).getDay()];
