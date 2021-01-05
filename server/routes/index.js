const router = require('express').Router()
const auth = require('./auth')

router.get('/',(req,res)=>{
    res.status(200).json({
        message: "Welcome to fancy TODO apps"
    })
})

router.use(auth)

module.exports = router
