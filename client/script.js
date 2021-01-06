const baseUrl = 'http://localhost:3000'
let dataTodo = []

$(document).ready(function () {
  if (localStorage.getItem('access_token')) {
    todoPage()
  } else {
    registerPage()
  }
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
  // $('#add-modal').hide()
}

function registerPage() {
  hideAll()
  $('.btn-login').show()
  $('#home').show()
  $('#register').show()

  $('.btn-login').click(function () {
    loginPage()
  })

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

  $('.btn-register').click(function () {
    registerPage()
  })

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
      .fail(err => {
        console.log(err, 'err login');
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
    .fail(err => {
      console.log(err);
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

  $('.btn-logout').on('click', function () {
    logout()
  })

  $('#btn-add-todo').on('click', function () {
    addTodo()
  })

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
      dataTodo.forEach((data, index) => {
        // console.log(data);
        if (data.status) {
          $('#task-done').append(
            `
            <div class="card-body bg-white shadow-sm rounded mt-3 p-0  overflow-hidden">
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
                    <small><a class="edit text-decoration-none text-success position-absolute"
                          style="right: -.4rem;" type="button" onclick="putTodo(${data.id})">edit</a></small>
                  </div>
                </div>
              </div>
            </div>
            `
          )
        } else {
          $('#task-backlog').append(
            `
            <div id="1" class="card-body bg-white shadow-sm rounded mt-3 p-0  overflow-hidden">
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
                      <small><a class="edit text-decoration-none text-info position-absolute"
                              style="right: -.4rem;"  type="button" onclick="putTodo(${data.id})">edit</a></small>
                  </div>
                </div>
              </div>
            </div>
            `
          )
        }
      })
    })
    .fail(err => {
      console.log(err);
    })
}

function addTodo() {
  $('#modal-add').show()
  $('#cancel-add').on('click', function () {
    $('#modal-add').hide()
  })

  $('#form-add').on('submit', function (event) {
    event.preventDefault()
    console.log('submit');
    let title = $('#add-title').val()
    let description = $('#add-description').val()
    let due_date = $('#add-date').val()
    let status = $('input[name="add-status"]:checked').val()
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
        todoPage()
      })
      .fail(err => {
        console.log(err);
      })
      .always(() => {
        $('#form-add').trigger('reset')
      })
  })
}

function putTodo(id) {
  let value = dataTodo.filter(data => data.id == id)
  $('#modal-edit').show()
  $('#edit-title').val(value[0].title)
  $('#edit-description').val(value[0].description)
  $('#edit-date').val(dateFormat(value[0].due_date))
  $(`input[name="edit-status"][value="${value[0].status}"]`).prop('checked', true)

  $('#modal-edit-cancel').on('click', function () {
    $('#modal-edit').hide()
  })

  $('#modal-edit-submit').on('click', function (event) {
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
        todoPage()
      })
      .fail(err => {
        console.log(err);
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
      // console.log(res);
      todoPage()
    })
    .fail(err => {
      console.log(err);
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
    .fail(err => {
      console.log(err);
    })
}