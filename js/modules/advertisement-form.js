import { showSuccessMessage, showErrorMessage } from './utils.js';
import { sendData } from './fetch.js';
import { setDefaultPosition } from './map.js';

const TitleLength = {
  MIN_TITLE_LENGTH: 30,
  MAX_TITLE_LENGTH: 100,
};
const TypeOfApartaments = {
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
  FLAT: 'flat',
  PALACE: 'palace',
  HOTEL: 'hotel',
};
const TypeOfRooms = {
  ONE_ROOM: '1',
  TWO_ROOMS: '2',
  THREE_ROOMS: '3',
  HUNDRED_ROOMS: '100',
};
const TypesOfCapacity = {
  ONE_GUEST: '1',
  TWO_GUESTS: '2',
  THREE_GUESTS: '3',
  NOT_FOR_GUEST: '0',
};
const MinPrice = {
  HOUSE_MIN_PRICE: 5000,
  BUNGALOW_MIN_PRICE: 0,
  FLAT_MIN_PRICE: 1000,
  PALACE_MIN_PRICE: 10000,
  HOTEL_MIN_PRICE: 3000,
};
const DefaultSettings = {
  DEFAULT_IN_OUT_TIME: '12:00',
  DEFAULT_TITLE: '',
  DEFAULT_PRICE: '',
  DEFAULT_DESCRIPTION: '',
  DEFAULT_CAPACITY: '1',
  DEFAULT_ROOMS: '1',
  DEFAULT_TYPE_OF_APARTAMENT: 'flat',
  DEFAULT_MIN_PRICE: 1000,

  DEFAULT_APARTAMENT_FILTER: 'any',
  DEFAULT_PRICE_FILTER: 'any',
  DEFAULT_ROOMS_FILTER: 'any',
  DEFAULT_GUESTS_FILTER: 'any',
};

const advertisementTitleInput = document.querySelector('.ad-form__element > input');
const typeOfApartamentsSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');
const roomsNumber = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const capacityValues = capacitySelect.querySelectorAll('option');
const featureOptions = document.querySelectorAll('.features > input');
const resetButton = document.querySelector('.ad-form__reset');
const description = document.querySelector('#description');
const apartamentSelect = document.querySelector('#housing-type');
const priceSelect = document.querySelector('#housing-price');
const roomsSelect = document.querySelector('#housing-rooms');
const guestsSelect = document.querySelector('#housing-guests');
const featuresList = document.querySelectorAll('.map__checkbox');

const setDefaultFormSettings = () => {
  advertisementTitleInput.value = DefaultSettings.DEFAULT_TITLE;
  priceInput.value = DefaultSettings.DEFAULT_PRICE;
  priceInput.min = DefaultSettings.DEFAULT_MIN_PRICE;
  priceInput.placeholder = DefaultSettings.DEFAULT_MIN_PRICE;
  description.value = DefaultSettings.DEFAULT_DESCRIPTION;
  typeOfApartamentsSelect.value = DefaultSettings.DEFAULT_TYPE_OF_APARTAMENT;
  roomsNumber.value = DefaultSettings.DEFAULT_ROOMS;
  timeInSelect.value = DefaultSettings.DEFAULT_IN_OUT_TIME;
  capacitySelect.value = DefaultSettings.DEFAULT_CAPACITY;
  for (const item of capacityValues) {
    item.disabled = true;
    if (item.value === DefaultSettings.DEFAULT_CAPACITY) {
      item.disabled = false;
    }
  }
  for (const option of featureOptions) {
    option.checked = false;
  }

  apartamentSelect.value = DefaultSettings.DEFAULT_APARTAMENT_FILTER;
  priceSelect.value = DefaultSettings.DEFAULT_PRICE_FILTER;
  roomsSelect.value = DefaultSettings.DEFAULT_ROOMS_FILTER;
  guestsSelect.value = DefaultSettings.DEFAULT_GUESTS_FILTER;
  for (const feature of featuresList) {
    feature.checked = false;
  }
};

