const router = require("express").Router()
const CovidController = require("../controllers/thirdApi")

router.get("/cases", CovidController.getLiveReport)

module.exports = router