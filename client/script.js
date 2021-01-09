let baseUrl = 'http://localhost:3000'

$(document).ready(function() {

  $('#form-login').show()
  $('#form-register').hide()
  $('#todos-list').hide()
  $('#add-todos').hide()
  $('#navbar').hide()

  $('#signup').click(function() {
    $('#form-login').hide()
    $('#form-register').fadeIn()
    $('#todos-list').hide()
    $('#add-todos').hide()
    $('#navbar').hide()
  })

  $('#signin').click(function() {
    $('#form-login').fadeIn()
    $('#form-register').hide()
    $('#todos-list').hide()
    $('#add-todos').hide()
    $('#navbar').hide()
  })

  if(localStorage.access_token) {
    $('#form-login').hide()
    $('#form-register').hide()
    $('#todos-list').show()
    $('#add-todos').show()
    $('#navbar').show()
    getAllTodos()
  } else {
    $('#form-login').show()
    $('#form-register').hide()
    $('#todos-list').hide()
    $('#add-todos').hide()
    $('#navbar').hide()
  }

  $('#logout').click(function(event) {
    event.preventDefault()
    localStorage.clear()

    let auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    $('#form-login').show()
    $('#form-register').hide()
    $('#todos-list').hide()
    $('#add-todos').hide()
    $('#navbar').hide()
    $('#todos-list').empty()
  })

  $('#register-btn').click(function(event) {
    event.preventDefault()

    var email = $('#email-register').val()
    var password = $('#password-register').val()

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/register`,
      data:{
        email,
        password
      }
    })
      .done(response=>{
        $('#form-register').hide(2000)
        $('#form-login').fadeIn()
        $('#todos-list').hide()
        $('#add-todos').hide()
        $('#navbar').hide()
      })
      .fail(err => {
        console.log(err, '=> error')
      })
      .always(() => {
        $('#email-register').val('')
        $('#password-register').val('')
      })
  })

  $('#login-btn').click(function(event) {
    event.preventDefault()

    var email = $('#email').val()
    var password = $('#password').val()

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/login`,
      data:{
        email,
        password
      }
    })
      .done(response => {
        localStorage.setItem('access_token', response.accessToken)

        $('#form-login').hide()
        $('#todos-list').show()
        $('#add-todos').show()
        $('#navbar').show()
        getAllTodos()
      })
      .fail(err => {
        console.log(err, '=> error')
      })
      .always(() => {
        $('#email').val('')
        $('#password').val('')
      })
  })
})

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/login/google`,
      data: { id_token }
    })
      .done(response => {
        localStorage.setItem('access_token', response.accessToken)

        $('#form-login').hide()
        $('#todos-list').show()
        $('#add-todos').show()
        $('#navbar').show()
        getAllTodos()
      })
      .fail((xhr, status ) => {

      })
      .always(() => {
        $('#email').val('')
        $('#password').val('')
      })
  }

function getAllTodos() {
  $('#todos-list').empty()

  $.ajax({
    method: 'GET',
    headers: {
      access_token: localStorage.access_token
    },
    url: `${baseUrl}/todos`,
  })
    .done(function(response) {
      response.forEach(todo => {
        $('#todos-list').append(`
        <div class="border p-3 border-3 rounded rounded-3">
          <div class="offset-3 col-6 mb-3 align-self-center">
            <label for="title-${todo.id}" class="form-label">Title</label>
            <input type="text" class="form-control" id="title-${todo.id}" placeholder="TODO" value="${todo.title}">
          </div>
          <div class="offset-3 col-6 mb-3">
            <label for="desc-${todo.id}" class="form-label">Description</label>
            <textarea class="form-control" id="desc-${todo.id}" rows="3">${todo.description}</textarea>
          </div>
          <div class="offset-3 col-6 mb-3">
            <label for="date-${todo.id}" class="form-label">Dateline</label>
            <input type="date" class="form-control" id="date-${todo.id}" placeholder="01-01-2021" value="${todo.due_date.split('T')[0]}">
          </div>
          <div class="offset-3 col-6 mb-3">
${todo.status === 'pending' ? `<div class="d-grip gap-2 d-md-flex justify-content-md-end"><button id="delete-${todo.id}" type="button" class="btn btn-danger m-2">Delete</button><button id="done-${todo.id}" type="button" class="btn btn-success m-2">Mark as Done</button><button id="update-${todo.id}" type="button" class="btn btn-primary m-2">Update</button></div>` : '<div class="d-grip gap-2 d-md-flex justify-content-md-end"><button type="button" class="btn btn-success m-2">Done</button></div>'}
          </div>
      </div>`)

        $(`#delete-${todo.id}`).click( e => {
          e.preventDefault()

          $.ajax({
            method: 'DELETE',
            headers: {
              access_token: localStorage.access_token
            },
            url: `${baseUrl}/todos/${todo.id}`,
          })
            .done(function(response) {
              getAllTodos()
            })
        })

        $(`#done-${todo.id}`).click( e => {
          e.preventDefault()

          $.ajax({
            method: 'PATCH',
            headers: {
              access_token: localStorage.access_token
            },
            url: `${baseUrl}/todos/${todo.id}`,
            data: {
              status: 'done'
            }
          })
            .done(function(response) {
              getAllTodos()
            })
        })

        $(`#update-${todo.id}`).click( e => {
          e.preventDefault()

          $.ajax({
            method: 'PUT',
            headers: {
              access_token: localStorage.access_token
            },
            url: `${baseUrl}/todos/${todo.id}`,
            data: {
              title: $(`#title-${todo.id}`).val(),
              description: $(`#desc-${todo.id}`).val(),
              due_date: $(`#date-${todo.id}`).val(),
              status: 'pending'
            }
          })
            .done(function(response) {
              getAllTodos()
            })
        })
      })
    })
}


$('#add-todo').click( e => {
  e.preventDefault()

  $.ajax({
    method: 'POST',
    headers: {
      access_token: localStorage.access_token
    },
    url: `${baseUrl}/todos`,
    data: {
      title: $('#add-title').val(),
      description: $('#add-desc').val(),
      due_date: $('#add-date').val(),
      status: 'pending'
    }
  })
    .done(function(response) {
      getAllTodos()
    })
    .always(() => {
      $('#add-title').val('')
      $('#add-desc').val('')
      $('#add-date').val('')
    })
})
