const { AUTH_KEY, AUTH_PASSPHRASE } = process.env;
const aes256 = require('aes256');

function auth(req, res, next) {
  const token = req.get('token');

  if (req.path === '/login' && req.method === 'POST') {
    next();
  } else {
    try {
      const decryptedPassphrase = aes256.decrypt(AUTH_KEY, token);

      if (decryptedPassphrase !== AUTH_PASSPHRASE) {
        res.status(401).send('Invalid Credential');
      } else {
        next();
      }
    } catch (error) {
      res.status(401).send('Invalid Credential');
    }
  }
}

module.exports = auth;
