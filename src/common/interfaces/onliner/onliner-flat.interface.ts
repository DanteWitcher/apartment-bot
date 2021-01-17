import { ILocation } from './location.interface';
import { IPrice } from './price.interface';

export interface IOnlinerFlat {
    id: number;
    created_at: string;
    last_time_up: string;
    location: ILocation;
    photo: string;
    price: IPrice;
    rent_type: string;
    url: string;
    up_available_in?: number;
}
