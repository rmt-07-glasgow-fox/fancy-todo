const axios = require('axios');

const url = `http://api.quotable.io`;

exports.qod = async (req, res, next) => {
  try {
    const response = await axios.get(url + '/random');
    return res.status(200).json(response.data);
  } catch (err) {
    next(err);
  }
};
