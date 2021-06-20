const router = require('express').Router();
const { login, deleteUser } = require('../controllers/user');
const { verify } = require('../utils');

router.post('/login', login);

router.delete('/users/:userId', verify, deleteUser);

module.exports = router;
