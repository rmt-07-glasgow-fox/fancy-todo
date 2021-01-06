function errorHandler (err, req, res, next) {
    console.log(err)
    const {code, msg, origin} = err
    switch(code) {
        case 400:
            return res.status(code).json({message:msg})
        case 401:
            if (origin === 'authenticate') {
                return res.status(code).json({ message: "Please Login First"})
            }
            else if (origin === 'user') {
                return res.status(code).json({ message: "Invalid Username / Password"})
            }
            else if (origin === 'authorize'){
                 return res.status(code).json({ message: "not authorize" }) 
            } else {
                return res.status(code).json({ message:msg }) 
            }
        case 404:
            return res.status(code).json({message: 'data not found'})
        default:
            res.status(code).json({message:'internal server error'})
            break
        }
}

module.exports = {errorHandler}