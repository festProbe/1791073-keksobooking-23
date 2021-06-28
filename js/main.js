import { createAdvertisements } from './create-advertisment.js';
import { createAdvertisementsMarkup } from './create-advertisements-markup.js';
import { putAdvertisementInMarkup } from './put-advertisement-in-markup.js';


const advertisements = createAdvertisements();
const advertisementsMarkup = advertisements.map((card) => createAdvertisementsMarkup(card));
putAdvertisementInMarkup(advertisementsMarkup[0]);

