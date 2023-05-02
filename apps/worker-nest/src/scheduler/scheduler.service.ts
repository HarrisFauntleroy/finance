import { Injectable } from '@nestjs/common';
import { Queue, ConnectionOptions } from 'bullmq';

@Injectable()
export class SchedulerService {
  private queue: Queue;

  constructor() {
    const connection: ConnectionOptions = {
      host: process.env.NODE_ENV === 'development' ? 'localhost' : 'redis',
      port: Number(process.env.REDIS_PORT),
    };

    this.queue = new Queue('Schedule tasks', { connection });
  }

  async scheduleJob(
    name: string,
    data: Record<string, unknown>,
    repeat: Record<string, unknown>,
  ) {
    await this.queue.add(name, data, { repeat });
  }
}
