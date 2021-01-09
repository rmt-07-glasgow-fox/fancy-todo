var baseUrl = 'http://localhost:3000'
var todoList = []

function hideUpdate() {
  $('#update-container').hide()
}

function showUpdate() {
  $('#update-container').show()
}


function checkAuth() {
  if(localStorage.access_token) {
    $('#login-page').hide()
    $('#register-page').hide()
    $('#konten').show()
    $('#btn-logout').show()
    $('#pengantar').hide()
    getTodoList()
    getWeather()
  } else {
    $('#login-page').show()
    $('#register-page').hide()
    $('#konten').hide()
    $('#btn-logout').hide()
    $('#pengantar').show()
  }
}



$(document).ready(function() {
  checkAuth()
  hideUpdate()
  hideAddForm()

  
  // button
  // fungsi logout
  $('#btn-logout').click(function() {
    localStorage.clear()
    checkAuth()
    googleLogout()
  })

  $('#gotologin-btn').click(function(event) {
    event.preventDefault();
    $('#login-page').show()
    $('#register-page').hide()
  })

  $('#gotoregister-btn').click(function(event) {
    event.preventDefault();
    $('#login-page').hide()
    $('#register-page').show()
  })

  // =======================================================
  // login
  $('#login-btn').click(function(event) { 
    event.preventDefault();
    var email = $('#email').val()
    var password = $('#password').val()
    // fungsi login
    $.ajax({
      method: "POST",
      url: `${baseUrl}/user/signIn`,
      data: {
        email,
        password
      },
    })
    .done(response => {
      localStorage.setItem('access_token', response.access_token)
      // localStorage.access_token = response.access_token
      checkAuth()
    })
    .fail(err => {
      let valid = ''
      err.responseJSON.errors.forEach(el => {
        valid += `${el}
        `
      })
      swal({
        title: 'Error !!!',
        text: valid,
        icon: 'error'
      })
    })
    .always(() => {
      // console.log('always')
      $('#email').val('')
      $('#password').val('')
    })
  });

  // Sign Up
  $('#register-btn').click(function(event) { 
    event.preventDefault();
    var email = $('#emailregis').val()
    var password = $('#passwordregis').val()
    // fungsi sign up
    $.ajax({
      method: "POST",
      url: `${baseUrl}/user/signUp`,
      data: {
        email,
        password
      },
    })
    .done(response => {
      checkAuth()
    })
    .fail(err => {
      let valid = ''
      err.responseJSON.errors.forEach(el => {
        valid += `${el}
        `
      })
      swal({
        title: 'Error !!!',
        text: valid,
        icon: 'error'
      })
    })
    .always(() => {
      $('#emailregis').val('')
      $('#passwordregis').val('')
    })
  });
})

// =======================================================
// fungsi login untuk google
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/user/loginGoogle`,
    data: { id_token }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    // masukan fungsi-fungsi seperti login
    checkAuth()
  })
  .fail((xhr, status) => {
    let valid = ''
    err.responseJSON.errors.forEach(el => {
      valid += `${el}
      `
    })
    swal({
      title: 'Error !!!',
      text: valid,
      icon: 'error'
    })
  })
}

// bisa dimasukan ketika tombol logout ditekan!
function googleLogout() {
  const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}


// =======================================================
// fungsi get semua list
function getTodoList() {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    todoList = response
    $('#todo-list').empty()
    todoList.forEach(el => {
      var status = el.status === true ? 'Yeay Done' : 'On Going!'
      var statusColor = el.status === true ? 'btn-success' : 'btn-warning'
      $('#todo-list').append(`
      <div class="col-sm-3 mt-3">
        <div class="card">
          <div class="card-body">
            <div class="card-body bg-light text-dark">
              <h5 class="card-title">${el.title}</h5>
            </div>
            <p class="card-text mb-0">${el.description}.</p>
            <p class="card-text mt-0">${el.due_date.slice(0,10)}</p>
            <a href="#" id="status" onclick="modifyStatus(${el.id}, ${el.status})" class="btn ${statusColor}">${status}</a><br><br>
            <a href="#update-container" class="btn btn-primary" onclick="getOneToDo(${el.id})">Update</a>
            <a href="#" class="btn btn-danger" onclick="deleteTodo(${el.id})">Delete</a>
          </div>
        </div>
      </div>`)
    });
  })
  .fail(err => {
    let valid = ''
    err.responseJSON.errors.forEach(el => {
      valid += `${el}
      `
    })
    swal({
      title: 'Error !!!',
      text: valid,
      icon: 'error'
    })
  })
  .always(() => {
    console.log('always <<<<')
  })
}

// ==================================
function getWeather() {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/weather`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(weather => {
    console.log(weather)
    $('#weather').empty()
    $('#weather').append(`
    <h1>Weather: ${weather.cuaca}</h1>
    <div class="row">
          <div class="col-sm">
            <p>Location: ${weather.location}</p>
            <p>Temperature: ${weather.temperature}</p>
          </div>
          <div class="col-sm">
            <img src="${weather.image}" alt="">
          </div>
        </div>`)
  })
  .fail(err => {
    let valid = ''
    err.responseJSON.errors.forEach(el => {
      valid += `${el}
      `
    })
    swal({
      title: 'Error !!!',
      text: valid,
      icon: 'error'
    })
  })
  .always(() => {
    console.log('always <<<<')
  })
}
// =======================================================
// add button FORM
function showAddForm() {
  $('#add-container').show()
}

