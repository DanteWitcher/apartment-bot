import { IInfo } from './info.interface';
import { ILogs } from './logs.interface';

export interface IDomovitaFlat {
    id: string;
    photo: string;
    price: string;
    url: string;
    info: IInfo;
    logs: ILogs;
}
