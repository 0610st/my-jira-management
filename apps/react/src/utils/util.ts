export const getAccumulatedSum = (arr: number[]) =>
  arr.reduce((acc: number[], curr) => {
    if (acc.length > 0) {
      acc.push(curr + acc[acc.length - 1]);
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

export const secondToHour = (second: number) => {
  return Math.round((second / 3600) * 100) / 100;
};
