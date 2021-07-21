const TIMEOUT_TIMER = 4000;

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);

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

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    // eslint-disable-next-line no-use-before-define
    removeMessage(successMessage);
    // eslint-disable-next-line no-use-before-define
    removeMessage(errorMessage);
  }
};

const onMessageClick = () => {
  // eslint-disable-next-line no-use-before-define
  removeMessage(successMessage);
  // eslint-disable-next-line no-use-before-define
  removeMessage(errorMessage);
};

const removeMessage = (message) => {
  message.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageClick);
};

const showSuccessMessage = () => {
  document.body.append(successMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);
  setTimeout(() => {
    removeMessage(successMessage);
  }, TIMEOUT_TIMER);
};

const showErrorMessage = () => {
  document.body.append(errorMessage);
  const tryAgainButton = errorMessage.querySelector('.error__button');
  tryAgainButton.addEventListener('click', () => {
    removeMessage(errorMessage);
  });
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);
  setTimeout(() => {
    removeMessage(errorMessage);
  }, TIMEOUT_TIMER);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { showSuccessMessage, showErrorMessage, showAlertMessage, debounce };
