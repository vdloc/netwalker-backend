const { getPosts } = require('../api/ghost');
const { submitPost } = require('../api/reddit');
const createDomainLogger = require('../services/log');

const LOG_DOMAIN = 'reddit-job';
const redditJobLogger = createDomainLogger(LOG_DOMAIN);

module.exports = async function () {
  const posts = await getPosts({ limit: 'all' });
  const publishedPosts = posts.filter((post) => post.status === 'published');
  const promises = publishedPosts.map(async (post) => {
    const { title, url } = post;

    try {
      await submitPost(post);
      redditJobLogger(
        `Submit post with title : ${title} and URL : ${url} to subreddit success.`
      );
    } catch (error) {
      redditJobLogger(`Submit reddit post ${title} failed with error ${error}`);
    }
  });

  await Promise.all(promises);
};
