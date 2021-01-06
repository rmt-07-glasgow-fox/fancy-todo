const express = require('express');
const router = express.Router();

const todoRoutes = require('./todo');
const userRoutes = require('./user');
const holidayRoutes = require('./holiday');
const quoteRoutes = require('./quote');

router.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

router.use('/todos', todoRoutes);
router.use('/users', userRoutes);
router.use('/holidays', holidayRoutes);
router.use('/quotes', quoteRoutes);

module.exports = router;
