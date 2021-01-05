const router = require('express').Router();
const Controller = require('../controllers/controller.js');
const todo = require('./todo.js');
const user = require('./user.js');

router.get('/', Controller.landing);

router.use('/todos', todo);

router.use('/', user);

module.exports = router;