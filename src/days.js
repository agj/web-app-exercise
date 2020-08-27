
export const dayNames = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
];
  
export const dayToIndex = (day) => {
  const parsed = parseInt(day);
  return !isNaN(parsed) && parsed >= 0 && parsed < dayNames.length
    ? parsed
    : NaN;
};
