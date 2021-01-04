const router = require('express').Router();
const authRouter = require('./authRouter');
const todoRouter = require('./todoRouter');

router.use(authRouter)
router.use('/todos', todoRouter)

module.exports = router;