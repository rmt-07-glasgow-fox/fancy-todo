const axios = require('axios')

module.exports = (req,res,next) => {
    const emailValidation = "https://emailvalidation.abstractapi.com/v1/?api_key=" + process.env.API_KEY + "&email=" + req.body.email
    axios.get(emailValidation)
    .then(data => {
        if(data.data.is_valid_format.value){
            next()
        } else {
            throw {
                status: 400,
                message: "wrong email format"
            }
        }
    })
    .catch(error => {
        next(error)
    })
}
