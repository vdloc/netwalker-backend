const express = require('express');
const fs = require('fs-extra');
const { getPosts } = require('../api/ghost');
const router = express.Router();

router.get('/', async function (req, res, next) {
  const data = await getPosts({ limit: 'all' });
  const posts = data.reduce(
    (str, { title, url }) => str.concat(`${title} ${url}\n`),
    ''
  );
  fs.writeFile('/home/nomad/netwalker-backend/database/posts.text', posts);

  res.send(posts);
});

module.exports = router;
