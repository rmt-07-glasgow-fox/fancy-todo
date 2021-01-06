require('dotenv').config();
const express = require('express');
const router = require('./routes');
const app = express();
const port = 3000;
const cors = require('cors')


const { errorHandlers } = require('./middlewares/errorHandlers.js');

app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use(router);
app.use(errorHandlers);

app.listen(port, () => {
  console.log(`This app is running on port: ${port}`);
})