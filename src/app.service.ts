import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { cron } from 'node-cron';
import { OnlinerService } from './onliner/onliner.service';
import { DomovitaService } from './domovita/domovita.service';

@Injectable()
export class AppService {
    cron;
    time: number;

    constructor(
        private onlinerService: OnlinerService,
        private domovitaService: DomovitaService,
        private configService: ConfigService,
    ) {
        this.time = this.configService.get<number>('TIME');

        // INFO: corn schedule
        // this.initCrone();
    }

    initCrone(): void {
        cron.schedule(`*/${this.time} 8-23 * * *`, () => {
            console.log(`running a task in ${new Date().toLocaleString()}`);

            this.onlinerService.sendNewApartments('');
            this.domovitaService.sendNewApartments('');
          });
    }

    async runRequests(): Promise<any[]> {
        console.log(`running requests...`);

        return Promise.all([
            this.onlinerService.sendNewApartments(''),
            this.domovitaService.sendNewApartments(''),
        ]);
    }
}
