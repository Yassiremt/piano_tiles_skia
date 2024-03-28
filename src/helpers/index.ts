export const generateTiles = (length: number): number[] => {
  const randomArray: number[] = [];
  let lastNumber: number | undefined;

  for (let i = 0; i < length; i++) {
    let randomNumber: number;
    do {
      randomNumber = Math.floor(Math.random() * 4);
    } while (randomNumber === lastNumber);

    randomArray.push(randomNumber);
    lastNumber = randomNumber;
  }

  return randomArray;
};
