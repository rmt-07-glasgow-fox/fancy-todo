const router = require('express').Router()
const { api } = require('../controllers')
const { authentication, authorization } = require('../middlewares')

router.get('/jooks', api.jooks)
router.get('/quotes', api.quotes)

module.exports = router;