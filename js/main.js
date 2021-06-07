const TYPE_OF_LIVING_ACCOMODATION = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_IN_OUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const COUNT_OF_ADVERTISEMENT = 10;

// Функция взята из источника https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
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

const createAdvertisement = () => {
  const location = {
    lat: randomCoords(35.65, 35.7, 4),
    lng: randomCoords(139.7, 139.8, 4),
  };

  const getLocation = (coords) => `${coords.lat}, ${coords.lng}`;

  const author = {
    avatar: `img/avatars/user0${randomInt(1, 8)}.png`,
  };

  const offer = {
    title: 'Самые бронируемые апартаменты/квартиры в этом месяце',
    address: getLocation(location),
    price: randomInt(1, Number.MAX_SAFE_INTEGER),
    type: getRandomArrayElement(TYPE_OF_LIVING_ACCOMODATION),
    rooms: randomInt(1, Number.MAX_SAFE_INTEGER),
    guests: randomInt(1, Number.MAX_SAFE_INTEGER),
    checkin: getRandomArrayElement(CHECK_IN_OUT_TIME),
    checkout: getRandomArrayElement(CHECK_IN_OUT_TIME),
    features: getRandomArray(FEATURES),
    description: 'Космополитический 5-звездочный отель Pullman Dubai Downtown расположен в районе Бизнес-Бэй, недалеко от небоскреба Бурдж-Халифа, торгового центра Dubai Mall и района Даунтаун-Дубай.',
    photos: getRandomArray(PHOTOS),
  };
  return { author, location, offer };
};
const similarAdvertisements = new Array(COUNT_OF_ADVERTISEMENT).fill(null).map(() => createAdvertisement());

const zaglushka = function () {
  return similarAdvertisements;
};

zaglushka();
