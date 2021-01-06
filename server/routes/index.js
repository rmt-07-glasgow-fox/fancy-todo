const router = require('express').Router()
const todosRouter = require('./todosRouter')
const authRouter = require('./auth')
const { authenticate } = require('../middlewares/auth')



router.get('/', (req, res) => {
  res.send('ini home')
})

router.use(authRouter)

router.use(authenticate)
router.use('/todos',todosRouter)


module.exports = router