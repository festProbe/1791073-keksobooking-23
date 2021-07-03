const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const advertisementTitleInput = document.querySelector('.ad-form__element > input');
const typeOfApartamentsSelect = document.querySelector('fieldset.ad-form__element > #type');
const typeOfApartamentsOptions = typeOfApartamentsSelect.querySelectorAll('#type > option');
const priceInput = document.querySelector('#price');
const timeInSelect = document.querySelector('#timein');
const timeInValues = timeInSelect.querySelectorAll('#timein > option');
const timeOutSelect = document.querySelector('#timeout');
const timeOutValues = timeOutSelect.querySelectorAll('#timeout > option');

const PRICE_LIST = {
  house: 5000,
  bungalow: 0,
  flat: 3000,
  palace: 10000,
  hotel: 5000,
};
priceInput.min = PRICE_LIST.house;

advertisementTitleInput.addEventListener('input', () => {
  const titleLength = advertisementTitleInput.value.length;
  if (titleLength < MIN_TITLE_LENGTH && titleLength > 0) {
    advertisementTitleInput.setCustomValidity(`Минимальная длина заголовка - ${MIN_TITLE_LENGTH} символов.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    advertisementTitleInput.setCustomValidity(`Максимальная длина заголовка - ${MAX_TITLE_LENGTH} символов.`);
  } else {
    advertisementTitleInput.setCustomValidity('');
  }

  advertisementTitleInput.reportValidity();
});

typeOfApartamentsSelect.addEventListener('change', () => {
  let currentType;
  let minPrice;
  for (let i = 0; i < typeOfApartamentsOptions.length; i++) {
    if (typeOfApartamentsOptions[i].selected) {
      currentType = typeOfApartamentsOptions[i].value;
    }
  }
  switch (currentType) {
    case 'bungalow':
      minPrice = PRICE_LIST.bungalow;
      break;
    case 'house':
      minPrice = PRICE_LIST.house;
      break;
    case 'palace':
      minPrice = PRICE_LIST.palace;
      break;
    case 'flat':
      minPrice = PRICE_LIST.flat;
      break;
    case 'hotel':
      minPrice = PRICE_LIST.hotel;
      break;
    default:
      minPrice = PRICE_LIST.house;
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
  for (const timeIn of timeInValues) {
    if (timeIn.selected) {
      for (const timeOut of timeOutValues) {
        if (timeIn.value === timeOut.value) {
          timeOut.selected = true;
        }
      }
    }
  }
});

timeOutSelect.addEventListener('change', () => {
  for (const timeOut of timeOutValues) {
    if (timeOut.selected) {
      for (const timeIn of timeInValues) {
        if (timeOut.value === timeIn.value) {
          timeIn.selected = true;
        }
      }
    }
  }
});
