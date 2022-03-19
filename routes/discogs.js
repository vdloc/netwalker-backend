const express = require('express');
const { getData, searchDiscogs } = require('../api/discogs');
const router = express.Router();

/* GET users listing. */
router.get('/id', async function (req, res, next) {
  const data = await searchDiscogs(req.query);

  res.send(data);
});

router.get('/data', async function (req, res, next) {
  const data = await getData(req.query.id);

  res.send(data);
});

module.exports = router;
