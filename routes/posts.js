const express = require('express');
const fs = require('fs-extra');
const converter = require('@tryghost/html-to-mobiledoc');
const { getPosts, createPost } = require('../api/ghost');
const createDomainLogger = require('../services/log');
const router = express.Router();

const LOG_DOMAIN = 'post-route';
const postRouteLogger = createDomainLogger(LOG_DOMAIN);

router.get('/', async function (req, res, next) {
  const data = await getPosts({ limit: 'all' });
  const posts = data.reduce(
    (str, { title, url }) => str.concat(`${title} ${url}\n`),
    ''
  );
  fs.writeFile('/home/nomad/netwalker-backend/database/posts.text', posts);

  res.send(posts);
});

router.post('/', async function (req, res, next) {
  try {
    const { title, html, status = 'draft' } = req.body;
    await createPost({ title, html, status });

    postRouteLogger(`Create post with title ${title} success.`);
    res.status(200).send('Create post success.');
  } catch (error) {
    postRouteLogger(`Create post with title ${title} failed.`);
    res.status(400).send('Create post failed.');
  }
});

module.exports = router;
