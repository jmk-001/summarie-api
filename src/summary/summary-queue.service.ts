import { Injectable } from '@nestjs/common';
import { WorkerService } from '../worker/worker.service';
import { SUMMARY_JOB_NAME } from './summary-constants';

@Injectable()
export class SummaryQueueService {
  constructor(private readonly boss: WorkerService) {}

  async enqueue(jobId: string): Promise<void> {
    await this.boss.instance.send(SUMMARY_JOB_NAME, { jobId });
  }
}
