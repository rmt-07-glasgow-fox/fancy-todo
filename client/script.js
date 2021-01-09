let baseUrl = 'http://localhost:3000'

$(document).ready(function(){
  auth()
  $('#registerPage').hide()
});

function auth() {
  //check whether a token exist
  if (localStorage.access_token) {
    $('#loginPage').hide()
    $('#registerPage').hide()
    $('#logout-btn').show()
    showTodos()
    $('#showTodos').show()
    
  }
  else {
    $("#loginPage").show()
    $('#logout-btn').hide()
    $('#showTodos').hide()
  }
}

// *** LOGIN ***
$("#loginButton").click(function(event) {
  event.preventDefault();
  let email = $("#email").val()
  let password = $("#password").val()
  console.log('Login Triggered');

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {
      email: email,
      password: password
    }
  })
  .done(response => {
    // save token to local storage
    console.log(`Login success, you get token:`, response.access_token);
    $('#notification').empty()
    localStorage.setItem('access_token', response.access_token)
    auth()
  })
  .fail(err => {
    console.log(err);
    $('#notification').append(`Password Invalid`)
  })
  .always(() => {
    console.log('always');
  })
})

// *** GOOGLE LOGIN ***
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `${baseUrl}/loginGoogle`,
    data: { id_token }
  })
  .done(response => {
    // console.log(response);
    localStorage.setItem("access_token", response.access_token)
    auth()
  })
  .fail((xhr, status) => {

  })

  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}


// *** REGISTER ***
$('#register-btn').click(function(event) {
  event.preventDefault()
  $('#registerPage').show()
  auth()
})

$("#registerButton").click(function(event) {
  event.preventDefault();
  let email = $("#emailRegister").val()
  let password = $("#passwordRegister").val()
  console.log('Register Triggered');

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/register`,
    data: {
      email: email,
      password: password
    }
  })
  .done(response => {
    // save token to local storage
    console.log(`Register success, you get:`, response);
    $('#notification').empty()
    $('#notification').append(`Register success, your registered email:`, email)
    auth()
  })
  .fail(err => {
    console.log(err);
    $('#notification').append(`Password Invalid`)
  })
  .always(() => {
    console.log('always');
  })
})

// *** LOGOUT ***
$('#logout-btn').click(function(event) {
  event.preventDefault()
  localStorage.clear()
  auth()
})

// ******************** CRUD ********************

function showTodos() {
  console.log('showTodos CRUD function running');
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    //reset todosValue
    $("#showTodosValue").empty()
    //populate
    response.forEach(element => {
      $("#showTodosValue").append(`
        <div class="container ">
          <div><h2>${element.title}</h2></div>
          <div>${element.description}</div>
          <div>${element.due_date}</div>
          <div>${element.status}</div>
          <button id="updateTodo" onclick="updateTodo(${element.id})" type="submit">Update</button>
          <button id="deleteTodo" onclick="deleteTodo(${element.id})" type="submit">Delete</button>
          <div><br></div>
        </div>`)
    });
  })
  .fail(err => {})
}

// *** CREATE TODO ***
$('#createTodo').click(function(event) {
  console.log('createTodo CRUD running');
  event.preventDefault()
  let title = $('#title').val()
  let description = $('#description').val()
  let due_date = $('#due_date').val()
  let status = $('#status').val()
  
  console.log({title, description, due_date, status});
  //ajax
  $.ajax({
    method: "POST",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
  .done(response => {
    console.log(`Success addTodo:`, response);
    auth()
  })
  .fail(err => {
  })
  auth()
})

// *** DELETE TODO ***
function deleteTodo(id) {
  $.ajax({
    method: "DELETE",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
  })
  .done(response => {
    auth()
  })
  .fail(err => {
    $('#notification').empty()
    $('#notification').append(`${err.statusText}`)
  })
}