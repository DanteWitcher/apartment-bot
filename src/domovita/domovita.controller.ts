import { Body, Controller, Get, Post } from '@nestjs/common';
import { IDomovitaFlat } from '../common/interfaces/domovita/domovita-flat.interface';
import { DomovitaService } from './domovita.service';

@Controller('domovita')
export class DomovitaController {
    constructor(
        private readonly domovitaService: DomovitaService,
    ) {}

    @Get()
    async getHello(): Promise<string> {
        return this.domovitaService.getHello();
    }

    @Get('all-apartments')
    async getApartments(): Promise<IDomovitaFlat[]> {
        return this.domovitaService.getApartments();
    }

    @Get('new-apartments')
    async getNewApartments(): Promise<IDomovitaFlat[]> {
        return this.domovitaService.getNewApartments();
    }

    @Post('send-new-apartments')
    async sendNewApartments(@Body('chatid') chatid: string): Promise<IDomovitaFlat[]> {
        return this.domovitaService.sendNewApartments(chatid);
    }
}
