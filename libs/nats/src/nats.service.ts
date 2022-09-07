import { Injectable } from '@nestjs/common';
import {
  connect,
  consumerOpts,
  JetStreamClient,
  JetStreamManager,
  JSONCodec,
  NatsConnection
} from 'nats';

@Injectable()
export class NatsService {
  private nc: NatsConnection;
  private js: JetStreamClient;
  private jsm: JetStreamManager;

  public getNc() {
    return this.nc;
  }

  public getJs() {
    return this.js;
  }

  public getJsm() {
    return this.jsm;
  }

  public async setupNats() {
    this.nc = await connect({
      servers: 'nats-server',
      user: 'nats',
      pass: process.env.NATS_PASSWORD
    });
    this.js = await this.nc.jetstream();
    this.jsm = await this.nc.jetstreamManager();
    await this.setupStreams();
  }

  private async setupStreams() {
    let streamInfo = null;
    try {
      streamInfo = await this.jsm.streams.info('nest-nats');
    } catch (e) {
      console.log('stream not existing yet.');
    }
    if (!streamInfo) {
      console.log('creating stream...');
      await this.jsm.streams.add({
        name: 'nest-nats',
        subjects: ['test'],
        max_msgs_per_subject: 50
      });
    }
  }

  public async startListenToSubject(subject: string) {
    const opts = consumerOpts();
    const jc = JSONCodec();
    opts.durable('me');
    opts.ackExplicit();
    opts.deliverTo('inbox');
    console.log('start listening to ' + subject);
    while (true) {
      const sub = await this.js.subscribe('test', opts);
      for await (const m of sub) {
        console.log(jc.decode(m.data));
        m.ack();
      }
    }
  }

  public async publishToSubject(subject: string, data: object) {
    const jc = JSONCodec();
    await this.js.publish(subject, jc.encode({ data }));
  }
}
