import { randomInt, randomCoords, getRandomArrayElement, getRandomArray } from './utils.js';
import { store } from './store.js';

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
    type: getRandomArrayElement(store.TYPE_OF_LIVING_ACCOMODATION),
    rooms: randomInt(1, Number.MAX_SAFE_INTEGER),
    guests: randomInt(1, Number.MAX_SAFE_INTEGER),
    checkin: getRandomArrayElement(store.CHECK_IN_OUT_TIME),
    checkout: getRandomArrayElement(store.CHECK_IN_OUT_TIME),
    features: getRandomArray(store.FEATURES),
    description: 'Космополитический 5-звездочный отель Pullman Dubai Downtown расположен в районе Бизнес-Бэй, недалеко от небоскреба Бурдж-Халифа, торгового центра Dubai Mall и района Даунтаун-Дубай.',
    photos: getRandomArray(store.PHOTOS),
  };
  return { author, location, offer };
};

const createAdvertisements = () => new Array(store.COUNT_OF_ADVERTISEMENT)
  .fill(null).map(() => createAdvertisement());

export { createAdvertisements };

