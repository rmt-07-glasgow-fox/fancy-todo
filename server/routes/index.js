const express = require('express');
const router = express.Router();

const todoRoutes = require('./todo');
const userRoutes = require('./user');

router.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

router.use('/todos', todoRoutes);
router.use('/users', userRoutes);

module.exports = router;
