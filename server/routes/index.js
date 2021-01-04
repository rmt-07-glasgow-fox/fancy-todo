const router = require('express').Router();
const FancyController = require('../controllers/TodoController')

router.get('/', FancyController.homepage)

module.exports = router;