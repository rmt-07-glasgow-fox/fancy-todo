if (process.env.NODE_ENV === 'development') {require('dotenv').config()};
const express = require('express');
const app = express();
const port = 3000;

const router = require('./routers/index.js');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => console.log(`Fancy Todo web app is running on port: ${port}`));