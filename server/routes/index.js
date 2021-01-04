const router = require('express').Router();
const todos = require('./todos-router');
const user = require('./users-router');

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'welcome'
    })
});
router.use('/user', user);
router.use('/todos', todos);

module.exports = router;