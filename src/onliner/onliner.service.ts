import { Injectable } from '@nestjs/common';
import { _ } from 'lodash';
import { OnlinerFlatDbService } from '../core/db/onliner-flat-db.service';
import { OnlinerApiService } from '../core/onliner-api.service';
import { TelegramService } from '../core/telegram/telegram.service';
import { OnlinerFlatDto } from './dto/onliner-flat.dto';
import { ECurrency } from '../common/enums/currency.enum';
import { IOnlinerFlat } from '../common/interfaces/onliner/onliner-flat.interface';
import { OnlinerFlat } from './schemas/onliner-flat.schema';

@Injectable()
export class OnlinerService {
    constructor(
        private readonly onlinerApi: OnlinerApiService,
        private readonly mongodbService: OnlinerFlatDbService,
        private readonly telegramService: TelegramService,
    ) {
    }

    async _createNewPromise(apartments, apartmentsDb) {
        const newApartments: IOnlinerFlat[] = _.differenceBy(apartments, apartmentsDb, 'id');

        console.log('newApartments =', newApartments.length);
        const promise = newApartments.map((ap) => this.mongodbService.create(ap as OnlinerFlatDto));

        return Promise.all(promise);
    }

    async _deleteRemovedPromise(apartmentsDb, apartments) {
        const removedApartments: IOnlinerFlat[] = _.differenceBy(apartmentsDb, apartments, 'id');

        console.log('removedApartments =', removedApartments.length);
        const promise = removedApartments.map((ap) => this.mongodbService.delete(ap as OnlinerFlatDto));

        return Promise.all(promise);
    }

    async sendNewApartments(chatid: string): Promise<IOnlinerFlat[]> {
        const newApartments = await this.getNewApartments();

        for (const apartment of newApartments) {
            await this.telegramService.sendMessage(apartment, '').toPromise();
        }

        // TEST apartment
        const newApartment: IOnlinerFlat = {
            created_at: '',
            id: 1234,
            last_time_up: '',
            location: {
                address: 'address',
                latitude: 123,
                longitude: 321,
                user_address: 'user_address',
            },
            photo: 'https://content.onliner.by/apartment_rentals/3213703/600x400/cf10449fe310f7db437b429bb5a04109.jpeg',
            price: {
                converted: {
                    BYN: {
                        amount: '300',
                        currency: ECurrency.BYN,
                    },
                    USD: {
                        amount: '400',
                        currency: ECurrency.USD,
                    },
                },
                amount: '133',
                currency: ECurrency.BYN,
            },
            rent_type: '2_room',
            up_available_in: 1,
            url: 'https://r.onliner.by/ak/apartments/632506',
        };

        return newApartments;
    }

    async getNewApartments(): Promise<IOnlinerFlat[]> {
        const apartments: IOnlinerFlat[] = await this.getApartments();
        const apartmentsDb: OnlinerFlat[] = await this.mongodbService.findAll();

        const resultApartments = await Promise.all([
            this._createNewPromise(apartments, apartmentsDb),
            this._deleteRemovedPromise(apartmentsDb, apartments),
        ]);

        return resultApartments[0] as IOnlinerFlat[];
    }

    async getApartments(): Promise<IOnlinerFlat[]> {
        const apartments: IOnlinerFlat[] = await this.onlinerApi.getAllApartments().toPromise();

        return apartments;
    }

    async getHello(): Promise<string> {
        return 'Onliner endpoint works!';
    }
}
