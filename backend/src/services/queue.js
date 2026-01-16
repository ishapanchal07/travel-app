const Queue = require('bull');
const { getRedisClient } = require('../config/redis');

// Create queues
const emailQueue = new Queue('email', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

const smsQueue = new Queue('sms', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

// Email queue processor
emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  const emailService = require('./email');
  await emailService.sendEmail(to, subject, html);
});

// SMS queue processor
smsQueue.process(async (job) => {
  const { to, message } = job.data;
  const smsService = require('./sms');
  await smsService.sendSMS(to, message);
});

// Add jobs
const addEmailJob = (data) => {
  return emailQueue.add(data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
};

const addSMSJob = (data) => {
  return smsQueue.add(data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
};

module.exports = {
  emailQueue,
  smsQueue,
  addEmailJob,
  addSMSJob
};

