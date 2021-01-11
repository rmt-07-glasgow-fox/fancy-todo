if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}
const express = require('express');
const port = process.env.PORT || 3000;
const indexRouter = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(indexRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`);
});