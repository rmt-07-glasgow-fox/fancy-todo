// AUTH VARIABLES
let authSection = $('#auth')
let loginContainer = $('#login-container')
let loginLink = $('#login-link a')
let loginBtn = $('#login-btn')
let registerContainer = $('#register-container')
let registerLink = $('#register-link a')
let registerBtn = $('#register-btn')
let logoutBtn = $('#logout-btn')

// BASE URL
let baseUrl = 'http://localhost:3000'

// TODO VARIABLES
let mainTodoSection = $('#main-todo')

registerContainer.hide()
mainTodoSection.hide()

$(document).ready(() => {
  if(localStorage.getItem('access_token')){
    showTodo()
  }
})

// Auth 

const showTodo = () => {
  authSection.hide()
  mainTodoSection.show()
}

const showAuth = () => {
  authSection.show()
  mainTodoSection.hide()
}

const showRegister = () => {
  loginContainer.hide()
  registerContainer.show()
}

const showLogin = () => {
  loginContainer.show()
  registerContainer.hide()
}

loginLink.click(() => {
  showLogin()
})

registerLink.click(() => {
  showRegister()
})

loginBtn.click((e) => {
  e.preventDefault()
  let email = $('#email').val()
  let password = $('#password').val()
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data:{
      email,
      password
    }
  })
    .done(res => {
      localStorage.setItem('access_token', res.jwtToken)
      showTodo()
      console.log(res, 'res')
    })
    .fail(err => {
      console.log(err.responseJSON, 'err')
      alert(err.responseJSON.message)
    })
    .always(_ => {
      console.log('always')
      $('#email').val('')
      $('#password').val('')
    })
})

registerBtn.click((e) => {
  e.preventDefault()
  let email = $('#register-email').val()
  let password = $('#register-password').val()
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/register`,
    data:{
      email,
      password
    }
  })
    .done(res => {
      console.log(res, 'res')
    })
    .fail(err => {
      console.log(err.responseJSON, 'err')
    })
    .always(_ => {
      console.log('always')
      $('#register-email').val('')
      $('#register-password').val('')
    })
})

logoutBtn.click((e) => {
  localStorage.removeItem('access_token')
  showAuth()
})

// Todo
