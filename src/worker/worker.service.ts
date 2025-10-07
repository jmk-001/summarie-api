import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import PgBoss from 'pg-boss';
import { SUMMARY_JOB_NAME } from '../summary/summary-constants';

@Injectable()
export class WorkerService implements OnModuleInit, OnModuleDestroy {
  private boss!: PgBoss;

  constructor() {}

  async onModuleInit(): Promise<void> {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set');
    }
    this.boss = new PgBoss({
      connectionString,
    });
    await this.boss.start();
    await this.boss.createQueue(SUMMARY_JOB_NAME);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.boss) {
      await this.boss.stop();
    }
  }

  get instance(): PgBoss {
    if (!this.boss) {
      throw new Error('PgBoss not initialized yet');
    }
    return this.boss;
  }
}
