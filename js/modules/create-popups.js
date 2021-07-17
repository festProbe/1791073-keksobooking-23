import { map, advertisementMarkerIcon } from './map.js';

const advertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const TYPES_OF_APARTAMENTS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createPopups = function (advertisements) {
  advertisements.forEach(({ author, location, offer }) => {
    const cardItem = advertisementTemplate.cloneNode(true);

    cardItem.querySelector('.popup__title').textContent = offer.title;

    cardItem.querySelector('.popup__text--address').textContent = offer.address;

    cardItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

    cardItem.querySelector('.popup__type').textContent = TYPES_OF_APARTAMENTS[offer.type];

    cardItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

    cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    if (offer.features) {
      const features = offer.features.map((item) => `popup__feature--${item}`);
      cardItem.querySelectorAll('.popup__feature').forEach((item) => {
        const feature = item.classList[1];
        if (!features.includes(feature)) {
          item.remove();
        }
      });
      if (Array.isArray(features) && features.length === 0) {
        cardItem.querySelectorAll('.popup__feature').classList.add('hidden');
      }
    }

    const description = cardItem.querySelector('.popup__description');
    description.textContent = offer.description;
    if (!offer.description) {
      description.classList.add('hidden');
    }

    const photoSet = cardItem.querySelector('.popup__photos');
    const photoItems = photoSet.querySelectorAll('.popup__photo');
    if (offer.photos) {
      const offerPhoto = offer.photos;
      for (const item of offerPhoto) {
        const photoItem = photoSet.querySelector('.popup__photo').cloneNode(true);
        photoItem.classList.add('popup__photo');
        photoItem.src = item;
        photoItem.alt = offer.type;
        photoSet.appendChild(photoItem);
      }
      photoItems[0].remove();
      if (offerPhoto === []) {
        photoSet.classList.add('hidden');
      }
    }

    cardItem.querySelector('.popup__avatar').src = author.avatar;
    const lat = location.lat;
    const lng = location.lng;
    const advertisementMarker = L.marker(
      {
        lat,
        lng,
      },
      {
        advertisementMarkerIcon,
      },
    );
    advertisementMarker.addTo(map);
    advertisementMarker.bindPopup(
      cardItem,
    );
  });
};

export { createPopups };
