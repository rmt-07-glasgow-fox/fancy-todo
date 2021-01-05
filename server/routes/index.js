const router = require('express').Router()
const todosRouter = require('./todos.js')
const authRouter = require('./auth.js')
const { User } = require('../models')
const checkToken = require('../helpers/jwt.js').checkToken

router.use(authRouter)
router.use( async (req, res, next) => {
    try {
        const decoded = checkToken(req.headers.access_token)
        const found = User.findByPk(decoded.id)
        
        if (!found) {
            return res.status(401).json({
                message: "Please login first"
            })
        } else {
            next()
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
} )
router.use('/todos', todosRouter)

router.get('/', (req, res) => {
    return res.status(200).json({
        msg: "Welcome"
    })
} )

module.exports = router