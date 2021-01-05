const router = require('express').Router();
const todosRouter = require('./todosRouter.js');
const authRouter = require('./auth.js');
const { authenticate } = require('../middlewares/auth.js');

router.use('/', authRouter);
router.use(authenticate);
router.use('/todos', todosRouter);


module.exports = router;