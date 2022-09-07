import { NestFactory } from '@nestjs/core';
import { NatsService } from '../../../libs/nats/src';
import { NatsListenerModule } from './nats-listener.module';

async function bootstrap() {
  const app = await NestFactory.create(NatsListenerModule);
  const service = app.get(NatsService);
  await service.setupNats();
  await service.startListenToSubject('test');
}
bootstrap();
