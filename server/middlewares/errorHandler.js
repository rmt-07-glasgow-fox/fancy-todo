function errorHandler(err, req, res, next) {
    if (err) {
        switch (err.status) {
            case 400:
                if (err.errors){
                    let errMsg = []
                    err.errors.forEach(error => {
                        errMsg.push(error.message)
                    });
                    res.status(400).json({
                        message: errMsg
                    })
                }
                break;
            case 401:
                if(err.message){
                    res.status(401).json({
                        message: err.message
                    })    
                } else {
                    res.status(401).json({
                        message: "User not authorized"
                    })
                }
            case 404:
                res.status(404).json({
                    message: "Data Not Found"
                })
                break;
            default:
                res.status(500).json({
                    message: "Internal Server Error"
                })
                break;
        }
    }
}

module.exports = errorHandler