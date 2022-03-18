require('dotenv').config();
const cron = require('node-cron');
const redditJob = require('./reddit');

cron.schedule('0 0 * * *', async () => {
  await redditJob();
  console.log(`Cron job success`);
});

redditJob();
module.exports = cron;
