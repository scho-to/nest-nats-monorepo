import { Module } from '@nestjs/common';
import { NatsModule, NatsService } from '../../../libs/nats/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [NatsModule],
  controllers: [AppController],
  providers: [AppService, NatsService]
})
export class AppModule {}
