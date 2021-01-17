import { IDomovitaFlat } from '../../../common/interfaces/domovita/domovita-flat.interface';
// USED for domovita and kvartirant;
export class FlatMessage {
    markdownMessage: string;

    constructor(flat: IDomovitaFlat) {
        this.markdownMessage = `
*ССЫЛКА НА ДОМОВИТУ:* ${flat.url},
*ЦЕНА:* \`$: ${flat.price}\`,
*ИНФОРМАЦИЯ:* \`${flat.info.full}\``;

        if (!!flat.logs.err) {
            this.markdownMessage = `
ПРОИЗОШЛА ОШИБКА ПРИ ПОЛУЧЕНИИ КВАРТИРЫ;
*ERROR:* \`${flat.logs.err},\`,
*BREAD_CRUMBS*: \`${flat.logs.bread_crumbs},\``;
        }
    }
}
