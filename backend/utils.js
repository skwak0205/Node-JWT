const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  // Generate an access token
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'mySecretKey', {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'myRefreshSecretKey');
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'mySecretKey', (err, data) => {
      if (err) {
        return res.status(403).json('Token is not valid!');
      }

      req.user = data;
      next();
    });
  } else {
    res.status(401).json('You are not authenticated!');
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verify };
