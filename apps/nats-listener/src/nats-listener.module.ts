import { Module } from '@nestjs/common';
import { NatsModule, NatsService } from '../../../libs/nats/src';

@Module({
  imports: [NatsModule],
  providers: [NatsService]
})
export class NatsListenerModule {}
