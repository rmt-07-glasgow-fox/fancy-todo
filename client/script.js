var baseUrl = "http://localhost:3000"

function showPage(id) {
  $(".content").hide()
  $(".login").hide()
  $(".navbar").hide()
  $(".edit").hide()
  $(".add").hide()
  $(".signup").hide()
  $("#addNew").hide()
  $(id).show()
}

function checkAuth() {
  if (localStorage.getItem("access_token")) {
    showPage("#content")
    $(".navbar").show()
    $("#addNew").show()
    getToDo()
  } else {
    showPage("#login-form")
  }
}

function getToDo() {
  $.ajax({
    method: "GET",
    url: baseUrl+`/todos`,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(response => {
    $("#content").empty()
    response.todos.forEach(todo => {
      $("#content").append(`
        <div class="card-body">
          <h5 class="card-title">${todo.title}</h5>
          <p class="card-text">${todo.description}</p>
          <h1>${todo.status}</h1>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="todo.status === "done" ? "checked"" id="flexCheckIndeterminate">
            <label class="form-check-label" for="flexCheckIndeterminate">Is it done ?
            </label>
          </div>
          <a href="#" class="btn btn-primary" onclick="updateForm(${todo.id})" id="toupdate">Update</a>
          <a href="#" class="btn btn-primary" onclick="deleteList(${todo.id})" id="delete">Delete</a>
          <a href="#" class="btn btn-primary" onclick="changeStatus(${todo.id})" id="updateStatus">Update Status</a>
        </div>
        `)
    })
  })
  .fail(xhr => {
    const {message} = xhr.responseJSON
    $("#error-login").text(message)
  })
}

$(".navbar-brand").click(function() {
  showPage("#content")
  $(".navbar").show()
})

$("#nothaveacc").click(function(event) {
  event.preventDefault()
  showPage("#signup-form")
  // $("#login-form").hide()
})

$("#haveacc").click(function(event) {
  event.preventDefault()
  showPage("#login-form")
})

$(document).ready(function(){
  checkAuth()
})

$("#signUp").click(function(event){
  event.preventDefault()
  var email = $("#email").val()
  var password = $("#password").val()

  $.ajax({
    method: "POST",
    url: baseUrl+`/signUp`,
    data: {
      email, password
    }
  })
  .done(response => {
    showPage("#login-form")
    $("#email").val("")
    $("#password").val("")
    $("#error-login").text("")
  })
  .fail(xhr => {
    const {message} = xhr.responseJSON
    $("#error-login").text(message)
  })
})

$("#signIn").click(function(event){
  event.preventDefault()
  var email = $("#email").val()
  var password = $("#password").val()

  $.ajax({
    method: "POST",
    url: baseUrl+`/signIn`,
    data: {
      email, password
    }
  })
  .done(response => {
    localStorage.setItem("access_token", response.access_token)
    checkAuth()
    $("#email").val("")
    $("#password").val("")
    $("#error-login").text("")
  })
  .fail(xhr => {
    const {message} = xhr.responseJSON
    $("#error-login").text(message)
  })
})

$("#signOut").click(function() {
  localStorage.clear()
  checkAuth()
})

$("#addNew").click(function() {
  showPage("#add-form")
  $(".navbar").show()
})

$("#add").click(function(event){
  event.preventDefault()
  var title = $("#title").val()
  var description = $("#description").val()
  var due_date = $("#due_date").val()

  $.ajax({
    method: "POST",
    url: baseUrl+`/todos`,
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      title, description, status, due_date
    }
  })
  .done(response => {
    showPage("#content")
  })
  .fail(xhr => {
    const {message} = xhr.responseJSON
    $("#error-login").text(message)
  })
})

function updateForm(id) {
  showPage("#edit-form")
  $(".navbar").show()

  $("#update").click(function(event){
    event.preventDefault()
    var title = $("#title").val()
    var description = $("#description").val()
    var status = "done"
    var due_date = $("#due_date").val()

    $.ajax({
      method: "PUT",
      url: baseUrl+`/todos/${id}`,
      headers: {
        access_token: localStorage.getItem("access_token")
      },
      data: {
        title, description, status, due_date
      }
    })
    .done(response => {
      showPage("#content")
    })
    .fail(xhr => {
      const {message} = xhr.responseJSON
      $("#error-login").text(message)
    })
  })
}

function changeStatus(id) {
  $.ajax({
    method: "PATCH",
    url: baseUrl+`/todos/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      
    }
  })
  .done(response => {
    showPage("#content")
  })
  .fail(xhr => {
    const {message} = xhr.responseJSON
    $("#error-login").text(message)
  })
}
 
function deleteList(id) {
  $.ajax({
    method: "DELETE",
    url: baseUrl+`/todos/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(response => {
    showPage("#content")
  })
  .fail(xhr => {
    const {message} = xhr.responseJSON
    $("#error-login").text(message)
  })
}