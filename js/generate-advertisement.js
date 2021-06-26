const advertisementItem = document.querySelector('#card')
  .content
  .querySelector('.popup');

const TYPES_OF_APARTAMENTS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const generateAdvertisement = function (advertisement) {
  const cardItem = advertisementItem.cloneNode(true);
  // popup_title
  cardItem.querySelector('.popup__title').textContent = advertisement.offer.title;
  // popup_text--adress
  cardItem.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  // popup__text--price
  cardItem.querySelector('.popup__text--price').textContent = `${advertisement.offer.price} ₽/ночь`;
  //.popup__type

  // eslint-disable-next-line id-length
  for (let i = 0; i < Object.keys(TYPES_OF_APARTAMENTS).length; i++){
    if (advertisement.offer.type === Object.keys(TYPES_OF_APARTAMENTS)[i]) {
      cardItem.querySelector('.popup__type').textContent = Object.values(TYPES_OF_APARTAMENTS)[i];
    }
  }
  // popup__text--capacity
  cardItem.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  // popup__text--time
  cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  // popup__features
  const modifires = advertisement.offer.features.map((features) => `popup__feature--${features}`);
  cardItem.querySelectorAll('.popup__feature').forEach((item) => {
    const modifire = item.classList[1];
    if (!modifires.includes(modifire)){
      item.remove();
    }
  });
  // popup__description
  const description = cardItem.querySelector('.popup__description');
  description.textContent = advertisement.offer.description;
  if (advertisement.offer.description === null) {
    description.classList.add('hidden');
  }
  // popup__photos
  const photoSet = cardItem.querySelector('.popup__photos');
  photoSet.querySelector('.popup__photo').remove();
  const offerPhoto = advertisement.offer.photos;
  for (const item in offerPhoto) {
    const photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = offerPhoto[item];
    photoItem.alt = advertisement.offer.type;
    photoSet.appendChild(photoItem);
  }
  // popup__avatar
  cardItem.querySelector('.popup__avatar').src = advertisement.author.avatar;


  document.querySelector('#map-canvas').appendChild(cardItem);
  return cardItem;
};

export {generateAdvertisement};
/*
Заведите модуль, который будет отвечать за генерацию разметки похожих элементов.

На основе временных данных для разработки и шаблона #card создайте DOM-элементы, соответствующие объявлениям, и заполните их данными:

Выведите заголовок объявления offer.title в заголовок .popup__title.
Выведите адрес offer.address в блок .popup__text--address.
Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
Квартира для flat
Бунгало для bungalow
Дом для house
Дворец для palace
Отель для hotel
Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
В список .popup__features выведите все доступные удобства в объявлении.
В блок .popup__description выведите описание объекта недвижимости offer.description.
В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.

Подключите модуль в проект.
*/
