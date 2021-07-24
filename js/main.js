import './modules/map.js';
import './modules/photoPreview.js';
import './modules/advertisement-form.js';
import './modules/fetch.js';
import { renderAdvertisements } from './modules/map.js';
import { sendAdvertisement, clearForm } from './modules/advertisement-form.js';
import { getData } from './modules/fetch.js';
import { setApartamentType, setFutures, setGuestsNumber, setPriceInterval, setRoomNunber } from './modules/filters.js';

getData((advertisements) => {
  renderAdvertisements(advertisements);
  setApartamentType(() => renderAdvertisements(advertisements));
  setPriceInterval(() => renderAdvertisements(advertisements));
  setRoomNunber(() => renderAdvertisements(advertisements));
  setGuestsNumber(() => renderAdvertisements(advertisements));
  setFutures(() => renderAdvertisements(advertisements));
});

sendAdvertisement(clearForm);
