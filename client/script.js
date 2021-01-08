let baseUrl = 'http://localhost:3000'

$(document).ready(function(){
  auth()
  $('#registerPage').hide()
}); 

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