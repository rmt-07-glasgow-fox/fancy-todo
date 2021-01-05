const router = require('express').Router();
const authRouter = require('./authRouter');
const todoRouter = require('./todoRouter');
const { authenticate } = require('../middlewares/auth');

router.get('/', (req,res) => {
    res.send('Hello World')
})

// endpoint
// router.use(authenticate);
router.use('/', authRouter);
router.use(authenticate)
router.use('/todos', todoRouter); 

module.exports = router; authenticate