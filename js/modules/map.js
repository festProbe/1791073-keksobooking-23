import { setFormActivity } from './disable-enable-page.js';
import { isEquailRoomNumber, isEqualApartaments, isEqualGuestsNumber, compareFeatures, isInPriceInterval } from './filters.js';
import { debounce } from './utils.js';

const DEFAULT_COORDS = { lat: 35.652832, lng: 139.839478 };
const START_ZOOM = 13;
const DEFAULT_ADDRESS = `${DEFAULT_COORDS.lat.toFixed(5)}, ${DEFAULT_COORDS.lng.toFixed(5)}`;

const Settings = {
  MapSettings: {
    DEFAULT_COORDS,
    START_ZOOM,
  },
  MainMarkerSettings: {
    ICON_URL: './../img/main-pin.svg',
    ICON_SIZE: [52, 52],
    ICON_ARCHOR: [26, 52],
  },
  AdvertisementMarkerSettings: {
    ICON_URL: './../img/pin.svg',
    ICON_SIZE: [40, 40],
    ICON_ARCHOR: [20, 40],
  },
};

const SIMILAR_ADVERTISEMENT_COUNT = 10;
const TIMEOUT_DELAY = 500;

const TypesOfApartaments = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

const address = document.querySelector('#address');
address.value = DEFAULT_ADDRESS;

const map = L.map('map-canvas')
  .on('load', () => {
    setFormActivity();
  })
  .setView(Settings.MapSettings.DEFAULT_COORDS, Settings.MapSettings.START_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: Settings.MainMarkerSettings.ICON_URL,
  iconSize: Settings.MainMarkerSettings.ICON_SIZE,
  iconAnchor: Settings.MainMarkerSettings.ICON_ARCHOR,
});

const advertisementMarkerIcon = L.icon({
  iconUrl: Settings.AdvertisementMarkerSettings.ICON_URL,
  iconSize: Settings.AdvertisementMarkerSettings.ICON_SIZE,
  iconAnchor: Settings.AdvertisementMarkerSettings.ICON_ARCHOR,
});

const mainMarker = L.marker(
  Settings.MapSettings.DEFAULT_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.on('drag', () => {
  const currentAddress = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
  address.value = currentAddress;
});

mainMarker.addTo(map);

const setDefaultPosition = () => {
  map.setView(
    DEFAULT_COORDS,
    START_ZOOM,
  );
  mainMarker.setLatLng(DEFAULT_COORDS);
  address.value = DEFAULT_ADDRESS;
};

const advertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createPopup = function ({ author, location, offer }) {
  const cardItem = advertisementTemplate.cloneNode(true);

  cardItem.querySelector('.popup__title').textContent = offer.title;

  cardItem.querySelector('.popup__text--address').textContent = `${offer.address} (${location.lat.toFixed(5)} - ${location.lng.toFixed(5)})`;

  cardItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  cardItem.querySelector('.popup__type').textContent = TypesOfApartaments[offer.type];

  cardItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.features) {
    const features = offer.features.map((item) => `popup__feature--${item}`);
    cardItem.querySelectorAll('.popup__feature').forEach((item) => {
      const feature = item.classList[1];
      if (!features.includes(feature)) {
        item.remove();
      }
    });
    if (Array.isArray(features) && features.length === 0) {
      cardItem.querySelectorAll('.popup__feature').classList.add('hidden');
    }
  }

  const description = cardItem.querySelector('.popup__description');
  description.textContent = offer.description;
  if (!offer.description) {
    description.classList.add('hidden');
  }

  const photoSet = cardItem.querySelector('.popup__photos');
  if (offer.photos) {
    const offerPhotos = offer.photos;
    for (const item of offerPhotos) {
      const photoItem = photoSet.querySelector('.popup__photo').cloneNode(true);
      photoItem.classList.add('popup__photo');
      photoItem.src = item;
      photoItem.alt = offer.type;
      photoSet.appendChild(photoItem);
    }
  }
  const photoItems = photoSet.querySelectorAll('.popup__photo');
  photoItems[0].remove();

  cardItem.querySelector('.popup__avatar').src = author.avatar;
  return cardItem;
};

const markerGroup = L.layerGroup().addTo(map);

const renderAdvertisements = debounce((advertisements) => {
  markerGroup.clearLayers();
  advertisements
    .filter(isEqualApartaments && isInPriceInterval && isEquailRoomNumber && isEqualGuestsNumber)
    .sort(compareFeatures)
    .slice(0, SIMILAR_ADVERTISEMENT_COUNT)
    .forEach(({ author, offer, location }) => {
      const lat = location.lat;
      const lng = location.lng;
      const advertisementMarker = L.marker(
        {
          lat,
          lng,
        },
        {
          advertisementMarkerIcon,
        },
      );

      advertisementMarker.addTo(markerGroup);

      advertisementMarker.bindPopup(
        createPopup({ author, offer, location }),
        {
          keepInView: true,
        },
      );
    });

  markerGroup.addTo(map);
}, TIMEOUT_DELAY);

export { setDefaultPosition, DEFAULT_ADDRESS, renderAdvertisements };
