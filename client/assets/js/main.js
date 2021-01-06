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
let newsContainer = $('#get-news')
let tasksContainer = $('#get-tasks')

registerContainer.hide()
mainTodoSection.hide()

$(document).ready(() => {
  checkAuth()
})

// Auth 

const checkAuth = () => {
  if(localStorage.getItem('access_token')){
    showTodo()
  }else{
    showAuth()
  }
}

const showTodo = () => {
  authSection.hide()
  mainTodoSection.show()
  getTasks()
  getNews()
  getWeather()
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
  checkAuth()
})

// Todo
const getTasks = () => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(res => {
      console.log(res, 'res')
      let tasks = res
      tasksContainer.empty('')
      if(res.length){
        tasks.forEach(task => {
          tasksContainer.append(`<div class="card mb-3" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <a href="#" id="patchDone" class="btn btn-warning">Mark as Done</a>
          </div>
        </div>`)
        })
      }else{
        tasksContainer.append(`<h2>${res.message}</h2>`)
      }
    })
    .fail(err => {
      console.log(err.responseJSON, 'err')
    })
    .always(_ => {
      console.log('always')
    })
}

const getNews = () => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/news`,
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(res => {
      console.log(res.articles, 'res')
      let articles = res.articles
      newsContainer.empty('')
      articles.forEach(article => {
        newsContainer.append(`<div class="card mb-3" style="width: 18rem;">
          <img class="card-img-top" src=${article.urlToImage} alt="news thumbnail">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <a href="${article.url}" target="_blank" class="btn btn-primary">Go to article</a>
          </div>
        </div>`)
      })
    })
    .fail(err => {
      console.log(err.responseJSON, 'err')
    })
    .always(_ => {
      console.log('always')
    })
}

const getWeather = () => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/weather`,
    headers:{
      access_token: localStorage.getItem('access_token')
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
    })
}