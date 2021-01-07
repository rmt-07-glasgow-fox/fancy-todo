const router = require('express').Router();
const todos = require('./todos-router');
const users = require('./user-router');
const weather = require('./weather-router');
const { authenticate } = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'welcome'
    })
});
router.use(users);
router.use('/weather', weather);
router.use(authenticate);
router.use('/todos', todos);

module.exports = router;