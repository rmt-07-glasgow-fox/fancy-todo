const axios = require('axios').default
const qs = require('qs')

const BASE_URL = 'https://api.mailgun.net/v3'
const API_KEY = process.env.MAILGUN_API_KEY
const DOMAIN = process.env.MAILGUN_DOMAIN

const sendMail = (user, todo) => {
  let url = `${BASE_URL}/${DOMAIN}/messages`
  let data = {
    from: 'me@fancy-todo.com',
    to: user.email,
    subject: `TODO: ${todo.title}`,
    text: todo.description + '\nDeadline: ' + todo.due_date
  }

  return axios({
    method: 'post',
    url: url,
    auth: {
      username: 'api',
      password: API_KEY
    },
    data: qs.stringify(data)
  })
}

module.exports = {
  sendMail
}
