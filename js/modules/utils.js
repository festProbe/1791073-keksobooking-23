const TIMEOUT_TIMER = 4000;

const form = document.querySelector('.ad-form');

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    successMessage.remove();
    errorMessage.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  }
};

const removeMessage = (message) => {
  message.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
};

const showAlertMessage = (error) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.width = '50%';
  alertContainer.style.height = '100px';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '25%';
  alertContainer.style.top = 0;
  alertContainer.style.padding = '30px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'orange';

  alertContainer.textContent = error.message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, TIMEOUT_TIMER);
};

const showSuccessMessage = () => {
  form.append(successMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  setTimeout(() => {
    removeMessage(successMessage);
  }, TIMEOUT_TIMER);
};

const showErrorMessage = () => {
  form.append(errorMessage);
  const tryAgainButton = errorMessage.querySelector('.error__button');
  tryAgainButton.addEventListener('click', () => {
    removeMessage(errorMessage);
  });
  document.addEventListener('keydown', onMessageEscKeydown);
  setTimeout(() => {
    removeMessage(errorMessage);
  }, TIMEOUT_TIMER);
};

export { showSuccessMessage, showErrorMessage, showAlertMessage };
