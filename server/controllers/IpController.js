const axios = require('axios');

class IpController {
    static checkIpAddress(req, res, next) {
        const baseUrl = "http://api.ipstack.com/check";
        const option = {
            params: {
                access_key: process.env.API_KEY_IPADDRESS,
            }
        }

        axios.get(baseUrl, option)
            .then(response => {
                res.status(200).json({
                    city: response.data.city,
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = IpController;