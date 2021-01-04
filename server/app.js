const express = require('express');
const path = require('path');
const port = 3000;
const indexRouter = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRouter);

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`);
});