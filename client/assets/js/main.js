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
let tasksDoneContainer = $('#get-tasks-done')
let addTaskBtn = $('#add-task-btn')
let editTaskBtn = $('#edit-task-btn')

registerContainer.hide()
mainTodoSection.hide()

$(document).ready(() => {
  checkAuth()
})

// Auth 

const checkAuth = () => {
  if(localStorage.getItem('access_token')){
    showTodo()
    $('#userEmail a').empty()
    $('#userEmail a').append(localStorage.getItem('email'))
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
      localStorage.setItem('email', res.userData.email)
      showTodo()
      console.log(res, 'res')
    })
    .fail(err => {
      console.log(err.responseJSON, 'err')
      swal({
        title: err.responseJSON.message,
        text: "Please fill in your credentials to login",
        icon: "error",
        button: "OK",
      })
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
      showLogin()
    })
    .fail(err => {
      console.log(err.responseJSON, 'err')
      let errorString = ""
      err.responseJSON.data.forEach((el, index) => {
        errorString += `${el}${index === err.responseJSON.data.length - 1 ? '' : ', '}`
      })
      swal({
        title: err.responseJSON.message,
        text: errorString,
        icon: "error",
        button: "OK",
      });
    })
    .always(_ => {
      console.log('always')
      $('#register-email').val('')
      $('#register-password').val('')
    })
})

logoutBtn.click((e) => {
  localStorage.clear()
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
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
      let tasks = res
      let done = []
      let undone = []
      tasksContainer.empty()
      tasksDoneContainer.empty()
      if(res.length){
        tasks.forEach(task => {
          if(task.status){
            done.push(task)
          }else{
            undone.push(task)
          }
        })
        done.forEach(task => {
          tasksDoneContainer.append(`<div class="card mb-3" style="width: 22rem;">
            <div class="card-body">
              <h5 class="card-title"><s>${task.title}</s></h5>
              <p class="card-text"><s>${task.description}</s></p>
              <p class="card-text"><s>due date : ${task.due_date.slice(0,10)}</s></p>
              <a href="#" id="markBtn" onclick="updateStatus(${task.id}, ${task.status})" class="btn btn-outline-primary">Mark as Undone</a>
              <a href="#" id="editBtn" onclick="editData(${task.id})" class="btn btn-warning" data-toggle="modal" data-target="#editTaskModal">Edit</a>
              <a href="#" id="deleteBtn" onclick="deleteData(${task.id})" class="btn btn-danger">Delete</a>
            </div>
          </div>`)
        })
        if(undone.length > 0){
          undone.forEach(task => {
            tasksContainer.append(`<div class="card mb-3" style="width: 20rem;">
              <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <p class="card-text">due date : ${task.due_date.slice(0,10)}</p>
                <a href="#" id="markBtn" onclick="updateStatus(${task.id}, ${task.status})" class="btn btn-outline-primary">Mark as Done</a>
                <a href="#" id="editBtn" onclick="editData(${task.id})" class="btn btn-warning" data-toggle="modal" data-target="#editTaskModal">Edit</a>
                <a href="#" id="deleteBtn" onclick="deleteData(${task.id})" class="btn btn-danger">Delete</a>
              </div>
            </div>`)
          })
        }else{
          tasksContainer.append('<h2>Woohoo, no work due in soon!</h2>')
        }
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
      let city = res.name
      let temp = res.main.temp
      let weather = res.weather[0].main
      $('#weather a').empty()
      $('#weather a').append(`${city}: ${temp} &#8451; ${weather}`)
    })
    .fail(err => {
      console.log(err.responseJSON, 'err')
    })
    .always(_ => {
      console.log('always')
    })
}

addTaskBtn.click((e) => {
  e.preventDefault()
  $('#addTaskModal').modal('toggle')
  let title = $('#title').val()
  let description = $('#description').val()
  let due_date = $('#due_date').val()
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    data:{
      title,
      description,
      status: false,
      due_date
    },
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(res => {
      swal({
        title: "Success",
        text: "New task been added",
        icon: "success",
        button: "OK",
      });
      checkAuth()
    })
    .fail(err => {
      let errorString = ""
      err.responseJSON.data.forEach((el, index) => {
        errorString += `${el}${index === err.responseJSON.data.length - 1 ? '' : ', '}`
      })
      swal(errorString, {
        icon: "error",
      });
    })
    .always(_ => {
      console.log('always')
      $('#title').val('')
      $('#description').val('')
      $('#due_date').val('')
    })
})

const updateStatus = (id, status) => {
  console.log(status)
  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/todos/${id}`,
    data:{
      status: !status,
    },
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(res => {
      checkAuth()
    })
    .fail(err => {
      console.log(err.responseJSON, 'err')
    })
    .always(_ => {
      console.log('always')
    })
}

const editData = (id) => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${id}`,
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(res => {
      $('#edit-title').val(res.title)
      $('#edit-description').val(res.description)
      $('#edit-due_date').val(res.due_date.slice(0,10))
    })
    .fail(err => {
      console.log(err.responseJSON, 'errsadasd')
    })
    .always(_ => {
      console.log('always')
    })
  editTaskBtn.click(e => {
    $('#editTaskModal').modal('toggle')
    e.preventDefault()
    let title = $('#edit-title').val()
    let description = $('#edit-description').val()
    let due_date = $('#edit-due_date').val()
    $.ajax({
      method: 'PUT',
      url: `${baseUrl}/todos/${id}`,
      headers:{
        access_token: localStorage.getItem('access_token')
      },
      data:{
        title,
        description,
        due_date
      }
    })
      .done(res => {
        checkAuth()
      })
      .fail(err => {
        let errorString = ""
        err.responseJSON.data.forEach((el, index) => {
          errorString += `${el}${index === err.responseJSON.data.length - 1 ? '' : ', '}`
        })
        swal(errorString, {
          icon: "error",
        });
      })
      .always(_ => {
        $('#edit-title').val('')
        $('#edit-description').val('')
        $('#edit-due_date').val('')
      })
  })
}

const deleteData = (id) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Your file has been deleted!", {
        icon: "success",
      });
      $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
        .done(res => {
          checkAuth()
        })
        .fail(err => {
          console.log(err.responseJSON, 'err')
        })
        .always(_ => {
          console.log('always')
        })
    } else {
      checkAuth()
    }
  });
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/googleLogin`,
    data:{
      id_token
    }
  })
    .done(res => {
      console.log(res)
      localStorage.setItem('access_token', res.jwtToken)
      localStorage.setItem('email', res.userData.email)
      checkAuth()
    })
    .fail(err => {
      console.log(err)
    })
}