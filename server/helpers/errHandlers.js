module.exports = (err, req, res, next) => {
    let message
    console.log('masuk errHandlers')
    console.log(err.name, '<name')
    console.log(err)
    if(err.status){
        res.status(err.status).json({message: err.message})
    } else if (err.name == 'SequelizeValidationError'){
        message = err.errors[0].message
        res.status(400).json({message})
    } else {
        res.status(500).json(err.message)
    }
}