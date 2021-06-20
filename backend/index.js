const express = require('express');
const users = require('./users');

const app = express();

app.listen(5000, () => console.log('Server running on port 5000'));
