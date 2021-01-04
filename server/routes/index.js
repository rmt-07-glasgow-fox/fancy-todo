const express = require('express');
const router = express.Router();

const todoRoutes = require('./todo');

router.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

router.use('/todos', todoRoutes);

module.exports = router;
