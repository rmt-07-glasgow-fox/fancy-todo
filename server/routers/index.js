const router = require('express').Router();
const todo = require('./todo.js');

router.get('/', (req, res) => {
  res.send('OK!');
})

router.use('/', todo);

module.exports = router;