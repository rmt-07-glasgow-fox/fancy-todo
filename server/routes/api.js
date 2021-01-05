const router = require('express').Router()

const Api = require('../controllers/api-controller.js')

router.get('/api', Api.showData)


module.exports = router