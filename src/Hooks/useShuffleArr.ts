export const useShuffleArr = (arr: any) => {
  const shuffleledArr = arr.sort(() => Math.random() - 0.5);
  const slicedArr = shuffleledArr.slice(0, 5);
  return slicedArr;
};
