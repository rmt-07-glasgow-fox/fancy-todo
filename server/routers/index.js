const router = require('express').Router();
const todoRouter = require('./todo');
const userRouter = require('./userAuth');
const weatherRouter = require('./weather')
const {
  Controller
} = require('../controllers');
const {
  authentication
} = require('../middlewares/auth');

router.get('/', Controller.getRootHandler);
router.use('/', userRouter);
router.use('/weather', weatherRouter);
router.use(authentication);
router.use('/todos', todoRouter);

module.exports = router;