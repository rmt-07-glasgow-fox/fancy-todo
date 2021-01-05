const router = require('express').Router()
const ControllerWelcome = require("../controllers/welcome") 

router.get("/", ControllerWelcome.index) 


module.exports = router