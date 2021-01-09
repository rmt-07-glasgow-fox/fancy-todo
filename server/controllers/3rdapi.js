const axios = require('axios')

class apiController {

    static async weather (req, res, next) {
        axios({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/1047378/'
        })
        .then(data => {
            let result = data.data.consolidated_weather
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static async videos (req, res, next) {
        // let idArtist = Math.floor(Math.random() *145508)
        let i = 111352
        // if(idArtist <= 111233 && idArtist >= 145508) {
        //     i = idArtist
        //     console.log(i, 'i');
        // } else {
        //     idArtist += 100000
        //     if(idArtist >= 145508){
        //         i = 111352
        //     } else {
        //         i = idArtist
        //     }
        // }
        // console.log(i);
        axios({
            method: 'GET',
            url: 'https://theaudiodb.com/api/v1/json/1/mvid.php',
            params: {
                i
            }
        })
        .then(data => {
            if (data.data.mvids.length >= 10) {
                let index = Math.floor(Math.random() *data.data.mvids.length-10)
                data.data.mvids = data.data.mvids.slice(index, index+10)
                res.status(200).json(data.data.mvids)
            } else {
                res.status(200).json(data.data.mvids)
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = apiController