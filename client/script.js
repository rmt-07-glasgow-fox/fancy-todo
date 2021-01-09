
let baseUrl = 'http://localhost:3000'

$('#navbar').hide()

$(document).ready(function () {

  if (localStorage.access_token) {
    mainPage()
  } else {
    loginForm()
    registrationForm()
  }

  $('#logout-btn').click((event) => {
    event.preventDefault()

    localStorage.clear()
    loginForm()
  })
  
  
})

function loginForm () {
  
  $('#login-form').show()
  $('#registration-form').hide()
  $('#main-page').hide()
  $('#todo-form').hide()
  $('#navbar').hide()

  $('#login-btn').click((event) => {
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
  
    $.ajax({
      method: 'POST',
      url: `${baseUrl}/users/login`,
      data: { email, password }
    })
    .done(response => {
      console.log(response)
      localStorage.setItem('access_token', response.accessToken)
      mainPage()
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
      console.log('ajax is working')
    })
  })
}

function registrationForm () {
  $('#to-registration-btn').click((event) => {
    event.preventDefault()

    $('#login-form').hide()
    $('#registration-form').show()
    $('#main-page').hide()
    $('#todo-form').hide()
    $('#navbar').hide()
  }) 

  $('#registration-btn').click((event) => {
    event.preventDefault()

    let email = $('#email-registration').val()
    let fullName = $('#fullname').val()
    let username = $('#username').val()
    let password = $('#password-registration').val()
  
    $.ajax({
      method: 'POST',
      url: `${baseUrl}/users/register`,
      data: { email, fullName, username, password }
    })
    .done(response => {
      console.log(response)
      loginForm()
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
      console.log('ajax is working')
    })
  })
}

function mainPage () {
  

  $('#login-form').hide()
  $('#registration-form').hide()
  $('#main-page').show()
  $('#todo-form').hide()
  $('#navbar').show()

  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    header: { accessToken: localStorage.access_token }
  })
  .done(response => {
    console.log(response)
    $('#todo-list').empty()
    response.forEach(todo => {
      let dueDate = todo.due_date.split('T')[0]
      let action
      if (todo.status == false) {
        action = `<button type="submit" class="btn btn-success" id="change-status" value="${todo.id}">Done</button>`
      } else {
        action = '<button type="submit" class="btn btn-danger" id="delete-todo">Delete</button>'
      }

      $('#todo-list').append(
        `<tr>
          <td>${todo.title}</td>
          <td>${todo.description}</td>
          <td>${dueDate}</td>
          <td>${todo.status}</td>
          <td>
            <form>
              ${action}
            </form>
          </td>
        </tr>`
      )
    })

    toDoForm()
    changeStatus()
  })
  .fail(err => {
    console.log(err)
  })
}

function changeStatus () {

  $('#change-status').click(function (event) {
    event.preventDefault()

    let id = this.value

    $.ajax({
      method: 'PATCH',
      url: `${baseUrl}/todos/${id}`,
      header: {
        accessToken : localStorage.access_token
      }
    })
    .done(response => {
      console.log(response)
      mainPage()
    })
    .fail(err => {
      console.log(err)
    })
  })

}

function toDoForm () {

  $('#to-toDo-btn').click((event) => {
    event.preventDefault()

    $('#login-form').hide()
    $('#main-page').hide()
    $('#registration-form').hide()
    $('#todo-form').show()
    $('#navbar').show()

    $('#title').val('')
    $('#description').val('')
    $('#dueDate').val('')
  })

  $('#toDo-btn').click((event) => {
    event.preventDefault()

    let title = $('#title').val()
    let description = $('#description').val()
    let due_date = $('#dueDate').val()

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/todos`,
      data: { title, description, due_date }
    })
    .done(response => {
      console.log(response)
      mainPage()
    })
    .fail(err => {
      console.log(err)
    })
  })
}


