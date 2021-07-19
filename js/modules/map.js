import { disableForm, enableForm } from './disable-enable-page.js';

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

const address = document.querySelector('#address');
address.value = DEFAULT_ADDRESS;

disableForm();
const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
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

const drawAdvertisementsMarker = (popupData, locationData) => {
  const lat = locationData.lat;
  const lng = locationData.lng;
  const advertisementMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      advertisementMarkerIcon,
    },
  );
  advertisementMarker.addTo(map);
  advertisementMarker.bindPopup(popupData);
};

export { setDefaultPosition, drawAdvertisementsMarker, DEFAULT_ADDRESS };
