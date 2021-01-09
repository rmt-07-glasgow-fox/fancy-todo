const baseUrl = "http://localhost:3000"
let todoList = []
let errors = []

function checkAuth() {
  if(localStorage.access_token) {
    $(`#login-page`).hide()
    $(`#register-page`).hide()
    getTodo()
    $(`#quotes-list`).show()
    $(`#todo-list`).show()
    $(`#btn-logout`).show()
    $(`#add-todo`).hide()
    $(`#btn-add-task`).show()
  } else {
    $(`#login-page`).show()
    $(`#register-page`).hide()
    $(`#todo-list`).hide()
    $(`#btn-logout`).hide()
    $(`#update-todo`).hide()
    $(`#btn-add-task`).hide()
    $(`#add-todo`).hide()
    $(`#quotes-list`).hide()
  }
}

//========== REGISTER ==========

function register() {
  const email = $(`#input-register-email`).val()
  const password = $(`#input-register-password`).val()
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/register`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    alert("data successfully created")
    cancelRegister()
  })
  .fail(err => {
    console.log(err);
    errors = err.errors
    errors.forEach(e => {
      $(`#client-errors`).append(`<h3>Todo App</h3>`)
    })
  })
}

//========== LOGIN ==========

function login() {
  const email = $(`#input-login-email`).val()
  const password = $(`#input-login-password`).val()
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    localStorage.setItem("access_token",response.access_token)
    // localStorage.access_token = response.access_token
    checkAuth()
  })
  .fail(err => {
    console.log(err);
  })
  .always(() => {
    $(`#input-login-email`).val('')
    $(`#input-login-password`).val('') 
  })
}

//========== GOOGLE LOGIN ==========

function onSignIn(googleUser) { //===============================
  const id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/googleSignIn`,
    data: {id_token: id_token}
  })
  .done(response => {
    localStorage.setItem(`access_token`,response.access_token)
  })
  .fail((xhr,status) => {
  })
}

//========== GET ALL TODO ==========

function getTodo() {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    $(`#todo-list`).show()
    $(`#update-todo`).hide()
    $(`#todo-list`).empty();
    todoList = response;
    todoList.forEach(e => {
      $(`#todo-list`).append(
        `<div class="card" style="width: 20rem;">
        <div class="card-body">
        <h2 class="card-title">${e.title}</h5>
        <p class="card-text">${e.description}</p>
        <p class="card-text">Status: <strong>${e.status}</strong></p>
        <p class="card-text">Due-date: <strong>${e.due_date}</strong></p>
        <button class="btn btn-primary" onclick="getOneTodo(${e.id})">Update</button>
        <button class="btn btn-warning" onclick="deleteTodo(${e.id})">Delete</button>
        <button class="btn btn-secondary" onclick="patch(${e.id})">Mark as done</button>
        </div>
        </div>`)
      });
    })
  .fail(err => {
    console.log(err);
  })
}

//========== GET ONE TODO ==========
  
function getOneTodo(id) {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    $(`#btn-update`).data(`id`,id)
    $(`#update-title-input`).val(response.title)
    $(`#update-description-input`).val(response.description)
    $(`#update-due_date-input`).val(response.due_date)
    showUpdateForm()
  })
  .fail(err => {
    console.log(err);
  })
}

//========== ADD ==========

function add() {
  const title = $(`#add-title-input`).val()
  const description = $(`#add-description-input`).val()
  const due_date = $(`#add-due_date-input`).val()
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    data: {
      title,
      description,
      due_date
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    $(`#add-todo`).hide();
    getTodo()
  })
  .fail(err => {
    console.log(err);;
  })
}

//========== DELETE ==========
  
function deleteTodo(id) {
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    getTodo()
  })
  .fail(err => {
    console.log(err);
  })
}

//========== UPDATE ==========

function update(id) {
  let title = $(`#update-title-input`).val()
  let description = $(`#update-description-input`).val()
  let due_date = $(`#update-due_date-input`).val()
  $.ajax({
    method: 'PUT',
    url: `${baseUrl}/todos/${id}`,
    data: {
      title,
      description,
      due_date
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    getTodo()
  })
  .fail(err => {
    console.log(err);
  })
}

//========== PATCH ==========

function patch(id) {
  const status = $(`#input-register-email`).val()
  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/todos/${id}`,
    data: {
      status: "done"
    },
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    getTodo()
  })
  .fail(err => {
  })
}

//========== GET API ==========

const getQuotes = () => {
    $.ajax({
      method: 'GET',
      url: `${baseUrl}/quotes`,
    })
    .done(response => {
      randomId = Math.ceil(Math.random()*response.length)
      $(`#quotes-list`).append(
        `<div class="card" style="text-align=center;">
        <div class="card-body">
        <p class="card-text">${response[randomId].text} - <strong>${response[randomId].author}</strong></p>
        </div>
        </div>`)
    })
  .fail(err => {
  })
}

//========== SHOW HIDE FUNCTIONS ==========

function showRegisterForm() {
  $(`#login-page`).hide()
  $(`#register-page`).show()
}

function cancelRegister() {
  $(`#login-page`).show()
  $(`#register-page`).hide()
}

function showUpdateForm() {
  $(`#todo-list`).hide()
  $(`#update-todo`).show()
}

function cancelUpdate() {
  $(`#todo-list`).show()
  $(`#update-todo`).hide()
}

$(document).ready(function(){
  getQuotes()
  checkAuth()

//========== LOGIN ==========

  $(`#login-btn`).click(function(event) {
    event.preventDefault()
    login()
  })

// ========== LOGOUT BUTTON ==========

  $(`#btn-logout`).click(function(event) {
    event.preventDefault()
    localStorage.clear()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    checkAuth()
  })

//========== REGISTER ==========

  $(`#register-btn`).click(function(event) {
    event.preventDefault()
    register()
  })

//========== ADD TODO ==========

  $(`#btn-add-task`).click(function(event) {
    event.preventDefault()
    $(`#add-todo`).show();
    $(`#add-title-input`).val('')
    $(`#add-description-input`).val('')
    $(`#add-due_date-input`).val('')
  })

  $(`#btn-add`).click(function(event) {
    event.preventDefault()
    add()
  })

  $(`#btn-cancel-add`).click(function(event) {
    event.preventDefault()
    $(`#add-todo`).hide();
    $(`#todo-list`).show();
  })

// ========== UPDATE ==========

  $(`#btn-update`).click(function(event) {
    event.preventDefault()
    const todoId = $(`#btn-update`).data(`id`)
    update(todoId)
  })
  $(`#btn-cancel-update`).click(function(event) {
    event.preventDefault()
    cancelUpdate()
  })

//========== REGISTER ==========

  $(`#btn-register-form`).click(function(event) {
    event.preventDefault()
    showRegisterForm()
  })
  $(`#btn-register-cancel`).click(function(event) {
    event.preventDefault()
    cancelRegister()
  })
})