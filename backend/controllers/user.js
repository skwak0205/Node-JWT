const users = require('../users');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      'mySecretKey'
    );

    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else {
    res.status(400).json('Username or password incorrect!');
  }
};

const deleteUser = (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json('User has been deleted');
  } else {
    res.status(403).json('You are not allowed to delete this user!');
  }
};

module.exports = { login, deleteUser };
