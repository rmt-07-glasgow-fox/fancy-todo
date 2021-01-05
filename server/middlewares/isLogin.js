const cekToken = require('../helpers/decodejwt');
const { User } = require('../models');

const isLogin = async(req, res, next) => {
    try {
        const decoded = cekToken(req.headers.authorization)
        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            next({ name: "authValidate" })
        }

        req.user = decoded;

        return next();

    } catch (err) {
        next(err)
    }

}

module.exports = isLogin