function errorHandler(err, req, res , next){
    if (err.name === "SequelizeValidationError"){
        let message = []
        err.errors.forEach(el => {
            message.push(el.message)
        })
        res.status(400).json({Errors : message})
    } 
    else if (err.name === "JsonWebTokenError"){
        res.status(400).json({message : err.message})
    }
    else if (err.name === "Do not have access") {
        res.status(401).json({message: 'Do not have access'})
    }
    else if (err.name === 'Not found'){
        res.status(404).json({message : 'Not found'})
    }
    else if (err.name === "SequelizeUniqueConstraintError"){
        let message = ['Email has been registered']
        res.status(400).json({Errors : message})
    }
    else {
        res.status(500).send({message : 'Internal Server Error'})
    }
}

module.exports = errorHandler