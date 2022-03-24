const { AUTH_KEY, AUTH_PASSPHRASE } = process.env;
const aes256 = require('aes256');

function auth(req, res, next) {
  const token = req.get('token');

  if (
    req.path !== '/login' &&
    (!token || aes256.decrypt(AUTH_KEY, token || '') !== AUTH_PASSPHRASE)
  ) {
    res.status(401).send('Invalid Credential.');
  } else {
    next();
  }
}

module.exports = auth;
