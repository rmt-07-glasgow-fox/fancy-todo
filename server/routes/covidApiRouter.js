const router = require("express").Router()
const CovidController = require("../controllers/apiCovidController")

router.get("/cases", CovidController.getLive)

module.exports = router