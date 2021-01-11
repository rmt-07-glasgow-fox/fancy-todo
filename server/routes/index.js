const express = require('express');
const router = express.Router();

const todoRoutes = require('./todo');
const userRoutes = require('./user');
const holidayRoutes = require('./holiday');
const quoteRoutes = require('./quote');
const projectRoutes = require('./project');
const projectUserRoutes = require('./projectuser');

router.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

router.use('/todos', todoRoutes);
router.use('/users', userRoutes);
router.use('/holidays', holidayRoutes);
router.use('/quotes', quoteRoutes);
router.use('/projects', projectRoutes);
router.use('/projectusers', projectUserRoutes);

module.exports = router;
