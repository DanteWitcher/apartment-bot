import { ILocation } from '../../common/interfaces/onliner/location.interface';
import { IPrice } from '../../common/interfaces/onliner/price.interface';

export class OnlinerFlatDto {
    readonly id: number;
    readonly created_at: string;
    readonly last_time_up: string;
    readonly location: ILocation;
    readonly photo: string;
    readonly price: IPrice;
    readonly rent_type: string;
    readonly url: string;
    readonly up_available_in: number;
}
