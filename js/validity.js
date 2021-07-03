const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const advertisementTitleInput = document.querySelector('.ad-form__element > input');
const typeOfApartamentsSelect = document.querySelector('fieldset.ad-form__element > #type');
const typeOfApartamentsOptions = typeOfApartamentsSelect.querySelectorAll('#type > option');
const priceInput = document.querySelector('#price');

priceInput.min = 5000;

advertisementTitleInput.addEventListener('invalid', () => {
  if (advertisementTitleInput.validity.tooShort) {
    advertisementTitleInput.setCustomValidity('Слишком короткое название. Минимальная длина - 30 символов.');
  } else if (advertisementTitleInput.validity.tooLong) {
    advertisementTitleInput.setCustomValidity('Слишком длинное название. Максимальная длина - 100 символов.');
  } else if (advertisementTitleInput.validity.missingValue) {
    advertisementTitleInput.setCustomValidity('Необходимо ввести название объявления');
  }
  else {
    advertisementTitleInput.setCustomValidity('');
  }
});

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
      minPrice = 0;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
      break;
    case 'flat':
      minPrice = 1000;
      break;
    case 'hotel':
      minPrice = 3000;
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
