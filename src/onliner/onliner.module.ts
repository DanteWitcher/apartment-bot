import { HttpModule, Module } from '@nestjs/common';
import { OnlinerController } from './onliner.controller';
import { OnlinerService } from './onliner.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
      HttpModule,
      CoreModule,
  ],
  controllers: [OnlinerController],
  providers: [OnlinerService],
  exports: [OnlinerService],
})
export class OnlinerModule {}
