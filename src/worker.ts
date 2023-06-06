
import { Worker } from 'bullmq'
import tasks from './tasks'

const redisConfiguration = {
  connection: {
    host: process.env.R7PLATFORM_WORKER_HEALTH_PROFILE_REDIS_HOST || "localhost",
    port: Number(process.env.R7PLATFORM_WORKER_HEALTH_PROFILE_REDIS_PORT) || 6379,
    enableOfflineQueue: false,
    password: process.env.R7PLATFORM_WORKER_HEALTH_PROFILE_REDIS_PASSWORD || "redispw"
  }
}

const CONCURRENCY = process.env.R7PLATFORM_WORKER_HEALTH_PROFILE_CONCURRENCY ?
  Number(process.env.R7PLATFORM_WORKER_HEALTH_PROFILE_CONCURRENCY) : 4

const worker = new Worker('HEALTH_PROFILE', tasks, {
  limiter: {
    max: 100,
    duration: 1000,
  },
  maxStalledCount: 6,
  stalledInterval: 30000,
  concurrency: CONCURRENCY,
  connection: redisConfiguration.connection
});

// Job success
worker.on('completed', (job: any) => {
  console.info(`${job.id} has completed!`)
});

// Job failed
worker.on('failed', (job: any, err: any) => {
  console.error(`${job.id} has failed with ${err.message}`)
});

// Worker error
worker.on('error', err => {
  console.error(err)
})

