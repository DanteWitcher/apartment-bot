import { IOnlinerFlat } from '../../../common/interfaces/onliner/onliner-flat.interface';
// USED for onliner;
export class OnlinerFlatMessage {
    markdownMessage: string;

    constructor(apartment: IOnlinerFlat) {
        this.markdownMessage = `
[​​​​​​​​​​​](${apartment.photo})
*ЦЕНА:* \`$: ${apartment.price.converted.USD.amount}, BYN: ${apartment.price.converted.BYN.amount}\`,
*КОЛ-ВО КОМНАТ:* \`${apartment.rent_type === '1_room' ? '1 комната' : '2 комнаты'}\`,
*АДРЕС:* \`${apartment.location.address}\`,
*ССЫЛКА НА ОНЛАЙНЕР:* ${apartment.url}`;
    }
}
