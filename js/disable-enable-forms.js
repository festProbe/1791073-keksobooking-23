const advertisementsForm = document.querySelector('.ad-form');
const advertisementsFormFieldsets = advertisementsForm.querySelectorAll('.ad-form > fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormFieldsets = mapFiltersForm.querySelectorAll('.map__filters > fieldset');
const mapFiltersFormSelects = mapFiltersForm.querySelectorAll('.map__filters > select');

const disableForm = () => {
  advertisementsForm.classList.add('ad-form--disabled');
  for (const item of advertisementsFormFieldsets) {
    item.classList.add('hidden');
  }
  mapFiltersForm.classList.add('map__filters--disabled');
  for (const item of mapFiltersFormFieldsets) {
    item.disabled = false;
  }
  for (const item of mapFiltersFormSelects) {
    item.disabled = false;
  }
};

const enableForm = () => {
  advertisementsForm.classList.remove('ad-form--disabled');
  for (const item of advertisementsFormFieldsets) {
    item.classList.remove('hidden');
  }
  mapFiltersForm.classList.remove('map__filters--disabled');
  for (const item of mapFiltersFormFieldsets) {
    item.disabled = true;
  }
  for (const item of mapFiltersFormSelects) {
    item.disabled = true;
  }
};

export { disableForm, enableForm };
