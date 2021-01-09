let baseUrl = 'http://localhost:3000'
let currentTime = new Date ()
let hours = currentTime.getHours ()
let minutes = currentTime.getMinutes ()
if (hours > 12) {
  hours -= 12
  var ampm = 'PM'
} else {
  var ampm = 'AM'
}

if (minutes < 10) {
  minutes = `0${minutes}`
}

let clockNow = `${hours}:${minutes} ${ampm}`

function getWeather () {
  $.ajax ({
    method: 'GET',
    url: `http://localhost:3000/weather/${localStorage.location}`
  })
  .done (response => {
    let temperature = response.main.temp -273.15
    temperature = temperature.toFixed(1)
    $('#weather').text(response.weather[0].main)
    $('#temperature').text(`${temperature}°C`)
    $('#humidity').text(`Humidity: ${response.main.humidity}%`)
    $('#wind').text(`Wind Speed: ${response.wind.speed} m/s`)
    $('#city-name').text(response.name)

    switch (response.weather[0].main) {
      case 'Clouds':
        var imageLink = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png'
        break;
      case 'Rain':
        var imageLink = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-128.png'
        break;
      default:
        var imageLink = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather01-128.png'
    }

    $("#weather-image").append(`<img id='weatherImageId' width="100" height="100" src='${imageLink}'/>`)
  })
  .fail (err => {
    console.log (err, 'err get weather client')
  })
  .always (() => {
    console.log ('get weather (always)')
  })
}

function checkAuth () {
  if (localStorage.access_token) {
    $('#greetings').text(`Hello, ${localStorage.name}`)
    $('#clock').text(clockNow)
    $('#login-page').hide()
    $('#signUp-page').hide()
    getTodoList()
    getWeather()
    $('#todo-list-page').show()
    $('#addTodo-page').hide()
    $('#editTodo-page').hide()
  } else {
    $('#login-page').show()
    $('#signUp-page').hide()
    $('#todo-list-page').hide()
    $('#addTodo-page').hide()
    $('#logout-button').hide()
    $('#editTodo-page').hide()
  }
}

$(document).ready (function(event){
  // event.preventDefault()
  console.log ('masuk reload')
  checkAuth()
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
    console.log (response, 'google sign in response --------------------')
    localStorage.setItem ('access_token', response.access_token)
    localStorage.setItem ('name', response.name)
    localStorage.setItem ('location', response.location)
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
  $('#email-signUp').empty()
  $('#password-signUp').empty()
  $('#errorSignUp').empty()

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
    $('#email-signUp').empty()
    $('#password-signUp').empty()
    checkAuth()
  })

  .fail (err => {
    console.log (err, '<err')
    $('#errorSignUp').empty()
    err.responseJSON.forEach (e => {
      $('#errorSignUp').append (`<br> ${e}`)
    })
  })

  .always (() => {
    console.log ('sign up button clicked (always)')
  })

})

$('#login-button').click (function(event) {
  event.preventDefault()
  $('#errorSignIn').empty()
  
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
    console.log (response, 'response login')
    localStorage.setItem ('access_token', response.access_token)
    localStorage.setItem ('name', response.name)
    localStorage.setItem ('location', response.location)
    $('#greetings').text(`Hello, ${response.name}`)
    checkAuth()
    $('#logout-button').show()
  })

  .fail (err => {
    $('#errorSignIn').append (err.responseJSON.message)
  })

  .always (() => {
    password = $('#password').val('')
    console.log ('sign in button clicked (always)')
  })
})

