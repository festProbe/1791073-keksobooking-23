const advertisementsForm = document.querySelector('.ad-form');
const advertisementsFormFieldsets = advertisementsForm.querySelectorAll('.ad-form > fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormFieldsets = mapFiltersForm.querySelectorAll('.map__filters > fieldset');

const formDisable = () => {
  advertisementsForm.classList.add('ad-form--disabled');
  for (const item of advertisementsFormFieldsets) {
    item.classList.add('hidden');
  }
  mapFiltersForm.classList.add('map__filters--disabled');
  for (const item of mapFiltersFormFieldsets) {
    item.classList.add('hidden');
  }
};

const formEnable = () => {
  advertisementsForm.classList.remove('ad-form--disabled');
  for (const item of advertisementsFormFieldsets) {
    item.classList.remove('hidden');
  }
  mapFiltersForm.classList.remove('map__filters--disabled');
  for (const item of mapFiltersFormFieldsets) {
    item.classList.remove('hidden');
  }
};

export { formDisable, formEnable };
