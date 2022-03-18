const { getPosts } = require('../api/ghost');
const { submitPost } = require('../api/reddit');
const createDomainLogger = require('../services/log');

const LOG_DOMAIN = 'reddit-job';
const redditJobLogger = createDomainLogger(LOG_DOMAIN);

module.exports = async function () {
  const posts = await getPosts({ limit: 'all' });
  const publishedPosts = posts.filter((post) => post.status === 'published');

  for (let post of publishedPosts) {
    try {
      await submitPost(post);
      redditJobLogger(
        `Submit post with title : ${title} and URL : ${url} to subreddit ${subreddit} success.`
      );
    } catch (error) {
      redditJobLogger(`Submit reddit post failed with error ${error}`);
    }
  }
};
