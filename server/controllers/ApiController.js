const { getWeather } = require ('../helper/axios')
const { checkToken } = require ('../helper/jwt')

class ApiController {
  static async getWeather (req, res, next) {
    try {
      let weather = await getWeather (req.params.cityName)
      res.status (200). json (weather)
    } catch (err) {
      res.status (400). jsson ({message: 'error get weather'})
    }
  }
}

module.exports = ApiController