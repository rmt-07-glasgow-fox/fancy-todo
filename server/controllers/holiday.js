const axios = require('axios');
const moment = require('moment');

const url = `https://calendarific.com/api/v2/holidays`;

exports.year = async (req, res) => {
  try {
    const response = await axios.get(url, {
      params: {
        api_key: process.env.CALENDARIFIC_API_KEY,
        country: 'ID',
        year: moment().year(),
        type: 'national',
      },
    });
    return res.status(200).json(response.data.response.holidays);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.month = async (req, res) => {
  try {
    const response = await axios.get(url, {
      params: {
        api_key: process.env.CALENDARIFIC_API_KEY,
        country: 'ID',
        year: moment().year(),
        month: moment().month() + 1,
        type: 'national',
      },
    });
    return res.status(200).json(response.data.response.holidays);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.day = async (req, res) => {
  try {
    const response = await axios.get(url, {
      params: {
        api_key: process.env.CALENDARIFIC_API_KEY,
        country: 'ID',
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date(),
        type: 'national',
      },
    });
    return res.status(200).json(response.data.response.holidays);
  } catch (error) {
    return res.status(500).json(error);
  }
};
