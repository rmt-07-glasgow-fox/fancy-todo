const axios = require ('axios')

async function axiosWeather () {
  try {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Jakarta&callback=test&appid=4cbc37962112990eed1f1a20d71d34e6');
    
    return response
  } catch (err) {
    console.error (err, 'error api')
  }
} 

async function getWeather () {
  try {
    let weatherData = await axiosWeather ()
    weatherData.data = weatherData.data.slice (5)
    weatherData.data = weatherData.data.slice (0, -1)
    let weather = await JSON.parse (weatherData.data)

    return weather
  } catch (err) {
    console.log (err, 'error getWeather')
  }
}



module.exports = {
  getWeather
}