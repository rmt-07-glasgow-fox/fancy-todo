
let baseUrl = "http://localhost:3000"
let todos = []

$(document).ready(function() {

  checkAuth()
})


// BUTTON, LINK CLICK SECTION
$("#login-btn").click(function(event) {
  event.preventDefault()
  let email = $("#email").val()
  let password = $("#password").val()

  console.log(email, password, '->>>>>>>');

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
  event.preventDefault()
  $.ajax({
    method: 'put',
    url: `${baseUrl}/todos/${todoId}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .then((data) => {
    console.log(data, 'HASIL UPDATE PUT');
    getTodolist()
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

// $("#link-delete").click(function() {
//   $.ajax({
//     method: 'delete',
//     url: `${baseUrl}/todos/`
//   })
// })





// FUNCTION SECTION
function checkAuth() {
  if (localStorage.access_token) {
    console.log('LOGIN BERHASIL');
    $("#navbar-todolist").show()
    $("#todolist").show()
    $("#login-todolist").hide()
    getTodolist()
    $("#btn-logout").show()
    $("#form-edit").show()
  } else {
    console.log('LOGIN GAGAL');
    $("#login-todolist").show()
    $("#navbar-todolist").hide()
    $("#todolist").hide()
    $("#btn-logout").hide()
    $("#form-edit").hide()
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
          <a href="#">Show</a>
          <a href="#">Delete</a>
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

function editTodo(id) {
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
    checkAuth()
  })
  .fail((error) => {
    console.log(error, 'ERRORR EUY');
  })
  .always(() => {

  })
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}