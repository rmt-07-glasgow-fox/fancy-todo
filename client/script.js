var baseUrl = "http://localhost:3000"
var todoList = []


//after function
function checkAuth() {
  if (localStorage.access_token) {
    $("#register").hide()
    $("#login").hide()
    $("#appDesc").hide()
    $("#logout").show()
    $("#createArea").show()
    $("#addForm").hide()
    getAllTodos()
    $("#showTodo").show()
    $("#covidApiArea").show()
  } else {
    $("#register").show()
    $("#login").hide()
    $("#appDesc").show()
    $("#logout").hide()
    $("#createArea").hide()
    $("#addForm").hide()
    $("#showTodo").hide()
    $("#covidApiArea").hide()
  }
}

//======================Register, Login, Logout Start==========================
//register
$("#createNewUser").click((event)=> {
  event.preventDefault()
  var email = $("#emailRegister").val()
  var password = $("#passwordRegister").val()
  console.log(email, password);

  $.ajax({
    method: "POST",
    url: `${baseUrl}/register`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response, "ini res");
    login(email, password)
  })
  .fail(err => {
    console.log(err, "ini err");
  })
  .always(() => {
    $("#emailRegister").val("")
    $("#passwordRegister").val("")
  })
})
$("#toLogin").click((event)=> {
  event.preventDefault()
  $("#register").hide()
  $("#login").show()
})

//login
function login(email, password) {
  $.ajax({
    method: "POST",
    url: `${baseUrl}/login`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response, "ini res");
    localStorage.setItem("access_token", response.access_token)
    checkAuth()
  })
  .fail(err => {
    console.log(err, "ini err");
  })
  .always(() => {
    $("#emailLogin").val("")
    $("#passwordLogin").val("")
  })
}

$("#loginUser").click((event)=> {
  event.preventDefault()
  var email = $("#emailLogin").val()
  var password = $("#passwordLogin").val()
  console.log(email, password);
  login(email, password)
})
$("#toRegister").click((event)=> {
  event.preventDefault()
  $("#login").hide()
  $("#register").show()
})

//logout
$("#logout").click((event) => {
  event.preventDefault()
  localStorage.clear()
  checkAuth()
})

//======================Register, Login, Logout End============================

//====================== CRUD START ===========================================
//create todo
$("#showAddForm").click((event) => {
  event.preventDefault
  $("#addForm").show()
})
$("#hideAddForm").click((event) => {
  event.preventDefault
})
$("#addTodo").click((event) => {
  event.preventDefault
  var title = $("#title").val()
  var due_date = $("#due_date").val()
  var description = $("#description").val()
  var status = false
  $.ajax({
    method: "POST",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      due_date,
      description,
      status
    }
  })
  .done(response => {
    console.log(response);
  })
  .fail(err => {
    console.log(err);
  })
  .always(() => {
    $("#title").val("")
    $("#due_date").val("")
    $("#description").val("")
  })
})

//delete todo
function deleteTodo(id) {
  $.ajax({
    method: "DELETE",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    getAllTodos()
  })
  .fail(err => {
    console.log(err);
  })
}

//update todo
function updateOneTodo(id) {
  var title = $(`#title${id}`).val()
  var due_date = $(`#due_date${id}`).val()
  var description = $(`#description${id}`).val()
  $.ajax({
    method: "PUT",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      title,
      due_date,
      description,
    }
  })
  .done(response => {
    getAllTodos()
  })
  .fail(err => {
    console.log(title, due_date, description);
    console.log(err);
  })
}

//get one todo
function getOneTodo(id) {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
  })
  .done(response => {
    console.log(response);
    $(`#showTodoDetail${response.id}`).empty()
    $(`#showTodoDetail${response.id}`).append(`<div id="showTodoDetail${response.id}">
        <form action="">
          <input type="text" id="title${response.id}" name="title" placeholder="Title" value="${response.title}">
          <input type="date" id="due_date${response.id}" name="due_date" value="${(response.due_date).split('T')[0]}"><br><br>
          <input type="text" id="description${response.id}" name="description" placeholder="What's the detail?" value="${response.description}"><br><br>
          <button id="updateTodos" onclick="updateOneTodo(${response.id})" type="submit">Update</button>
          <button id="deleteTodos" onclick="" type="submit">cancel</button>
        </form>
      </div>`)
  })
  .fail(err => {
    console.log(err);
  })
}

//get all todo
function getAllTodos() {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
  .done(response => {
    todoList = response
    $("#showTodo").empty()
    todoList.forEach(element => {
      $("#showTodo").append(`<div id="showTodoDetail${element.id}">
        <div>${element.status}</div>
        <h3 id="showTitle">${element.title}</h3>
        <p id="showDate">${(element.due_date).split('T')[0]}</p>
        <p id="showDescription">${element.description}</p>
        <button id="updateTodos" onclick="getOneTodo(${element.id})" type="submit">Update</button>
        <button id="deleteTodos" onclick="deleteTodo(${element.id})" type="submit">Delete</button>
      </div>`)
    });
  })
  .fail(err => {

  })
  .always(() => {

  })
}





//====================== CRUD END =============================================


//========================Document Ready=======================================
$(document).ready(()=> {
  console.log("page reloaded");
  checkAuth()

})