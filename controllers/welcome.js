class ControllerWelcome{
    static index(req, res){
        res.send("this is welcome page")
    }
}

module.exports = ControllerWelcome