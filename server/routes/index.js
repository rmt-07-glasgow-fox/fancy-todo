const express = require('express');
const router = express.Router();

const todoRoutes = require('./todo');
const userRoutes = require('./user');
const holidayRoutes = require('./holiday');

router.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

router.use('/todos', todoRoutes);
router.use('/users', userRoutes);
router.use('/holidays', holidayRoutes);

module.exports = router;
