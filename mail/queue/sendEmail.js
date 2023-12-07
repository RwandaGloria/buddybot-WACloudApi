const Queue = require('bull');
const mail = require('../config');

const emailQueue = new Queue('emails');

async function addToQueue(subject, emailContent, recipients) {

}
