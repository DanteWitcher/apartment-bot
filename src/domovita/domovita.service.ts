import { Injectable } from '@nestjs/common';
import { _ } from 'lodash';
import { DomovitaFlatDbService } from '../core/db/domovita-flat-db.service';
import { TelegramService } from '../core/telegram/telegram.service';
import { DomovitaFlatDto } from './dto/domovita-flat.dto';
import { DomovitaApiService } from '../core/domovita-api.service';
import { IDomovitaFlat } from '../common/interfaces/domovita/domovita-flat.interface';

@Injectable()
export class DomovitaService {
    constructor(
        private readonly domovitaApi: DomovitaApiService,
        private readonly mongodbService: DomovitaFlatDbService,
        private readonly telegramService: TelegramService,
    ) {
    }

    async _createNewPromise(apartments, apartmentsDb) {
        const newApartments: IDomovitaFlat[] = _.differenceBy(apartments, apartmentsDb, 'id');

        console.log('newApartments =', newApartments.length);
        const promise = newApartments.map((ap) => this.mongodbService.create(ap as DomovitaFlatDto));

        return Promise.all(promise);
    }

    async _deleteRemovedPromise(apartmentsDb, apartments) {
        const removedApartments: IDomovitaFlat[] = _.differenceBy(apartmentsDb, apartments, 'id');

        console.log('removedApartments =', removedApartments.length);
        const promise = removedApartments.map((ap) => this.mongodbService.delete(ap as DomovitaFlatDto));

        return Promise.all(promise);
    }

    async sendNewApartments(chatid: string): Promise<IDomovitaFlat[]> {
        const newApartments = await this.getNewApartments();

        for (const apartment of newApartments) {
            await this.telegramService.sendMessage(apartment, '').toPromise();
        }

        return newApartments;
    }

    async getNewApartments(): Promise<IDomovitaFlat[]> {
        const apartments: IDomovitaFlat[] = await this.getApartments();

        const apartmentsDb: IDomovitaFlat[] = await this.mongodbService.findAll();

        const resultApartments = await Promise.all([
            this._createNewPromise(apartments, apartmentsDb),
            this._deleteRemovedPromise(apartmentsDb, apartments),
        ]);

        return resultApartments[0] as IDomovitaFlat[];
    }

    async getApartments(): Promise<IDomovitaFlat[]> {
        const apartments: IDomovitaFlat[] = await this.domovitaApi.getAllApartments().toPromise();

        return apartments;
    }

    async getHello(): Promise<string> {
        return 'Domovita endpoint works!';
    }
}
