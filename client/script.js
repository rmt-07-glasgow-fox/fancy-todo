let baseUrl = 'http://localhost:3000'

function checkAuth () {
  if (localStorage.access_token) {
    $('#login-page').hide()
    $('#signUp-page').hide()
    getTodoList()
    $('#todo-list-page').show()
    $('#addTodo-page').hide()
  } else {
    $('#login-page').show()
    $('#signUp-page').hide()
    $('#todo-list-page').hide()
    $('#addTodo-page').hide()
    $('#logout-button').hide()
  }
}

$(document).ready (function(event){
  // event.preventDefault()
  console.log ('masuk reload')
  checkAuth()

})

$('#noAcc-button').click (function (event) {
  event.preventDefault()
  $('#login-page').hide()
  $('#signUp-page').show()
})

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax ({
    method: 'POST',
    url: `${baseUrl}/googleSignIn`,
    data: {id_token}
  })
  .done (response => {
    console.log (response, 'google sign in response')
    localStorage.setItem ('access_token', response.access_token)
    localStorage.setItem ('name', response.name)
    $('#greetings').text(`Hello, ${response.name}`)
    checkAuth()
    $('#logout-button').show()
  })
  .fail ((xhr, status) => {
    console.log ('fail login google')
  })
}



$('#signUp-button').click (function (event) {
  event.preventDefault()

  let email = $('#email-signUp').val()
  let password = $('#password-signUp').val()

  $.ajax ({
    method: 'POST',
    url: `${baseUrl}/signUp`,
    data: {
      email: email,
      password: password
    }
  })

  .done (response => {
    console.log (response, '< response')
    checkAuth()
  })

  .fail (err => {
    console.log (err, '<err')
  })

  .always (() => {
    console.log ('sign up button clicked (always)')
  })

})

$('#login-button').click (function(event) {
  event.preventDefault()

  let email = $('#email').val()
  let password = $('#password').val()
  console.log (email, password)

  $.ajax ({
    method: 'POST',
    url: `${baseUrl}/signIn`,
    data: {
      email,
      password
    }
  })
  .done (response => {
    console.log (response, '< response')
    localStorage.setItem ('access_token', response.access_token)
    localStorage.setItem ('name', response.name)
    $('#greetings').text(`Hello, ${response.name}`)
    checkAuth()
    $('#logout-button').show()
  })

  .fail (err => {
    console.log (err, '<err')
  })

  .always (() => {
    console.log ('sign in button clicked (always)')
  })
})

$('#logout-button').click(function (event) {
  event.preventDefault()
  localStorage.clear()
  const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    })
  checkAuth()
  $('#logout-button').hide()
  $("#todo-list").empty()
})

function getTodoList() {
  $("#todo-list").empty()
  $.ajax ({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done (response => {
    console.log (response, '< response')
    let todoList = response.data
    let weather = response.weather
    console.log (todoList, '< todolist')
    let checked = 'checked'
    todoList.forEach (e => {
      if (e.status === false) {
        checked = ''
      }
      $('#todo-list').append(
        `<li class="list-group-item">
        <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
                <div class="widget-content-left mr-2">
                    <div class="custom-checkbox custom-control check-todo">
                      <input class="custom-control-input" id="check-todo-${e.status}" type="checkbox" ${checked}>
                        <label class="custom-control-label" for="check-todo-${e.status}">&nbsp;</label>
                    </div>
                </div>
                <div class="widget-content-left flex2">
                    <div class="widget-heading">${e.title} - Due Date (${e.due_date})</div> <button class="mr-2 btn btn-link btn-sm float-right" id="delete-todo-${e.id}">Delete</button> <button class="mr-2 btn btn-link btn-sm float-right" id="edit-todo-${e.id}">Edit</button>
                    <div class="widget-subheading">${e.description}</div>
                </div>
                <div class="widget-content-right"> <button class="border-0 btn-transition btn btn-outline-success"> <i class="fa fa-check"></i></button> <button class="border-0 btn-transition btn btn-outline-danger"> <i class="fa fa-trash"></i> </button> </div>
            </div>
          </div>
      </li>`
      )
    })
  })
  .fail (err => {
    console.log (err, 'err')
  })
  .always( () => {
    console.log ('always getTodoList')
  })
}

function addTodo() {
  let title = $('#title').val()
  let description = $('#description').val()
  let status = false
  let due_date = $('#due_date').val()
  console.log (email, password)

  $.ajax ({
    method: 'POST',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      status,
      due_date
    }
  })
  .done (response => {
    console.log (response, '< response')
    getTodoList()
  })
  .fail (err => {
    console.log (err, '< err add todo')
  })
  .always (() => {
    console.log ('todo button clicked')
  })
}

$('#addTodoMain-button').click (function (event) {
  event.preventDefault()
  $('#addTodo-page').show()
})

$('#addTodo-button').click (function (event) {
  event.preventDefault()
  addTodo()
  $('#addTodo-page').hide()
})

$('#cancelAdd-button').click (function (event) {
  event.preventDefault()
  $('#addTodo-page').hide()
})
