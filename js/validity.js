const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const advertisementTitleInput = document.querySelector('.ad-form__element > input');

advertisementTitleInput.addEventListener('input', () => {
  const titleLength = advertisementTitleInput.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    advertisementTitleInput.setCustomValidity(`Минимальная длина заголовка - ${MIN_TITLE_LENGTH} символов.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    advertisementTitleInput.setCustomValidity(`Максимальная длина заголовка - ${MAX_TITLE_LENGTH} символов.`)
  } else {
    advertisementTitleInput.setCustomValidity('');
  }

  advertisementTitleInput.reportValidity();
});
console.log(advertisementTitleInput);
