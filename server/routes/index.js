const router = require ("express").Router ()
const todoRoutes = require ("./todo")
const userRoutes = require ("./user")

router.get ("/", (req, res) => {
    res.send ( "Welcome" )
})

router.use ("/todos", todoRoutes)
router.use (userRoutes)


module.exports = router