function hideAddForm() {
  $('#add-container').hide()
}

$('#addform-btn').click(function(event) {
  event.preventDefault()
  showAddForm()
})

$('#canceladd-btn').click(function(event) {
  event.preventDefault()
  hideAddForm()
})

$('#cancelupdate-btn').click(function(event) {
  event.preventDefault()
  hideUpdate()
})

$('#add-btn').click(function(event) {
  event.preventDefault()
  var title = $('#add-title').val()
  var description = $('#add-description').val()
  var due_date = $('#add-due_date').val()
  
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      due_date
    },
  })
  .done(response => {
    swal({
      title: 'Success !!!',
      text: 'Successfully Added yeay',
      icon: 'success'
    })
    hideAddForm()
    getTodoList()
  })
  .fail(err => {
    let valid = ''
      err.responseJSON.errors.forEach(el => {
        valid += `${el}
        `
      })
      swal({
        title: 'Error !!!',
        text: valid,
        icon: 'error'
      })
  })
  .always(() => {
    console.log('always <<<<')
    $('#add-title').val('')
    $('#add-description').val('')
    $('#add-due_date').val('')
  })
})


// fungsi get 1 list untuk buka form update dan dapat data dari id
function getOneToDo(id) {
  showUpdate()
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    $('#title').val(response.title)
    $('#description').val(response.description)
    $('#due_date').val((response.due_date).slice(0,10))
    $('#update-btn').data('id', id)
  })
  .fail(err => {
    let valid = ''
    err.responseJSON.errors.forEach(el => {
      valid += `${el}
      `
    })
    swal({
      title: 'Error !!!',
      text: valid,
      icon: 'error'
    })
  })
  .always(() => {
    console.log('always <<<<')
  })
}

// fungsi untuk update!
$('#update-btn').click(function(event) {
  event.preventDefault()
  var todoId = $('#update-btn').data('id')
  var title = $('#title').val()
  var description = $('#description').val()
  var due_date = $('#due_date').val()
  
  $.ajax({
    method: 'PUT',
    url: `${baseUrl}/todos/${todoId}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      due_date
    },
  })
  .done(response => {
    swal({
      title: 'Success !!!',
      text: 'Successfully Update yeay',
      icon: 'success'
    })
    hideUpdate()
    getTodoList()
    $('#title').val('')
    $('#description').val('')
    $('#due_date').val('')
  })
  .fail(err => {
    let valid = ''
    err.responseJSON.errors.forEach(el => {
      valid += `${el}
      `
    })
    swal({
      title: 'Error !!!',
      text: valid,
      icon: 'error'
    })
  })
  .always(() => {
    console.log('always <<<<')
  })
})

// DELETE
function deleteTodo(id) {
  swal({
    title: 'Are you sure ?',
    text: 'Once deleted, you will not be able to recover this todo !',
    icon: 'warning',
    buttons: true,
    dangerMode: true
  })
  .then(deleted => {
    if(deleted){
      $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .done(response => {
        getTodoList()
        swal({
          title: 'Deleted',
          text: 'Successfully deleted your todo',
          icon: 'success'
        })
      })
      .fail(err => {
        let valid = ''
        err.responseJSON.errors.forEach(el => {
          valid += `${el}
          `
        })
        swal({
          title: 'Error !!!',
          text: valid,
          icon: 'error'
        })
      })
      .always(() => {
        console.log('always <<<<')
      })
    } else {
      swal("Your imaginary file is safe :)")
    }
  })
}

function modifyStatus(id, status) {

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
      getTodoList()
    })
    .fail(err => {
      let valid = ''
      err.responseJSON.errors.forEach(el => {
        valid += `${el}
        `
      })
      swal({
        title: 'Error !!!',
        text: valid,
        icon: 'error'
      })
    })
    .always(_ => {
      console.log('always')
    })
}