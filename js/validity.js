const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const advertisementTitleInput = document.querySelector('.ad-form__element > input');
const typeOfApartamentsOption = document.querySelectorAll('fieldset.ad-form__element > #type > option');


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

typeOfApartamentsOption.addEventListener('change', () => {
  for (const value of typeOfApartamentsOption) {

  }
});
