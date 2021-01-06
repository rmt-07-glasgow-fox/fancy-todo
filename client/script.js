const baseUrl = "http://localhost:3000"

$(document).ready(function(){
  cekAuth()
})

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/loginGoogle`,
    data : {
      id_token
    }
  })
  .done(response => {
    localStorage.access_token = response.accessToken
    localStorage.user_name = response.user_name
    cekAuth()
  })
  .fail(err => console.log(err))
}

$('#login-btn').click(function(event){
  event.preventDefault()
  
  const email = $('#email').val()
  const password = $('#password').val()
  const user_name = email.split('@')[0]

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data : {
      email,
      password
    }
  })
  .done(response => {
    localStorage.access_token = response.accessToken
    localStorage.user_name = user_name
    cekAuth()
  })
  .fail(err => console.log(err))
  .always(()=> {
    $('#email').val("")
    $('#password').val("")
  })
})

$('#register-btn').click(function(event){
  event.preventDefault()
  
  const email = $('#email-register').val()
  const password = $('#password-register').val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/register`,
    data : {
      email,
      password
    }
  })
  .done(response => {
    $('#login-form').show()
    $('#register-form').hide()
  })
  .fail(err => console.log(err))
  .always(()=> {
    $('#email-register').val("")
    $('#password-register').val("")
  })
})

$('#create-account').click(function(event){
  event.preventDefault()
  $('#login-form').hide()
  $('#register-form').show()
})

$('#login-account').click(function(event){
  event.preventDefault()
  $('#login-form').show()
  $('#register-form').hide()
})

$('#logout-btn').click(function(event){
  event.preventDefault()
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  cekAuth()
})

function cekAuth(){
  if(localStorage.access_token){
    $('#login-form').hide()
    $('#todo').show()
    showTodos()
    getWeather()
  }else{
    $('#login-form').show()
    $('#todo').hide()
  }
}

$('#add-todo').click(function(event){
  event.preventDefault()
  $('#form-add').show()
})

$('#add-btn').click(function(event){
  event.preventDefault()
  const title = $('#title').val()
  const due_date = $('#due_date').val()
  const description = $('#description').val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
    data : {
      title,
      due_date,
      description,
      status: false
    }
  })
  .done(response => {
    $('#form-add').hide()
    showTodos()
  })
  .fail(err => console.log(err))
  .always(()=> {
    $('#title').val("")
    $('#due_date').val("")
    $('#description').val("")
  })
})

$('#cancel-btn').click(function(event){
  event.preventDefault()
  $('#form-add').hide()
  $('#title').val("")
  $('#due_date').val("")
  $('#description').val("")
})

function showTodos(){
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
  })
  .done(response => {
    $('#todo-container').empty()
    response.forEach(e => {
      let checked = e.status == false ? `<i class="far fa-square"></i>` : `<i class="far fa-check-square"></i>`
      $('#todo-container').append(`
          <div class="card mt-3 p-3">
            <div class="d-flex align-items-center">
              <div class="col-1">
                <div id="status-${e.id}" class="${e.status}" style="font-size:1.5em;">
                  <a class="text-success" onClick="changeStatus(${e.id})">${checked}</a>
                </div>
              </div>
              <div class="col d-flex align-items-center justify-content-between" id="todo-${e.id}">
                <div>
                  <div>${e.title}</div>
                  <div>${e.due_date.slice(0,10)}</div>
                  <div>${e.description}</div>
                </div>
                <div>
                  <a class="text-success" onClick="handleEdit(${e.id})"><i class="fas fa-edit"></i></a>
                  <a class="text-danger" onClick="handleDelete(${e.id})"><i class="fas fa-trash-alt"></i></a>
                </div>
              </div>
            </div>
          </div>
      `)
    })
  })
  .fail(err => console.log(err))
}

function handleDelete(id){
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    showTodos()
  })
  .fail(err => console.log(err))
}

function handleEdit(id){
  $(`#todo-${id}`).empty()
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${id}`,
    headers : {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    $(`#todo-${id}`).append(`
      <div style="width: 100%;">
        <form class="form-floating">
        <div class="col d-flex align-items-center justify-content-between">
          <div style="width: 90%;">
          <div class="row mb-3">
            <div class="col-6">
              <div class="form-floating">
                <input type="text" class="form-control" id="title-${id}" value="${response.title}" placeholder="Title">
                <label>Title</label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-floating">
                <input type="date" class="form-control" id="due_date-${id}" value="${response.due_date.slice(0,10)}">
                <label>Due Date</label>
              </div>
            </div>
          </div>

          <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Leave a comment here" id="description-${id}" style="height: 100px">${response.description}</textarea>
            <label>Description</label>
          </div>
          </div>

          <div>
            <a class="text-success" onClick="editTodo(${id})"><i class="fas fa-edit"></i></a>
            <a class="text-danger" onClick="showTodos()"><i class="fas fa-window-close"></i></a>
          </div>
        </div>
        </form>
      </div>
    `)
  })
  .fail(err => console.log(err))
}

function editTodo(id){
  const status = $(`#status-${id}`).attr('class')
  const title = $(`#title-${id}`).val()
  const due_date = $(`#due_date-${id}`).val()
  const description = $(`#description-${id}`).val()
  
  $.ajax({
    method: 'PUT',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
    data : {
      title,
      due_date,
      description,
      status
    }
  })
  .done(response=>{
    showTodos()
  })
  .fail(err=>console.log(err))
}

function changeStatus(id){
  const statusTodo = $(`#status-${id}`).attr('class')

  let status = statusTodo=="true" ? false : true
  console.log(statusTodo);
  console.log(status);
  
  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
    data : {
      status
    }
  })
  .done(response=>{
    showTodos()
  })
  .fail(err=>console.log(err))
}

function getWeather(){
  const {lat,lon} = localStorage
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/weather/${lat}/${lon}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response=>{
    console.log(response);
  })
  .fail(err=>console.log(err))
}