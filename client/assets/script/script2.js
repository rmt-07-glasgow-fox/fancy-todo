const baseUrl = 'http://localhost:3000'
let dataTodo = []

$(document).ready(function () {
  checkLogin()
})

function checkLogin(){
  if (localStorage.getItem('access_token')) {
    todoPage()
  } else {
    registerPage()
  }
}

$('.btn-register').click(function () {
  registerPage()
})

$('.btn-login').click(function () {
  loginPage()
})

$('.btn-logout').on('click', function () {
  logout()
})

$('#btn-add-todo').on('click', function () {
  $('#modal-add').show()
})

$('#cancel-add').on('click', function () {
  $('#modal-add').hide()
})

$('#cancel-edit').on('click', function () {
  $('#modal-edit').hide()
})

function dateFormat(date) {
  return date.slice(0, 10)
}

function hideAll() {
  $('.btn-register').hide()
  $('.btn-logout').hide()
  $('.btn-login').hide()
  $('#home').hide()
  $('#register').hide()
  $('#login').hide()
  $('#todo').hide()
  $('#modal-add').hide()
  $('#modal-edit').hide()
}

function registerPage() {
  hideAll()
  $('.btn-login').show()
  $('#home').show()
  $('#register').show()

  $('#form-register').on('submit', function (event) {
    event.preventDefault()
    data = {
      email: $('#email').val(),
      username: $('#username').val(),
      password: $('#password').val()
    }
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data
      })
      .done(res => {
        console.log(res, 'res register');
        loginPage()
      })
      .fail((xhr, status) => {
        console.log(xhr, status);
        Swal.fire({
          title: 'Something Error!',
          text: xhr.responseJSON.message[0],
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
      .always(() => {
        $('#email').val(''),
          $('#username').val(''),
          $('#password').val('')
      })
  })
}


function loginPage() {
  hideAll()
  $('.btn-register').show()
  $('#home').show()
  $('#login').show()

  $('#form-login').on('submit', function (event) {
    event.preventDefault()
    data = {
      email: $('#email-login').val(),
      password: $('#password-login').val()
    }
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data
      })
      .done(res => {
        console.log(res, 'login');
        localStorage.setItem('access_token', res.access_token)
        todoPage()
      })
      .fail((xhr, status) => {
        console.log(xhr, 'err login');
        Swal.fire({
          title: 'Something Error!',
          text: xhr.responseJSON.message[0],
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
      .always(() => {
        $('#email-login').val(''),
        $('#password-login').val('')
      })
  })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
      method: 'POST',
      url: `${baseUrl}/google-login`,
      data: {
        id_token
      }
    })
    .done(res => {
      console.log(res);
      localStorage.setItem('access_token', res.access_token)
      todoPage()
    })
    .fail((xhr, status) => {
      console.log(xhr);
      Swal.fire({
        title: 'Something Error!',
        text: xhr.responseJSON.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
}

function logout() {
  localStorage.clear()
  const auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    console.log('User signed out.')
  });
  registerPage()
}

function todoPage() {
  hideAll()
  $('.btn-logout').show()
  $('#todo').show()

  getWeather()
  getTodo()
}

function getTodo() {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    dataTodo = res
    $('#task-backlog').empty()
    $('#task-done').empty()
    dataTodo.forEach(data => {
      if (data.status) {
        $('#task-done').append(
          `
          <div class="todo card-body bg-white shadow-sm rounded mt-3 p-0 overflow-hidden">
            <div class="d-flex justify-content-start">
              <div class="p-1 bg-success"></div>
              <div class="pb-3 position-relative w-100"
                style="padding-top: 1.5rem;padding-right: 1.5rem;padding-left: 1rem;">
                <svg type="button" onclick="deleteTodo(${data.id})" 
                  class="close position-absolute text-success" id-parent="1"
                  style="width: 1.25rem; height: 1.25rem; top: .7rem; right: .7rem;"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h5 class="card-title overflow-hidden" style="max-height: 3rem;">${data.title}</h5>
                <p class="card-text overflow-hidden" style="max-height: 3rem;">${data.description}</p>
                <div class="d-flex justify-content-between text-muted position-relative">
                  <small class="text-muted">${dateFormat(data.due_date)}</small>
                </div>
              </div>
            </div>
          </div>
          `
        )
      } else {
        $('#task-backlog').append(
          `
          <div class="todo card-body bg-white shadow-sm rounded mt-3 p-0 overflow-hidden">
            <div class="d-flex justify-content-start">
              <div class="p-1 bg-info"></div>
              <div class="pb-3 position-relative w-100"
                style="padding-top: 1.5rem;padding-right: 1.5rem;padding-left: 1rem;">
                <svg type="button" onclick="deleteTodo(${data.id})" 
                  class="close position-absolute text-info" id-parent="1"
                  style="width: 1.25rem; height: 1.25rem; top: .7rem; right: .7rem;"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h5 class="card-title overflow-hidden" style="max-height: 3rem;">${data.title}</h5>
                <p class="card-text overflow-hidden" style="max-height: 3rem;">${data.description}</p>
                <div class="d-flex justify-content-between text-muted position-relative">
                    <small class="text-muted">${dateFormat(data.due_date)}</small>
                    <small><a class="edit text-decoration-none text-info" type="button" onclick="patchTodo(${data.id})">mark as done</a></small>
                    <small><a class="edit text-decoration-none text-info position-absolute" style="right: -.4rem;"  type="button" onclick="editTodo(${data.id})">edit</a></small>
                </div>
              </div>
            </div>
          </div>
          `
        )
      }
    })
  })
  .fail((xhr, status) => {
    console.log(xhr);
    Swal.fire({
      title: 'Something Error!',
      text: xhr.responseJSON.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  })
}

$('#submit-add').click(function (event) {
  event.preventDefault()
  console.log('submit');
  let title = $('#add-title').val()
  let description = $('#add-description').val()
  let due_date = $('#add-date').val()
  let status = false
  $.ajax({
      method: 'POST',
      url: `${baseUrl}/todos`,
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      data: {
        title,
        description,
        due_date,
        status
      }
    })
    .done(res => {
      console.log(res);
      checkLogin()
    })
    .fail((xhr, status) => {
      console.log(xhr);
      Swal.fire({
        title: 'Something Error!',
        text: xhr.responseJSON.message[0],
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
    .always(() => {
      $('#form-add').trigger('reset')
    })
})

function editTodo(id) {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    console.log(res);
    $('#modal-edit').show()
    $('#edit-title').val(res.title)
    $('#edit-description').val(res.description)
    $('#edit-date').val(dateFormat(res.due_date))
    $(`input[name="edit-status"][value="${res.status}"]`).prop('checked', true)
    handleEdit(res.id)
  })
  .fail((xhr, status) => {
    Swal.fire({
      title: 'Something Error!',
      text: xhr.responseJSON.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  })
}

function handleEdit(id){
  $('#submit-edit').off('click').on('click',function (event) {
    event.preventDefault()
    const data = {
      title: $('#edit-title').val(),
      description: $('#edit-description').val(),
      due_date: $('#edit-date').val(),
      status: $('input[name="edit-status"]:checked').val()
    }
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data
      })
      .done(res => {
        console.log(res);
        checkLogin()
      })
      .fail((xhr, status) => {
        Swal.fire({
          title: 'Something Error!',
          text: xhr.responseJSON.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
      .always(() => {
        $('#form-edit').trigger('reset')
      })
  })
}

function patchTodo(id) {
  let value = dataTodo.filter(data => data.id == id)
  $.ajax({
      method: 'PATCH',
      url: `${baseUrl}/todos/${id}`,
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      data: {
        status: !value[0].status
      }
    })
    .done(res => {
      checkLogin()
    })
    .fail((xhr, status) => {
      Swal.fire({
        title: 'Something Error!',
        text: xhr.responseJSON.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
}

function deleteTodo(id) {
  $.ajax({
      method: 'DELETE',
      url: `${baseUrl}/todos/${id}`,
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
    .done(res => {
      console.log('deleted');
      todoPage()
    })
    .fail((xhr, status) => {
      Swal.fire({
        title: 'Something Error!',
        text: xhr.responseJSON.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
}

function getWeather(){
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/weather`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(res => {
    console.log(res);
    $('#weather').empty()
    $('#weather').append(
      `
      <div class="card-body">
      <small class="text-warning">${new Date().toLocaleString()}</small>
      <h4 class="card-title">${res.name}</h4>
      <div>
        <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png" "alt="">
        <span class="fs-1 text-muted">${(res.main.temp).toFixed()}&deg C</span>
      </div>
      <p>Feel like ${res.main.feels_like}&deg C, ${res.weather[0].description}</p><hr>
      <small>pressure:</small>
      <small class="text-muted">${res.main.pressure}hPa </small>
      <small>humidity:</small>
      <small class="text-muted">${res.main.humidity}%</small><br>
      <small>visibility:</small>
      <small class="text-muted">${res.visibility / 1000}km</small>
      <small>max-temp:</small>
      <small class="text-muted">${res.main.temp_max}&deg C</small>
    </div>
      `
    )
  })
  .fail((xhr, status) => {
    Swal.fire({
      title: 'Something Error!',
      text: xhr.responseJSON.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  })
}

$("#search-task").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $(".todo").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});


