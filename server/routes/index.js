const router = require('express').Router();
const todosRouter = require('./todosRouter.js');
const authRouter = require('./auth.js');
const quoteRouter = require('./quote.js');
const { authenticate } = require('../middlewares/auth.js');

router.use('/', authRouter);
router.use(authenticate);
router.use('/todos', todosRouter);
router.use('/quote', quoteRouter);




module.exports = router;