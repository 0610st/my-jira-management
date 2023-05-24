export const getAccumulatedSum = (arr: number[]) =>
  arr.reduce((acc: number[], curr) => {
    if (acc.length > 0) {
      acc.push(curr + acc[acc.length - 1]);
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
