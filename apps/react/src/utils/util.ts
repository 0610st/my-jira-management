export const getAccumulatedSum = (arr: number[]) => {
  return arr.reduce((acc: number[], curr) => {
    if (acc.length > 0) {
      curr += acc[acc.length - 1];
    }
    acc.push(curr);
    return acc;
  }, []);
};