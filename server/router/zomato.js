const express = require('express')
const router = express.Router()
const RestoController = require('../controller/restocontroller')

router.get('/', RestoController.getResto)

module.exports = router