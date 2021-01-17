import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '../core/core.module';
import { DomovitaController } from './domovita.controller';
import { DomovitaService } from './domovita.service';

@Module({
    imports: [
        ConfigModule,
        CoreModule,
    ],
    providers: [DomovitaService],
    exports: [DomovitaService],
    controllers: [DomovitaController],
})
export class DomovitaModule {}
