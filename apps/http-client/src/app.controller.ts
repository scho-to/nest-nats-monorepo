import { Controller, Get, Param } from '@nestjs/common';
import { NatsService } from '../../../libs/nats/src';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly natsService: NatsService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/publish/:message')
  async sendMessageToStream(@Param('message') message: string) {
    await this.natsService.setupNats();
    await this.natsService.publishToSubject('test', { message });
    return message;
  }
}
