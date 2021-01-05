require("dotenv").config();

const express = require('express');
const port = 3000;
const indexRouter = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`);
});