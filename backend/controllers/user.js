const users = require('../users');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils');

let refreshTokens = [];

const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json('Username or password incorrect!');
  }
};

const refreshToken = (req, res) => {
  // take the refresh token from the user
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json('You are not authenticated!');

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json('Refresh token is not valid!');
  }

  jwt.verify(refreshToken, 'myRefreshSecretKey', (err, data) => {
    err && console.error(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(data);
    const newRefreshToken = generateRefreshToken(data);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

const deleteUser = (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json('User has been deleted');
  } else {
    res.status(403).json('You are not allowed to delete this user!');
  }
};

module.exports = { login, refreshToken, deleteUser };
