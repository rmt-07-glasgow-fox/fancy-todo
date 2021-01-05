const router = require('express').Router();
const Controller = require('../controllers/controller.js');
const todo = require('./todo.js');
const { authenticate } = require('../middlewares/auth.js')
const user = require('./user.js');


router.get('/', Controller.landing);

router.use('/', user);

router.use(authenticate)
router.use('/todos', todo);

module.exports = router;