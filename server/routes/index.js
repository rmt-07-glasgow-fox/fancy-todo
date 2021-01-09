const router = require('express').Router();
const authRouter = require('./authRouter');
const todoRouter = require('./todoRouter');
const ipRouter = require('./ipAddressRouter');
const weatherRouter = require('./weatherRouter');
const quoteRouter = require('./quoteRouter');
const { authenticate } = require('../middlewares/auth');

router.get('/', (req,res) => {
    res.send('Hello World')
})

// endpoint
router.use('/', authRouter);
router.use(authenticate)
router.use('/todos', todoRouter); 
router.use('/location', ipRouter);
router.use('/weather', weatherRouter);
router.use('/quote', quoteRouter)

module.exports = router;