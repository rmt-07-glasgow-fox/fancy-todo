module.exports = (err, req, res, next) => {
    if(err.status){
        console.log('masuk status')
        res.status(err.status).json({
            message: err.message
        })
    } else if (err.name == "SequelizeValidationError") {
        const dataError = []
        for (let i = 0 ; i < err.errors.length; i++){
            dataError.push(err.errors[i].message)
        }
        res.status(400).json({message: dataError})
    } else {
        console.log(err,'<<<<<<<<<<<<,')
        res.status(500).json({message: 'internal server error'})
    }
}
