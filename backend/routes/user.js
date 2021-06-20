const router = require('express').Router();
const { login, refreshToken, deleteUser } = require('../controllers/user');
const { verify } = require('../utils');

router.post('/login', login);

router.post('/refresh', refreshToken);

router.delete('/users/:userId', verify, deleteUser);

module.exports = router;
