if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const PORT = 3000;
const indexRouter = require('./routes');
const errorHandlers = require('./middlewares/errorHandlers.js');
var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use(errorHandlers);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});