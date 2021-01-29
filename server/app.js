if (process.env.NODE_ENV === 'development') { require('dotenv').config() };
const cors = require('cors');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const router = require('./routers/index.js');
const errHandler = require('./middlewares/errHandler.js');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(errHandler);

app.listen(PORT, () => console.log(`Fancy Todo web app is running on port: ${PORT}`));