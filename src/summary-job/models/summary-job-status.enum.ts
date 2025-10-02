import { registerEnumType } from '@nestjs/graphql';

export enum SummaryJobStatus {
  queued = 'queued',
  running = 'running',
  done = 'done',
  error = 'error',
}
registerEnumType(SummaryJobStatus, { name: 'SummaryJobStatus' });
