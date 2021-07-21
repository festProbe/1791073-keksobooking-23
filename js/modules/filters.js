const apartamentSelect = document.querySelector('#housing-type');
const apartamentTypes = apartamentSelect.querySelectorAll('option');

const isEqualApartaments = (advertisement) => {
  if (apartamentSelect.value === advertisement.offer.type || apartamentSelect.value === 'any') {
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

export { setApartamentType, isEqualApartaments };
