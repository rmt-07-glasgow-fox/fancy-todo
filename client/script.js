let baseUrl = 'http://localhost:3000'
let todoList = []

$(document).ready(function(){
  checkAuth()
})

function checkAuth(){
  if(localStorage.access_token){
    afterLogin()
    getTodoList()
    getWeather()
  }else{
    beforeLogin()
  }
}

function initContent(){
    $("#todo-list-data").show()
    $("#form-login").hide()
    $("#btn-logout").hide()
    $("#editTodo").hide()
}

function afterLogin(){
    $("#todo-list-data").show()
    $("#form-login").hide()
    $('#registerForm').hide()
    $("#btn-logout").show()
    $("#editTodo").hide()
    $('#widgetWeather').show()
}

function beforeLogin(){
    $("#todo-list-data").hide()
    $('#registerForm').hide()
    $("#form-login").show()
    $("#btn-logout").hide()
    $("#editTodo").hide()
    $('#widgetWeather').hide()
    
}

$("#registerFormButton").click(function(){
  $("#form-login").hide()
  $('#registerForm').show()
  return false
})

$('#register-btn').click(function(event){
  event.preventDefault()
  const email = $('#emailRegister').val()
  const password = $('#passwordRegister').val()

  //ajax
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/register`,
    data: {
      email,
      password,
    }
  })
  .done(response => {
    $('#emailRegister').val('')
    $('#passwordRegister').val('')
    checkAuth()
    console.log(response);
  })
  .fail(err => {
    console.log(err, '<=== error')
  })
  .always(() => {
    console.log('always')
  })
})

$('#login-btn').click(function(event){
  event.preventDefault()
  const email = $('#email').val()
  const password = $('#password').val()
  console.log(email, password)

  //ajax
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response, '<=== response')
    //menggunakn localstorage untuk menyimpan token
    localStorage.setItem('access_token', response.access_token)
    checkAuth()
  })
  .fail(err => {
    console.log(err, '<=== error')
  })
  .always(() => {
    console.log('always')
  })

})

// login with google
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login/google`,
    data: {
      id_token
    }
  })
  .done(response => {
    localStorage.setItem('access_token', response.access_token)
    checkAuth()
    console.log(response)
  }).fail(err => {
    console.log(err)
  })
}

$('#btn-logout').click(function(){
  localStorage.clear()
  const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.')
  })
  checkAuth()
})

function getTodoList(){
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    console.log(response, '<=== response')
    //manipulasi dom
    todoList = response
    //tanpa di empty ko ga double ya ka?
    todoList.forEach(e => {
      $('#todo-list-data').append(`<div class="card border-light col-12" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${e.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${e.dueDate}</h6>
                    <p class="card-text">${e.description}</p>
                    <a href="#editModal" class="card-link" data-target="#editModal" data-toggle="modal" onclick="editTodo(${e.id})">Edit</a>
                    <a href="#" class="card-link" onclick="updateStatus(${e.id})">Done</a>
                    <a href="#" class="card-link" onclick="deletTodo(${e.id})">Delete</a>
                </div>
            </div>`)
    })
  })
  .fail(err => {
    console.log(err, '<=== error')
  })
  .always(() => {
    console.log('always')
  })
}

function addTodo(){
  event.preventDefault()
  const title = $('#addTitle').val()
  const description = $('#addDescription').val()
  const dueDate = $('#addDate').val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      dueDate
    }
  })
  .done(response => {
    console.log(response, 'berhasil gan!');
    location.reload()
  })
  .fail(err => {
    console.log(err, 'error gan!')
  })
}

function editTodo(id){
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    console.log(response, '<=== response')
    $('#hiddenId').val(response.id)
    $('#title').val(response.title)
    $('#date').val(response.dueDate)
    $('#description').val(response.description)

  })
  .fail(err => {
    console.log(err, '<=== error')
  })
  .always(() => {
    console.log('always')
  })
}

function updateTodo(){
  const title = $('#title').val()
  const description = $('#description').val()
  const dueDate = $('#date').val()
  const hiddenId = $('#hiddenId').val()

  $.ajax({
    method: 'PUT',
    url: `${baseUrl}/todos/${hiddenId}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      description,
      dueDate
    }
  })
  .done(response => {
    console.log(response, 'berhasil gan!');
    location.reload()
  })
  .fail(err => {
    console.log(err, 'error gan!')
  })
}

function deletTodo(id){
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    console.log(response, 'berhasil!')
    location.reload()
  })
  .fail(err => {
    console.log(err)
  })
}

function updateStatus(id){
  const status = 'checked'
  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/${id}`,
     headers: {
      access_token: localStorage.access_token
    },
    data: {
      status
    }
  })
  .done(response => {
    console.log(response, 'berhasil update status');
  })
  .fail(err => {
    console.log(err, 'error!')
  })

}

function getWeather(){
  console.log('test weather')
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/api`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    
    $('#mainWeather').text('Main:' + ' ' + response.weather[0].main)
    $('#descriptionWeather').text('Description:' + ' ' + response.weather[0].description)
    $('#tempWeather').text('Temp:' + ' ' + Math.round((response.main.temp-273)*10)/10 + "°C")
  })
  .fail(err => {
    console.log(err, '<=== error')
  })
  .always(() => {
    console.log('always')
  })
}