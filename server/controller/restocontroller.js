const axios = require('axios')

class RestoController {
      static getResto(req, res) {
            let restoUrl = "https://developers.zomato.com/api/v2.1/restaurant?res_id=50"

            axios.get(restoUrl, {
                  headers: {
                        user_key: process.env.ZOMATO_USER_KEY
                  }
            }) 
                  .then(response => {
                        let resto = {
                              restoName: response.data.name,
                              location: response.data.location.city,
                              timing: response.data.timings,
                              menu: response.data.menu_url

                        }
                        res.send(resto)
                        // res.send(response.data)
                  })
                  .catch(err => {
                        res.send(err)
                  })
      }
}

module.exports = RestoController