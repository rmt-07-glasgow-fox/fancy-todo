if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routers');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app listen on http://localhost:${PORT}`);
});