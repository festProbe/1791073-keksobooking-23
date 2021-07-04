const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max >= 0) {
    if (min < max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    throw new Error('Значение «до» меньше, чем значение «от», или равное ему');
  }
  throw new Error('Диапазон значений может быть только положительный, включая ноль');
};

const randomCoords = (min, max, decimalPoint) => {
  if (min >= 0 && max >= 0) {
    if (min < max) {
      return (Math.random() * (max - min) + min).toFixed(decimalPoint);
    }
    throw new Error('Значение «до» меньше, чем значение «от», или равное ему');
  }
  throw new Error('Диапазон значений может быть только положительный, включая ноль');
};

const getRandomArrayElement = function (array) {
  return array[randomInt(0, array.length - 1)];
};

const getRandomArray = (array) => {
  const randomArray = [];
  for (let counter = 0; counter < array.length; counter++) {
    if (Math.random() > 0.5) {
      randomArray.push(array[counter]);
    }
  }
  return randomArray;
};

export { randomInt, randomCoords, getRandomArrayElement, getRandomArray };
