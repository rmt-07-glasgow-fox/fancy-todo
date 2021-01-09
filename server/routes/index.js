const express = require('express');
const authRoute = require('./authRoute');
const movieRoutes = require('./movieRoutes');
const todosRoute = require('./todosRoute');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Fancy Todo');
});
router.use('/', authRoute);
router.use('/todos', todosRoute);
router.use('/movies', movieRoutes);

module.exports = router;