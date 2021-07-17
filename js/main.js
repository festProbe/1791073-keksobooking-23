import './modules/map.js';
import './modules/advertisement-form.js';
import './modules/fetch.js';
import { createPopups } from './modules/create-popups.js';
import { handInAdvertisement, clearForm } from './modules/advertisement-form.js';
import { getData } from './modules/fetch.js';

const SIMILAR_ADVERTISEMENT_COUNT = 4;

getData((advertisements) => {
  createPopups(advertisements.slice(0, SIMILAR_ADVERTISEMENT_COUNT));
});

handInAdvertisement(clearForm);
