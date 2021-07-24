const advertisementsForm = document.querySelector('.ad-form');
const advertisementsFormFieldsets = advertisementsForm.querySelectorAll('.ad-form > fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormFieldsets = mapFiltersForm.querySelectorAll('.map__filters > fieldset');
const mapFiltersFormSelects = mapFiltersForm.querySelectorAll('.map__filters > select');
const formFeatures = document.querySelectorAll('.features__checkbox');
const mapFeatures = document.querySelectorAll('.map__features > input');

const setFormActivity = () => {
  advertisementsForm.classList.remove('ad-form--disabled');
  for (const item of advertisementsFormFieldsets) {
    item.disabled = false;
  }
  mapFiltersForm.classList.remove('map__filters--disabled');
  for (const item of mapFiltersFormFieldsets) {
    item.disabled = false;
  }
  for (const item of mapFiltersFormSelects) {
    item.disabled = false;
  }
  for (const item of formFeatures) {
    item.disabled = false;
  }
  for (const item of mapFeatures) {
    item.disabled = false;
  }
};

export { setFormActivity };
