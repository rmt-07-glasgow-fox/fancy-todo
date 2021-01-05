const router = require('express').Router()
const { authenticate } = require('../middleware/auth')
const auth = require('./auth')
const event = require('./event')

router.get('/',(req,res)=>{
    res.status(200).json({
        message: "Welcome to fancy TODO apps"
    })
})

router.use(auth)
router.use(authenticate)
router.use('/todos',event)

module.exports = router
