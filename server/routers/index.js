const router = require('express').Router();
const todos = require('./todos.js');

router.get('/', (req, res) => {
  res.send('OK!');
})

router.use('/', todos);

module.exports = router;