const router = require('express').Router();
const {
  login,
  refreshToken,
  deleteUser,
  logout,
} = require('../controllers/user');
const { verify } = require('../utils');

router.post('/login', login);

router.post('/refresh', refreshToken);

router.delete('/users/:userId', verify, deleteUser);

router.post('/logout', verify, logout);

module.exports = router;
