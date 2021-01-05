const cekToken = require('../helpers/decodejwt');
const { User } = require('../models');

const isLogin = async(req, res, next) => {
    try {
        const decoded = cekToken(req.headers.authorization)
        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            return res.status(401).json({ message: 'Please login first' });
        }

        req.user = decoded;

        return next();

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

module.exports = isLogin