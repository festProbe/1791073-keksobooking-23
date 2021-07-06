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
const roomsNumber = document.querySelector('#room_number');
const roomsNumberValues = roomsNumber.querySelectorAll('#room_number > option');
const capacitySelect = document.querySelector('#capacity');
const capacityValues = capacitySelect.querySelectorAll('#capacity > option');

for (const item of capacityValues) {
  item.disabled = true;
  if (item.value === '1') {
    item.disabled = false;
    item.selected = true;
  }
}

const HOUSE = 5000,
  BUNGALOW = 0,
  FLAT = 3000,
  PALACE = 10000,
  HOTEL = 5000;

priceInput.min = HOUSE;

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
      minPrice = BUNGALOW;
      break;
    case 'house':
      minPrice = HOUSE;
      break;
    case 'palace':
      minPrice = PALACE;
      break;
    case 'flat':
      minPrice = FLAT;
      break;
    case 'hotel':
      minPrice = HOTEL;
      break;
    default:
      minPrice = HOUSE;
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
