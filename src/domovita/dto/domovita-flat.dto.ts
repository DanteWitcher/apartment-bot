import { IInfo } from '../../common/interfaces/domovita/info.interface';
import { ILogs } from '../../common/interfaces/domovita/logs.interface';

export class DomovitaFlatDto {
    readonly id: string;
    readonly photo: string;
    readonly price: string;
    readonly url: string;
    readonly info: IInfo;
    readonly logs: ILogs;
}