function getTodoList() {
  $.ajax ({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done (response => {
    $("#todo-list").empty()
    console.log (response, '< response')
    let todoList = response

    todoList.forEach (e => {
      if (e.status === false) {
        var checked = ''
      } else if (e.status === true) {
        var checked = 'checked'
      }
      $('#todo-list').append(
        `<li class="list-group-item">
        <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
                <div class="widget-content-left mr-2">
                    <div class="custom-checkbox custom-control check-todo">
                      <input class="custom-control-input" id="check-todo-status-${e.id}" type="checkbox" ${checked} onclick="patchTodo (${e.id}, ${e.status})">
                        <label class="custom-control-label" for="check-todo-status-${e.id}">&nbsp;</label>
                    </div>
                </div>
                <div class="widget-content-left flex2">
                    <div class="widget-heading">${e.title} - Due Date (${e.due_date.slice(0, 10)})</div> <button class="mr-2 btn btn-link btn-sm float-right" id="delete-todo-${e.id}" onclick="deleteTodo (${e.id})">Delete</button> <button class="mr-2 btn btn-link btn-sm float-right" id="edit-todo-${e.id}" onclick="editTodoForm (${e.id}, '${e.title}', '${e.description}', '${e.due_date}')">Edit</button>
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
  $('#add-todo-error').empty()

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
    $('#addTodo-page').hide()
    $('#title').val('')
    $('#description').val('')
    $('#due_date').val('')
    getTodoList()
  })
  .fail (err => {
    console.log (err, '< err add todo')
    err.responseJSON.forEach (e => {
      $('#add-todo-error').append (`<br> ${e}`)
    })
  })
  .always (() => {
    console.log ('todo add button clicked')
  })
}

let editTargetId = null
function editTodoForm (targetId, targetTitle, targetDescription, targetDue_date) {
  editTargetId = targetId
  targetDue_date = targetDue_date.slice(0, 10)
  $('#addTodo-page').hide()
  $('#title-edit').val(targetTitle)
  $('#description-edit').val(targetDescription)
  $('#due_date-edit').val(targetDue_date)
  $('#editTodo-page').show()
}

function editTodo () {
  let title = $('#title-edit').val()
  let description = $('#description-edit').val()
  let due_date = $('#due_date-edit').val()
  due_date = new Date (due_date)
  $('#edit-todo-error').empty()
  $.ajax ({
    method: 'PUT',
    url: `${baseUrl}/todos/${editTargetId}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      due_date
    }
  })
  .done (response => {
    console.log (response, '< response')
    $('#editTodo-page').hide()
    editTargetId = null
    getTodoList()
  })
  .fail (err => {
    console.log (err, '< err add todo')
    err.responseJSON.forEach (e => {
      $('#edit-todo-error').append (`<br> ${e}`)
    })
  })
  .always (() => {
    console.log ('todo edit button clicked')
  })
}

function patchTodo (targetId, targetStatus) {
  console.log (targetId, 'target id', targetStatus, 'target status')
  if (targetStatus) {
    var newStatus = false
  } else {
    var newStatus = true
  }
  console.log (newStatus, 'status')
  $.ajax ({
    method: 'PATCH',
    url: `${baseUrl}/todos/${targetId}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      status: newStatus,
    }
  })
    .done (response => {
      console.log (response, '< response')
      getTodoList()
    })
    .fail (err => {
      console.log (err, '< err patch todo')
    })
    .always (() => {
      console.log ('todo patch clicked')
    })
}

function deleteTodo (targetId) {
  console.log (targetId, 'targetId delete')
  $.ajax ({
    method: 'DELETE',
    url: `${baseUrl}/todos/${targetId}`,
    headers: {
      access_token: localStorage.access_token
    }
  }) 
    .done (response => {
      console.log (response, '< response')
      getTodoList()
    })
    .fail (err => {
      console.log (err, '< err delete todo')
    })
    .always (() => {
      console.log ('todo delete clicked')
    })
}

// function changeLocation () {
//   $.ajax ({
//     method: 'PUT'
//   })
// }


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


$('#noAcc-button').click (function (event) {
  event.preventDefault()
  $('#errorSignUp').empty()
  $('#login-page').hide()
  $('#signUp-page').show()
})

$('#haveAcc-button').click (function (event) {
  event.preventDefault()
  $('#login-page').show()
  $('#signUp-page').hide()
})

$('#addTodoMain-button').click (function (event) {
  event.preventDefault()
  $('#editTodo-page').hide()
  $('#addTodo-page').show()
})

$('#addTodo-button').click (function (event) {
  event.preventDefault()
  addTodo()
})

$('#cancelAdd-button').click (function (event) {
  event.preventDefault()
  $('#add-todo-error').empty()
  $('#addTodo-page').hide()
})

$('#editTodo-button').click (function (event) {
  event.preventDefault()
  editTodo()
})

$('#cancelEdit-button').click (function (event) {
  event.preventDefault()
  $('#edit-todo-error').empty()
  $('#editTodo-page').hide()
})

$('#mytodolist').click (function (event) {
  event.preventDefault()
  checkAuth()
})