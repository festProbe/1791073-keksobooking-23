const TIMEOUT_TIMER = 4000;

const showAlert = (error) => {
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

export { showAlert };
