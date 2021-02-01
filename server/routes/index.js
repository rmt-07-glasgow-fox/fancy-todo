const express = require('express');
const router = express.Router();
const authRouter = require('./auth.js');
const todoRouter = require('./todo.js');
const { authenticate } = require('../middlewares/auth.js');
const weatherRouter = require('./weatherApi.js');

router.use('/', authRouter);
router.use(authenticate); // req { headers, params, query, body, user }
router.use('/',weatherRouter);
router.use('/todos', todoRouter);


module.exports = router;