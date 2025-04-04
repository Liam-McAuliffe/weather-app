export const updateTemp = (temp, unit) => {
  // If unit is Fahrenheit, return the original temperature (rounded).
  if (unit === 'F°') return Math.round(temp);
  // Otherwise, convert to Celsius and round the result.
  if (unit === 'C°') return Math.round(((temp - 32) * 5) / 9);
};
