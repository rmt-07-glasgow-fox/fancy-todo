let baseUrl = 'http://localhost:3000'
let todoList = []

$(document).ready(function(){
  checkAuth()
})

function checkAuth(){
  if(localStorage.access_token){
    $("#todo-list").show()
    getTodoList()
    $("#form-login").hide()
    $("#btn-logout").show()
  }else{
    $("#todo-list").hide()
    $("#form-login").show()
    $("#btn-logout").hide()
  }
}

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

$('#btn-logout').click(function(){
  localStorage.clear()
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
      $('#todo-list').append(`<div class="card col-12" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${e.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${e.dueDate}</h6>
                    <p class="card-text">${e.description}</p>
                    <a href="#" class="card-link" onclick="editTodo(${e.id})">Edit</a>
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
