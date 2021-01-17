import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DomovitaApiService } from './domovita-api.service';
import { modules } from './db';
import { OnlinerApiService } from './onliner-api.service';
import { TelegramService } from './telegram/telegram.service';
import { DomovitaFlat, DomovitaFlatSchema } from '../domovita/schema/domovita-flat.schema';
import { OnlinerFlat, OnlinerFlatSchema } from '../onliner/schemas/onliner-flat.schema';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        MongooseModule.forFeature([{ name: OnlinerFlat.name, schema: OnlinerFlatSchema }]),
        MongooseModule.forFeature([{ name: DomovitaFlat.name, schema: DomovitaFlatSchema }]),
    ],
    providers: [...modules, OnlinerApiService, TelegramService, DomovitaApiService],
    exports: [...modules, OnlinerApiService, TelegramService, DomovitaApiService],
})
export class CoreModule {}
