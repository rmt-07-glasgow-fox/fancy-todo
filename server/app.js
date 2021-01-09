if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes')
const errorHandlers = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors());

app.use(express.json());

// app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}));

app.use(router);

app.use(errorHandlers)


app.listen(port, () => {
    console.log(`This app is running at port: ${port}`);
})