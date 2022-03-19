const express = require('express');
const { getPosts } = require('../api/ghost');
const { submitPost } = require('../api/reddit');
const createDomainLogger = require('../services/log');
const router = express.Router();

const LOG_DOMAIN = 'reddit-route';
const redditRouteLogger = createDomainLogger(LOG_DOMAIN);

router.get('/', async function (req, res, next) {
  const posts = await getPosts({ limit: 'all' });
  const publishedPosts = posts.filter((post) => post.status === 'published');
  const promises = publishedPosts.map(async (post) => {
    try {
      await submitPost(post);
      redditRouteLogger(
        `Submit post with title : ${title} and URL : ${url} to subreddit ${subreddit} success.`
      );
      return post;
    } catch (error) {
      redditRouteLogger(`Submit reddit post failed with error ${error}`);
    }
  });

  try {
    const result = await Promise.all(promises);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
