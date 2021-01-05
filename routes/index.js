const router = require('express').Router()
const todosRouter = require('./todos');
const authRouter = require('./auth');
const {authenticate} = require('../middlewares/auth');
const quoteRouter = require('./quotes');

router.use(authRouter)
router.use(quoteRouter)

router.use(authenticate)
router.use('/todos', todosRouter)

module.exports = router