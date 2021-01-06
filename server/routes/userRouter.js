const router = require('express').Router()

const Controller = require('../controller/userController')

router.post('/login', Controller.login)

router.post('/googleLogin',(req, res) => {
    res.send('proses develop')
})

router.post('/register', Controller.register)




module.exports = router