advertisementTitleInput.addEventListener('input', () => {
  const titleLength = advertisementTitleInput.value.length;
  if (titleLength < TitleLength.MIN_TITLE_LENGTH && titleLength > 0) {
    advertisementTitleInput.setCustomValidity(`Минимальная длина заголовка - ${TitleLength.MIN_TITLE_LENGTH} символов.`);
  } else if (titleLength > TitleLength.MAX_TITLE_LENGTH) {
    advertisementTitleInput.setCustomValidity(`Максимальная длина заголовка - ${TitleLength.MAX_TITLE_LENGTH} символов.`);
  } else {
    advertisementTitleInput.setCustomValidity('');
  }

  advertisementTitleInput.reportValidity();
});

typeOfApartamentsSelect.addEventListener('change', () => {
  let minPrice;
  switch (typeOfApartamentsSelect.value) {
    case TypeOfApartaments.BUNGALOW:
      minPrice = MinPrice.BUNGALOW_MIN_PRICE;
      break;
    case TypeOfApartaments.HOUSE:
      minPrice = MinPrice.HOUSE_MIN_PRICE;
      break;
    case TypeOfApartaments.PALACE:
      minPrice = MinPrice.PALACE_MIN_PRICE;
      break;
    case TypeOfApartaments.FLAT:
      minPrice = MinPrice.FLAT_MIN_PRICE;
      break;
    case TypeOfApartaments.HOTEL:
      minPrice = MinPrice.HOTEL_MIN_PRICE;
      break;
    default:
      minPrice = DefaultSettings.DEFAULT_MIN_PRICE;
      break;
  }
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
});

priceInput.addEventListener('input', () => {
  if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(`Минимальная цена - ${priceInput.min} ₽/ночь`);
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity(`Максимальная цена - ${priceInput.max} ₽/ночь`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

timeInSelect.addEventListener('change', () => {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', () => {
  timeInSelect.value = timeOutSelect.value;
});

roomsNumber.addEventListener('change', () => {
  for (const item of capacityValues) {
    item.disabled = true;
  }
  switch (roomsNumber.value) {
    case TypeOfRooms.ONE_ROOM:
      for (const capacity of capacityValues) {
        if (capacity.value === TypesOfCapacity.ONE_GUEST) {
          capacity.disabled = false;
          capacity.selected = true;
        }
      }
      break;
    case TypeOfRooms.TWO_ROOMS:
      for (const capacity of capacityValues) {
        if (capacity.value === TypesOfCapacity.ONE_GUEST || capacity.value === TypesOfCapacity.TWO_GUESTS) {
          capacity.disabled = false;
          capacitySelect.value = TypesOfCapacity.ONE_GUEST;
        }
      }
      break;
    case TypeOfRooms.THREE_ROOMS:
      for (const capacity of capacityValues) {
        if (capacity.value === TypesOfCapacity.ONE_GUEST || capacity.value === TypesOfCapacity.TWO_GUESTS || capacity.value === TypesOfCapacity.THREE_GUESTS) {
          capacity.disabled = false;
          capacitySelect.value = TypesOfCapacity.ONE_GUEST;
        }
      }
      break;
    case TypeOfRooms.HUNDRED_ROOMS:
      for (const capacity of capacityValues) {
        if (capacity.value === TypesOfCapacity.NOT_FOR_GUEST) {
          capacity.disabled = false;
          capacity.selected = true;
        }
      }
      break;
  }
});

const form = document.querySelector('.ad-form');
const sendAdvertisement = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => {
        onSuccess();
        showSuccessMessage();
      },
      () => {
        showErrorMessage();
      },
      new FormData(evt.target),
    );
  });
};

const clearForm = () => {
  setDefaultFormSettings();
  setDefaultPosition();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

export { sendAdvertisement, clearForm };
