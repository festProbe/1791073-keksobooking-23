import './modules/map.js';
import './modules/advertisement-form.js';
import './modules/fetch.js';
import { renderAdvertisements } from './modules/map.js';
import { sendAdvertisement, clearForm } from './modules/advertisement-form.js';
import { getData } from './modules/fetch.js';
import { setApartamentType } from './modules/filters.js';


getData((advertisements) => {
  renderAdvertisements(advertisements);
  setApartamentType(() => renderAdvertisements(advertisements));
});


sendAdvertisement(clearForm);
