const express = require('express');
const authRoute = require('./authRoute');
const todosRoute = require('./todosRoute');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Fancy Todo');
});
router.use('/', authRoute);
router.use('/todos', todosRoute);

module.exports = router;