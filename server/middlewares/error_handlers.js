function errorHandlers(err, req, res, next) {
    if (err) {
        console.log(err)
        if(err.name == 'SequelizeValidationError') {
            console.log('masuk err')
            let errMes = err.errors.map(el => {
                return { message: el.message }
            })
            res.status(400).json(errMes)   
        } else {
            switch (err.message) {
                case 'Internal Server Error': 
                    res.status(500).json({message: 'Internal Server Error'})
                    break
                case 'Data Not Found': 
                    res.status(404).json({message: 'Data Not Found'})
                    break
                case 'Unauthorized':
                    res.status(401).json({message: 'Unauthorized'})
                    break
                case 'Invalid Email / Password': 
                    res.status(401).json({message: 'Invalid Email / Password'})
                    break
                default: 
                    res.status(500).json({message: 'Internal Server Error'})
                    break
            }
        }
    }
}

module.exports = { errorHandlers }