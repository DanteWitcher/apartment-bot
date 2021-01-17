import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { OnlinerModule } from './onliner/onliner.module';
import { DomovitaModule } from './domovita/domovita.module';

@Module({
    imports: [
        OnlinerModule,
        DomovitaModule,
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        AppService,
        {
            provide: 'waitService',
            useFactory: async (appService: AppService) => {
                return appService.runRequests();
            },
            inject: [AppService],
        },
    ],
})
export class AppModule {}
