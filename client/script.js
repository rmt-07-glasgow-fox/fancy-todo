let baseUrl = "http://localhost:3000"
let todos = []
let currentUser
// let isLogin = true
// let isRegister = false

$(document).ready(function() {
  getWeatherbit()

  checkAuth()
})


// BUTTON, LINK CLICK SECTION
$("#login-btn").click(function(event) {
  event.preventDefault()
  let email = $("#email").val()
  let password = $("#password").val()

  $.ajax({
    method: 'post',
    url: `${baseUrl}/signin`,
    data: {
      email,
      password
    }
  })
  .done((result) => {
    localStorage.setItem('access_token', result.access_token)
    currentUser = result
    checkAuth()
  })
  .fail((error) => {
    console.log(error);
  })
  .always(() => {
    $("#email").val('')
    $("#password").val('')
  })
})

$("#btn-logout").click(function() {
  localStorage.clear()

  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  checkAuth()
})

$("#btn-update").click(function(event) {
  let todoId = $("#btn-update").data('id')
  let title = $("#edit-title-value").val()
  let description = $("#edit-description-value").val()
  let status = $("#edit-status-value").val()
  let duedate = $("#edit-duedate-value").val()

  event.preventDefault()
  $.ajax({
    method: 'put',
    url: `${baseUrl}/todos/${todoId}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      status,
      due_date: duedate
    }
  })
  .then((data) => {
    getTodolist()
    $("#form-edit").hide()
  })
  .fail((error) => {
    console.log(error);
  })
  .always(() => {
    $("#edit-title-value").val('')
    $("#edit-description-value").val('')
    $("#edit-status-value").val('')
    $("#edit-duedate-value").val('')
  })
})


$("#new-todo-form").click(function() {
  $("#todolist").hide()
  $("#form-new").show()
  $("#detail-todo").hide()
})

$("#back-fromdetail-toindex").click(function() {
  $("#detail-todo").hide()
  $("#form-new").hide()
  $("#new-todo-form").show()
  getTodolist()
})

$("#btn-create").click(function(event) {
  event.preventDefault()
  let title = $("#new-title-value").val()
  let description = $("#new-description-value").val()
  let status = $("#new-status-value").val()
  let duedate = $("#new-duedate-value").val()

  onCreate(title, description, status, duedate)
})

$("#register-btn").click(function(event) {
  event.preventDefault()
  $("#login-todolist").hide()
  $("#register-user").show()
})

$("#register-submit").click(function(event) {
  event.preventDefault()
  let email = $("#register-email").val()
  let password = $("#register-password").val()

  $.ajax({
    method: 'post',
    url: `${baseUrl}/signup`,
    data: {email, password}
  })
  .done((user) => {
    $("#register-user").hide()
    $("#login-todolist").show()
  })
  .fail((error) => {
    console.log(error);
  })
  .always(() => {

  })
})

$("#back-to-login").click(function() {
  $("#register-user").hide()
  $("#login-todolist").show()
})






// ===========================================


// FUNCTION SECTION
function getWeatherbit() {
  $.ajax({
    method: 'get',
    url: `${baseUrl}/weather`
  })
  .done((weather) => {
    $("#weatherbit-text").text(weather.city_name + ', ' + weather.temp + ' degree, ' + weather.description)
  })
  .fail((error) => {
  })
  .always(() => {

  })
}

function checkAuth() {
  if (localStorage.access_token) {
    console.log('LOGIN BERHASIL');
    $("#navbar-todolist").show()
    $("#todolist").show()
    $("#login-todolist").hide()
    getTodolist()
    $("#btn-logout").show()
    $("#form-edit").hide()
    $("#form-new").hide()
    $("#detail-todo").hide()
    $("#new-todo-form").show()
    $("#register-user").hide()
    $("#hi-currentuser").text('Hi, ' + currentUser.email)

  } else {
    console.log('LOGIN GAGAL');
    $("#login-todolist").show()
    $("#navbar-todolist").hide()
    $("#todolist").hide()
    $("#btn-logout").hide()
    $("#form-edit").hide()
    $("#form-new").hide()
    $("#detail-todo").hide()
    $("#new-todo-form").hide()
    $("#register-user").hide()
    $("#hi-currentuser").text()
  }
}

function getTodolist() {
  $.ajax({
    method: 'get',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.getItem('access_token', localStorage.access_token)
    }
  })
  .done((todos) => {
    console.log(todos);
    $("#todolist").empty()
    $("#todolist").show()
    todos.forEach((todo) => {
      $("#todolist").append(
      `
      <div class="card col-4" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${todo.title}</h5>
          <p class="card-text">${todo.description}</p>
          <p class="card-text">${todo.status}</p>
          <p class="card-text">${todo.due_date}</p>
          <a href="#" onclick="editTodo(${todo.id})">Edit</a>
          <a href="#" onclick="showTodo(${todo.id})">Show</a>
          <a href="#" onclick="onDelete(${todo.id})">Delete</a>
        </div>
      </div>
      `)
    })
  })
  .fail((error) => {
    console.log(error);
  })
  .always(() => {})
}

// function editTodo(id) {
//   $("#todolist").hide()
//   $("#new-todo-form").hide()
//   $("#form-edit").show()

//   console.log(todo);
//   $("#edit-title-value").val(todo.title)
//   $("#edit-description-value").val(todo.description)
//   $("#edit-status-value").val(todo.status)
//   $("#edit-duedate-value").val(todo.due_date)
//   $("#btn-update").data('id', todo.id)
// }

function editTodo(id) {
  $("#todolist").hide()
  $("#form-edit").show()
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done((todo) => {
    console.log(todo);
    $("#edit-title-value").val(todo.title)
    $("#edit-description-value").val(todo.description)
    $("#edit-status-value").val(todo.status)
    $("#edit-duedate-value").val(todo.due_date)
    $("#btn-update").data('id', todo.id)
  })
  .fail(() => {

  })
  .always(() => {

  })
}


// google function 1
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'post',
    url: `http://localhost:3000/googleSignin`,
    data: {id_token}
  })
  .done((data) => {
    localStorage.setItem("access_token", data.access_token);
    currentUser = data
    checkAuth()
  })
  .fail((error) => {
  })
  .always(() => {

  })
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function onCreate(title, description, status, duedate) {

  $.ajax({
    method: 'post',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      status,
      due_date: duedate
    }
  })
  .done((todo) => {
    $("#form-new").hide()
    getTodolist()
  })
  .fail((error) => {
  })
  .always(() => {
    $("#new-title-value").val('')
    $("#new-description-value").val('')
    $("#new-status-value").val('')
    $("#new-duedate-value").val('')
  })
}

function onDelete(id) {
  $.ajax({
    method: 'delete',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(() => {
    getTodolist()
  })
  .fail((error) => {
  })
  .always(() => {

  })
}

function showTodo(id) {
  $("#todolist").hide()
  $("detail-todo").show()
  $("#new-todo-form").hide()
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done((todo) => {
    $("#detail-todo").show()

    $("#detail-todo-title").val(todo.title)
    $("#detail-todo-description").val(todo.description)
    $("#detail-todo-status").val(todo.status)
    $("#detail-todo-duedate").val(todo.due_date)

  })
  .fail((error) => {
    console.log(error);
  })
  .always(() => {

  })
}