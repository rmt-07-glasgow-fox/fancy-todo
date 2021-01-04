const router = require("express").Router()
const auth = require('./auth.js')
const schedule = require('./schedule.js')

router.use(auth)

router.use('/todos', schedule)

module.exports = router