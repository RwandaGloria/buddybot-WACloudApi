// queueManager.js
const { Queue, Worker } = require('bull');
const sendMail = require('./sendEmail');

const emailQueue = new Queue('emailQueue');

emailQueue.process(async (job) => {
  const { subject, emailContent, recipients } = job.data;
  // Call your existing email sending logic here
  await sendMail(subject, emailContent, recipients);
});

module.exports = emailQueue;
