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
    $('#login-alert').hide()
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
    $('#login-alert').hide()
  })
  .fail(err => {
    $('#login-alert').show()
    $('#login-alert').text(err.responseJSON.message)
  })
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
    $('#register-alert').hide()
    $('#login-form').show()
    $('#register-form').hide()
  })
  .fail(err => {
    $('#register-alert').show()
    $('#register-alert').empty()
    $('#register-alert').append(err.responseJSON.join('<br>'))
  })
  .always(()=> {
    $('#email-register').val("")
    $('#password-register').val("")
  })
})

$('#create-account').click(function(event){
  event.preventDefault()
  $('#register-alert').hide()
  $('#login-form').hide()
  $('#register-form').show()
})

$('#login-account').click(function(event){
  event.preventDefault()
  $('#login-alert').hide()
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
    $('#project').show()
    $('.bg-login').hide()
    showTodos()
    showProject()
    getWeather()
  }else{
    $('#login-form').show()
    $('#todo').hide()
    $('#project').hide()
    $('.bg-login').show()
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
    $('#title').val("")
    $('#due_date').val("")
    $('#description').val("")
  })
  .fail(err => {
    $('#modal-message').empty()
    $('#modal-message').append(err.responseJSON[0])
    $('#modal').fadeIn(1000)
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
  .fail(err => {
    $('#modal-message').empty()
    $('#modal-message').append(err.responseJSON[0])
    $('#modal').fadeIn(1000)
  })
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
  const latitude = lat || -6.2146
  const longitude = lon || 106.8451
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/weather/${latitude}/${longitude}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response=>{
    console.log(response);
    $('#header-location').text(response.name)
    $('#header-name').text(`Hello, ${localStorage.user_name}`)
    $('#header-temp').text(Math.floor(response.main.temp))
    $('#header-icon').attr('src',`http://openweathermap.org/img/w/${response.weather[0].icon}.png`)
    $('#header-weather').text(response.weather[0].main)
  })
  .fail(err=>console.log(err))
}

//project
function showProject(){
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/projects`,
    headers: {
      access_token: localStorage.access_token
    },
  })
  .done(res => {
    $('#project-container').empty()
    res.forEach(e => {
      $('#project-container').append(`
        <div class="card mt-3 p-3" id="project-${e.id}">
          <div class="d-flex align-items-center">
          <div class="col d-flex align-items-center justify-content-between">
            <div id="project-title">
              ${e.title}
            </div>
            <div>
              <a class="text-primary" onClick="projectMembers(${e.id})"><i class="fas fa-user-friends"></i></a>
              <a class="text-success" onClick="projectEdit(${e.id})"><i class="fas fa-edit"></i></a>
              <a class="text-danger" onClick="projectDelete(${e.id})"><i class="fas fa-trash-alt"></i></a>
            </div>
          </div>
          </div>
          <hr>
          <div id="project-desc">
            ${e.desc}
          </div>
        </div>
      `)
    })
  })
  .fail(err => console.log(err))
}

$('#add-project').click(function(event){
  event.preventDefault()
  $('#project-add').show()
})

$('#btn-cancel-project').click(function(event){
  event.preventDefault()
  $('#project-add').hide()
  $('#title-project').val("")
  $('#desc-project').val("")
})

$('#btn-add-project').click(function(event){
  event.preventDefault()
  const title = $('#title-project').val()
  const desc = $('#desc-project').val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/projects`,
    headers: {
      access_token: localStorage.access_token
    },
    data : {
      title,
      desc
    }
  })
  .done(response => {
    $('#project-add').hide()
    showProject()
    $('#title-project').val("")
    $('#desc-project').val("")
  })
  .fail(err => {
    $('#modal-message').empty()
    $('#modal-message').append(err.responseJSON[0])
    $('#modal').fadeIn(1000)
  })
})

function projectDelete(id){
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/projects/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    showProject()
  })
  .fail(err => console.log(err))
}

function projectEdit(id){
  $(`#project-${id}`).empty()
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/projects/${id}`,
    headers : {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    console.log(response);
    $(`#project-${id}`).append(`
        <form class="form-floating">

          <div class="form-floating mb-2">
            <input type="text" class="form-control" id="title-project-${id}" value="${response.title}" placeholder="Title">
            <label>Project Title</label>
          </div>
          
          <div class="form-floating mb-2">
            <textarea class="form-control" placeholder="Leave a comment here" id="desc-project-${id}" style="height: 100px">${response.desc}</textarea>
            <label>Description</label>
          </div>

          <div>
            <a class="btn btn-primary" onClick="editProject(${id})">Edit</a>
            <a class="btn btn-danger" onClick="showProject()">Cancel</a>
          </div>
        </form>
    `)
  })
  .fail(err => console.log(err))
}

function editProject(id){
  const title = $(`#title-project-${id}`).val()
  const desc = $(`#desc-project-${id}`).val()
  
  $.ajax({
    method: 'PUT',
    url: `${baseUrl}/projects/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
    data : {
      title,
      desc
    }
  })
  .done(response=>{
    showProject()
  })
  .fail(err => {
    $('#modal-message').empty()
    $('#modal-message').append(err.responseJSON[0])
    $('#modal').fadeIn(1000)
  })
}

function projectMembers(id){
  $('#modal-project').empty()
  $('#modal-project').append(`
  <div class="modal-content">
    <div class="close" id="close-modal-project" onclick="closed()">X</div>
    <div class="modal-body d-flex justify-content-center align-items-center" id="modal-body">
      <div style="font-weight: bold;">Members</div>
      <div class="mb-3"><i class="fas fa-user-friends"></i></div>
      <div id="members">

      </div>
      <div id="btn-add-member">

      </div>
    </div>
  </div>
  `)
  
  $('#modal-project').fadeIn(1000)
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/projects/${id}/members`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(res=> {
    $('#members').empty()
    res.forEach(member => {
      $('#members').append(`<div>${member.email}</div>`)
    })
    $('#btn-add-member').empty()
    $('#btn-add-member').append(`
      <a class="btn btn-primary mt-3" onclick="addMember(${id})">Add member</a>
    `)
  })
  .fail(err => console.log(err))
}

function addMember(id){
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/users`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(res=>{
    $('#modal-body').empty()
    let members = res.map(member => `<option value="${member.id}">${member.email}</option>`)
    $('#modal-body').append(`
    <form>
      <select class="form-select" id="select-member">
        ${members}
      </select>
      <a class="btn btn-primary mt-4" id="selected-member" onclick="addProjectMember(${id})">Add member</a>
    </form>
    `)
  })
  .fail(err => console.log(err))
}

function addProjectMember(id){
  const userId = $('#select-member').val()
  const projectId = id
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/projects/${projectId}/add/${userId}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(res=> {
    $('#modal-project').fadeOut(1000)
  })
  .fail(err => console.log(err))
  
}

$('#close-modal').click(function(){
  $('#modal').fadeOut(1000)
})

function closed(){
  $('#modal-project').fadeOut(1000)
}