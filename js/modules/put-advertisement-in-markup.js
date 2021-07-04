const putAdvertisementInMarkup = (advertisement) => {
  const card = document.querySelector('#map-canvas').appendChild(advertisement);
  return card;
};

export { putAdvertisementInMarkup };
