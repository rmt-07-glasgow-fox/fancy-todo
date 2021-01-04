const express = require('express');
const router = express.Router();
const authRouter = require('./auth.js');
const todoRouter = require('./todo.js');

router.use('/', authRouter);
router.use('/todos', todoRouter);


module.exports = router;