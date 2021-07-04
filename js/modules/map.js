import { disableForm, enableForm } from './disable-enable-forms.js';

const address = document.querySelector('#address');
const DEFAULT_COORDS = { lat: 35.652832, lng: 139.839478 };

address.value = `${DEFAULT_COORDS.lat.toFixed(5)}, ${DEFAULT_COORDS.lng.toFixed(5)}`;

disableForm();
const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
  })
  .setView(DEFAULT_COORDS, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './../img/main-pin.svg',
  iconSize: [34, 46],
  iconAnchor: [17, 46],
});

const marker = L.marker(
  DEFAULT_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.on('drag', () => {
  address.value = `${marker.getLatLng().lat.toFixed(5)}, ${marker.getLatLng().lng.toFixed(5)}`;
});

marker.addTo(map);

//const advertisementsGroup = L.layerGroup().addTo(map);

