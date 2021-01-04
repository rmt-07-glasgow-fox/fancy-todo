const express = require('express');
const router = express.Router();

const todoRoutes = require('./todo');
const authRoutes = require('./auth');

router.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

router.use('/todos', todoRoutes);
router.use(authRoutes);

module.exports = router;
