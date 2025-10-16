import { PubSub } from 'graphql-subscriptions';

export const SUMMARY_JOB_NAME = 'summary.job';
export const MAX_ATTEMPTS = 3;

export const pubSub = new PubSub();
export const PROCESS_SUMMARY_PUB_KEY = 'PROCESS_SUMMARY_PUB_KEY';
