const express = require('express');
const router = express.Router();
const aes256 = require('aes256');
const { AUTH_KEY, AUTH_PASSPHRASE } = process.env;

router.post('/', async function (req, res, next) {
  const { token } = req.body;

  try {
    if (token && aes256.decrypt(AUTH_KEY, token) === AUTH_PASSPHRASE) {
      res.status(200).send('OK');
    }
  } catch (error) {
    res.status(401).send('Invalid credential.');
  }
});

router.get('/', function (req, res, next) {
  res.send('OK');
});

module.exports = router;
