// Функция взята из источника https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const randomInt = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max >= 0) {
    if (min < max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return alert('Значение «до» меньше, чем значение «от», или равное ему');
  }
  return alert('Диапазон значений может быть только положительный, включая ноль');
};

randomInt(3, 15);

const randomCoords = function generateCoords(min, max, decimalPoint) {
  if (min >= 0 && max >= 0) {
    if (min < max) {
      return (Math.random() * (max - min) + min).toFixed(decimalPoint);
    }
    return alert('Значение «до» меньше, чем значение «от», или равное ему');
  }
  return alert('Диапазон значений может быть только положительный, включая ноль');
};

randomCoords(1.1, 1.2, 3);
