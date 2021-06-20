const express = require('express');
const users = require('./users');
const userRoute = require('./routes/user');

const app = express();
app.use(express.json());

app.use('/api/login', userRoute);

app.listen(5000, () => console.log('Server running on port 5000'));
