const TitleLength = {
  MIN_TITLE_LENGTH: 30,
  MAX_TITLE_LENGTH: 100,
};
const MinPrice = {
  HOUSE_MIN_PRIC: 5000,
  BUNGALOW_MIN_PRICE: 0,
  FLAT_MIN_PRICE: 3000,
  PALACE_MIN_PRICE: 10000,
  HOTEL_MIN_PRICE: 5000,
};

const advertisementTitleInput = document.querySelector('.ad-form__element > input');
const typeOfApartamentsSelect = document.querySelector('#type');
const typeOfApartamentsOptions = typeOfApartamentsSelect.querySelectorAll('option');
const priceInput = document.querySelector('#price');
const timeInSelect = document.querySelector('#timein');
const timeInValues = timeInSelect.querySelectorAll('option');
const timeOutSelect = document.querySelector('#timeout');
const timeOutValues = timeOutSelect.querySelectorAll('option');
const roomsNumber = document.querySelector('#room_number');
const roomsNumberValues = roomsNumber.querySelectorAll('option');
const capacitySelect = document.querySelector('#capacity');
const capacityValues = capacitySelect.querySelectorAll('option');

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
  let currentType;
  let minPrice;
  for (let i = 0; i < typeOfApartamentsOptions.length; i++) {
    if (typeOfApartamentsOptions[i].selected) {
      currentType = typeOfApartamentsOptions[i].value;
    }
  }
  switch (currentType) {
    case 'bungalow':
      minPrice = MinPrice.BUNGALOW_MIN_PRICE;
      break;
    case 'house':
      minPrice = MinPrice.HOUSE_MIN_PRICE;
      break;
    case 'palace':
      minPrice = MinPrice.PALACE_MIN_PRICE;
      break;
    case 'flat':
      minPrice = MinPrice.FLAT_MIN_PRICE;
      break;
    case 'hotel':
      minPrice = MinPrice.HOTEL_MIN_PRICE;
      break;
    default:
      minPrice = MinPrice.HOUSE_MIN_PRICE;
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

roomsNumber.addEventListener('change', () => {
  for (const item of capacityValues) {
    item.disabled = true;
  }
  for (const room of roomsNumberValues) {
    if (room.selected) {
      switch (room.value) {
        case '1':
          for (const capacity of capacityValues) {
            if (capacity.value === '1') {
              capacity.disabled = false;
              capacity.selected = true;
            }
          }
          break;
        case '2':
          for (const capacity of capacityValues) {
            if (capacity.value === '1') {
              capacity.disabled = false;
              capacity.selected = true;
            }
            if (capacity.value === '2') {
              capacity.disabled = false;
            }
          }
          break;
        case '3':
          for (const capacity of capacityValues) {
            if (capacity.value === '1') {
              capacity.disabled = false;
              capacity.selected = true;
            }
            if (capacity.value === '2' || capacity.value === '3') {
              capacity.disabled = false;
            }
          }
          break;
        case '100':
          for (const capacity of capacityValues) {
            if (capacity.value === '0') {
              capacity.disabled = false;
              capacity.selected = true;
            }
          }
          break;
      }
    }
  }
});
