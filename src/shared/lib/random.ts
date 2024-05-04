export const getRandomInt = (min: number = 1, max: number = 100000, round = true): number => {
  min = round ? Math.ceil(min) : min;
  max = round ? Math.floor(max) : max;
  const rand = Math.random() * (max - min + 1);
  const res = round ? Math.floor(rand) : rand;

  return +(res + min).toFixed(2);
};

export const getRandomFloat = (min: number = 1, max: number = 100000): number => {
  return getRandomInt(min, max) + getRandomInt(0.01, 0.99, false);
};

export const getRandomBoolean = (rate: number = 50): boolean => {
  return Math.random() < rate / 100;
};
