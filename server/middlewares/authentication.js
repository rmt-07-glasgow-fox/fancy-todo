const jwt = require('jsonwebtoken')
const SECRET_CODE = process.env.SECRET_CODE

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, SECRET_CODE, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: "Access forbidden."
                })
            }

            req.user = decoded
            next()
        })
    } else {
        res.redirect('/login')
    }
}


module.exports = authenticateJWT

