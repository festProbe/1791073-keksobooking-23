const apartamentSelect = document.querySelector('#housing-type');
const apartamentTypes = apartamentSelect.querySelectorAll('option');
const priceSelect = document.querySelector('#housing-price');
const priceIntervalOptions = priceSelect.querySelectorAll('option');
const roomsSelect = document.querySelector('#housing-rooms');
const roomNumberOptions = roomsSelect.querySelectorAll('option');
const guestsSelect = document.querySelector('#housing-guests');
const guestsNumberOptions = guestsSelect.querySelectorAll('option');
const featuresFieldset = document.querySelector('#housing-features');
const featuresList = featuresFieldset.querySelectorAll('[name="features"]');

const getFeaturesRank = (advertisement) => {
  let rank = 0;
  const features = advertisement.offer.features;
  if (Array.isArray(features)) {
    for (const checkedFeature of featuresList) {
      if (checkedFeature.checked) {
        if (features.includes(checkedFeature.value)) {
          rank += 1;
        }
      }
    }
  }
  return rank;
};

const compareFeatures = (advertisementA, advertisementB) => {
  const rankA = getFeaturesRank(advertisementA);
  const rankB = getFeaturesRank(advertisementB);

  return rankB - rankA;
};

const isEqualApartaments = (advertisement) => {
  if (apartamentSelect.value === advertisement.offer.type || apartamentSelect.value === 'any') {
    return true;
  }
  return false;
};

const isInPriceInterval = (advertisement) => {
  switch (priceSelect.value) {
    case 'any':
      return true;
    case 'middle':
      return advertisement.offer.price >= 10000 && advertisement.offer.price <= 50000;
    case 'low':
      return advertisement.offer.price < 10000;
    case 'high':
      return advertisement.offer.price > 50000;
    default:
      return false;
  }
};

const isEquailRoomNumber = (advertisement) => {
  if (roomsSelect.value === advertisement.offer.rooms.toString() || roomsSelect.value === 'any') {
    return true;
  }
  return false;
};

const isEqualGuestsNumber = (advertisement) => {
  if (guestsSelect.value === advertisement.offer.guests.toString() || guestsSelect.value === 'any') {
    return true;
  }
  return false;
};

const setApartamentType = (cb) => {
  apartamentSelect.addEventListener('change', () => {
    for (let i = 0; i < apartamentTypes.length; i++) {
      if (apartamentTypes[i].selected) {
        cb();
      }
    }
  });
};

const setPriceInterval = (cb) => {
  priceSelect.addEventListener('change', () => {
    for (let i = 0; i < priceIntervalOptions.length; i++) {
      if (priceIntervalOptions[i].selected) {
        cb();
      }
    }
  });
};

const setRoomNunber = (cb) => {
  roomsSelect.addEventListener('change', () => {
    for (let i = 0; i < roomNumberOptions.length; i++) {
      if (roomNumberOptions[i].selected) {
        cb();
      }
    }
  });
};

const setGuestsNumber = (cb) => {
  guestsSelect.addEventListener('change', () => {
    for (let i = 0; i < guestsNumberOptions.length; i++) {
      if (guestsNumberOptions[i].selected) {
        cb();
      }
    }
  });
};

const setFutures = (cb) => {
  for (const feature of featuresList) {
    feature.addEventListener('click', () => {
      cb();
    });
  }
};


export {
  setApartamentType,
  setPriceInterval,
  setRoomNunber,
  setGuestsNumber,
  setFutures,
  isEqualApartaments,
  isInPriceInterval,
  isEquailRoomNumber,
  isEqualGuestsNumber,
  compareFeatures
};
