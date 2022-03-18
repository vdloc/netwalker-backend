const Reddit = require('reddit');
const createDomainLogger = require('../services/log');

const LOG_DOMAIN = 'reddit-api';
const redditLogger = createDomainLogger(LOG_DOMAIN);

let reddit;

try {
  reddit = new Reddit({
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
    appId: process.env.REDDIT_APP_ID,
    appSecret: process.env.REDDIT_APP_SECRET,
    userAgent: 'MyApp/1.0.0 (http://example.com)',
  });
} catch (error) {
  redditLogger(`Initialize reddit client failed due to error ${error}`);
}

function submitPost({ title, url }, subreddit = 'netwalkervn') {
  try {
    if (reddit && reddit.post) {
      const result = reddit.post('/api/submit', {
        sr: subreddit,
        kind: 'link',
        resubmit: false,
        title,
        url,
      });
      return result;
    }
    throw new Error(`Reddit client was not initialized.`);
  } catch (error) {
    redditLogger(
      `Submit post with title : ${title} and URL : ${url} to subreddit ${subreddit} failed due to error: ${error}.`
    );
    return null;
  }
}

module.exports = { submitPost };
