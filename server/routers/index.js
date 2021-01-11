const router = require('express').Router();

const api = require('./api.js');
const todo = require('./todo.js');
const user = require('./user.js');
const Controller = require('../controllers/controller.js');
const { authenticate } = require('../middlewares/auth.js');

router.get('/', Controller.landing);

router.use('/', user);

router.use(authenticate);
router.use('/', api);
router.use('/todos', todo);

module.exports = router;