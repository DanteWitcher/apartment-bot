import { Body, Controller, Get, Post } from '@nestjs/common';
import { OnlinerService } from './onliner.service';
import { IOnlinerFlat } from '../common/interfaces/onliner/onliner-flat.interface';

@Controller('onliner')
export class OnlinerController {
    constructor(
        private readonly onlinerService: OnlinerService,
    ) {}

    @Get()
    async getHello(): Promise<string> {
        return this.onlinerService.getHello();
    }

    @Get('all-apartments')
    async getApartments(): Promise<IOnlinerFlat[]> {
        return this.onlinerService.getApartments();
    }

    @Get('new-apartments')
    async getNewApartments(): Promise<IOnlinerFlat[]> {
        return this.onlinerService.getNewApartments();
    }

    @Post('send-new-apartments')
    async sendNewApartments(@Body('chatid') chatid: string): Promise<IOnlinerFlat[]> {
        return this.onlinerService.sendNewApartments(chatid);
    }
}
