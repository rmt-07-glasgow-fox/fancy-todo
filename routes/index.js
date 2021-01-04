const router = require('express').Router();
const todosRouter = require('./todosRouter.js');
const authRouter = require('./auth.js');

router.use(authRouter);
router.use('/todos', todosRouter);

module.exports = router;