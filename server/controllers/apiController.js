const axios = require('axios');

class APIController {
  static async getAnimeQuote(req, res, next) {
    try {
      let url = 'https://animechanapi.xyz/api/quotes/random';

      const animeQuote = await axios.get(url);

      res.status(200).json({
        quote: animeQuote.data.data[0].quote,
        character: animeQuote.data.data[0].character,
        anime: animeQuote.data.data[0].anime
      });
    } catch (err) {
      next(err);
    };
  };
};

module.exports = APIController;

