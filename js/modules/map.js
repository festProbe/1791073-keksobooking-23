import { disableForm, enableForm } from './disable-enable-forms.js';
import { createAdvertisements } from './create-advertisment.js';
import { createAdvertisementsMarkup } from './create-advertisements-markup.js';

const Settings = {
  MapSettings: {
    DEFAULT_COORDS: { lat: 35.652832, lng: 139.839478 },
    START_ZOOM: 13,
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
address.value = `${Settings.MapSettings.DEFAULT_COORDS.lat.toFixed(5)}, ${Settings.MapSettings.DEFAULT_COORDS.lng.toFixed(5)}`;

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
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
});

mainMarker.addTo(map);

const advertisements = createAdvertisements();
for (const advertisement of advertisements) {
  const lat = advertisement.location.lat;
  const lng = advertisement.location.lng;
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
  advertisementMarker.bindPopup(
    createAdvertisementsMarkup(advertisement),
  );
}

