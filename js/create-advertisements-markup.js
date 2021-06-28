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

const createAdvertisementsMarkup = function (advertisement) {
  const cardItem = advertisementTemplate.cloneNode(true);

  cardItem.querySelector('.popup__title').textContent = advertisement.offer.title;

  cardItem.querySelector('.popup__text--address').textContent = advertisement.offer.address;

  cardItem.querySelector('.popup__text--price').textContent = `${advertisement.offer.price} ₽/ночь`;

  cardItem.querySelector('.popup__type').textContent = TYPES_OF_APARTAMENTS[advertisement.offer.type];

  cardItem.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;

  cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;

  const features = advertisement.offer.features.map((item) => `popup__feature--${item}`);
  cardItem.querySelectorAll('.popup__feature').forEach((item) => {
    const feature = item.classList[1];
    if (!features.includes(feature)) {
      item.remove();
    }
  });
  if (Array.isArray(features) && features.length === 0) {
    cardItem.querySelectorAll('.popup__feature').classList.add('hidden');
  }

  const description = cardItem.querySelector('.popup__description');
  description.textContent = advertisement.offer.description;
  if (!advertisement.offer.description) {
    description.classList.add('hidden');
  }

  const photoSet = cardItem.querySelector('.popup__photos');
  const photoItems = photoSet.querySelectorAll('.popup__photo');
  const offerPhoto = advertisement.offer.photos;
  for (const item of offerPhoto) {
    const photoItem = photoSet.querySelector('.popup__photo').cloneNode(true);
    photoItem.classList.add('popup__photo');
    photoItem.src = item;
    photoItem.alt = advertisement.offer.type;
    photoSet.appendChild(photoItem);
  }
  photoItems[0].remove();
  if (offerPhoto === []) {
    photoSet.classList.add('hidden');
  }

  cardItem.querySelector('.popup__avatar').src = advertisement.author.avatar;

  return cardItem;
};

export { createAdvertisementsMarkup };
