if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const PORT = 3000;
const indexRouter = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(PORT, ()=> {
  console.log(`Example app listening at http://localhost:${PORT}`);
});