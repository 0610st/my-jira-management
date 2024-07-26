export const getAccumulatedSum = (arr: number[]) =>
  arr.reduce((acc: number[], curr) => {
    if (acc.length > 0) {
      acc.push(curr + acc[acc.length - 1]);
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

export const secondToHour = (second: number, digit = 2) => {
  const power = 10 ** digit;
  return Math.round((second / 3600) * power) / power;
};
