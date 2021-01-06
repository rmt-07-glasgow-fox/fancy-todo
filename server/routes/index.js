const router = require('express').Router()
const axios = require('axios')
const todosRouter = require('./todos.js')
const authRouter = require('./auth.js')
const { authenticate } = require('../middlewares/auth.js')
const { response } = require('express')

router.use(authRouter)

router.use(authenticate)
router.use('/todos', todosRouter)

router.get('/', (req, res) => {
    const apiUrl = "https://official-joke-api.appspot.com/jokes/programming/random"
    axios.get(apiUrl)
    .then( response => {
        return res.status(200).json({
            msg: "welcome",
            setup: `${response.data[0].setup}`,
            punchline: `${response.data[0].punchline}`
        })
    } )
    .catch( error => {
        return res.status(500).json({
            msg: error.message
        })
    } )
} )

module.exports = router