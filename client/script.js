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
function registerUser(email, password) {
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
      let msg = err.responseJSON[0].message
      console.log(msg);
      Swal.fire({
        icon: 'error',
        text: msg
      })
    })
    .always(() => {
      $("#emailRegister").val("")
      $("#passwordRegister").val("")
    })
}

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
      localStorage.setItem("access_token", response.access_token)
      checkAuth()
    })
    .fail(err => {
      let msg = err.responseJSON.message
      console.log(err);
      Swal.fire({
        icon: 'error',
        text: msg
      })
    })
    .always(() => {
      $("#emailLogin").val("")
      $("#passwordLogin").val("")
    })
}

//google login
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `${baseUrl}/googleLogin`,
    data: { id_token }
  })
    .done(response => {
      localStorage.setItem("access_token", response.access_token)
      checkAuth()
    })
    .fail((xhr, status) => {

    })
}
//======================Register, Login, Logout End============================


//====================== API START ============================================
function showCovidApi() {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/covid/cases`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      console.log(response);
      $("#covidApiArea").empty()
      $("#covidApiArea").append(
        `<h3>Global COVID cases numbers</h3>
      <p class="m-0" id="confirmed">Confirmed: ${(response.confirmed).toLocaleString('en')} person</p>
      <p class="m-0" id="recovered">Recovered: ${(response.recovered).toLocaleString('en')} person</p>
      <p class="m-0" id="deaths">Deaths: ${(response.deaths).toLocaleString('en')} person</p>
      <p>Use mask, wash hands, stay safe!</p>`
      )
      $("#covidApiArea").hide()
      $("#covidApiArea").fadeIn()
    })
    .fail(err => {
      console.log(err);
    })
}
//====================== API END ==============================================



//====================== CRUD START ===========================================
function addTodo(title, due_date, description, status) {
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
      Swal.fire({
        icon: 'success',
        text: "Todo created!"
      })
      $("#addForm").fadeOut(500, () => {
        checkAuth()
      })
    })
    .fail(err => {
      let msg = err.responseJSON[0].message
      console.log(msg);
      Swal.fire({
        icon: 'error',
        text: msg
      })
    })
    .always(() => {
      $("#title").val("")
      $("#due_date").val("")
      $("#description").val("")
    })
}

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

//patch todo status
function patchStatus(id) {
  var status
  console.log($(`#checkboxStatus${id}`).val());
  if ($(`#checkboxStatus${id}`).val() == "false") {
    status = true
  } else {
    status = false
  }

  $.ajax({
    method: "PATCH",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: {
      status
    }
  })
    .done(response => {
      getAllTodos()
      console.log(response);
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
      Swal.fire({
        icon: 'success',
        text: "Todo updated!"
      })
      $(`#showTodoDetail${id}`).fadeOut(() => {
        checkAuth()
      })
    })
    .fail(err => {
      console.log(title, due_date, description);
      console.log(err);
      let msg = err.responseJSON[0].message
      Swal.fire({
        icon: 'error',
        text: msg
      })
    })
}

//hide update form
function showUpdateForm(id) {
  $(`#showTodoDetail${id}`).fadeIn()
}
function hideUpdateForm(id) {
  $(`#showTodoDetail${id}`).fadeOut(() => {
    checkAuth()
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
      $(`#showTodoDetail${response.id}`).append(`<div class="card  p-3" style="width: 400px; id="showTodoDetail${response.id}">
        <form action="">
        <input type="text" id="title${response.id}" name="title" placeholder="Title" value="${response.title}">
        <input type="date" id="due_date${response.id}" name="due_date" value="${(response.due_date).split('T')[0]}"><br><br>
        <textarea style="width: 375px;" class="form-control" id="description${response.id}" name="description" rows="4" >${response.description}</textarea>
        <br>
        <button class="btn btn-primary" type="button" id="updateTodos" onclick="updateOneTodo(${response.id})" >Update</button>
        <button class="btn" type="button" id="cancelUpdate" onclick="hideUpdateForm(${response.id})">cancel</button>
        </form>
        </div>`)
        $(`#showTodoDetail${id}`).hide()
        showUpdateForm(id)
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
        if (element.status === true) {
          $("#showTodo").append(`
          <div id="showTodoDetail${element.id}">
            <div class="card m-3 p-1" style="width: 400px;">
              <div class="row g-0">
              <div class="col-md-1" style="display: grid;">
                <input checked value="${JSON.parse(element.status)}" onclick="patchStatus(${element.id})" type="checkbox" id="checkboxStatus${element.id}" style="margin: auto;">
              </div>
              <div class="col-md-11">
                <div class="card-body">
                  <h4 class="card-title">
                  ${element.title}
                  </h4>
                  <h6 class="card-text">
                  ${(element.due_date).split('T')[0]}
                  </h6>
                  <p class="card-text">
                  ${element.description}
                  </p>
                  <button class="btn" id="updateTodos" onclick="getOneTodo(${element.id})" type="submit">Update</button>
                  <button class="btn btn-danger" id="deleteTodos" onclick="deleteTodo(${element.id})" type="submit">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        `)
        } else {
          $("#showTodo").append(`
          <div id="showTodoDetail${element.id}">
            <div class="card m-3 p-1" style="width: 400px;">
              <div class="row g-0">
              <div class="col-md-1" style="display: grid;">
                <input value="${element.status}" onclick="patchStatus(${element.id})" type="checkbox" id="checkboxStatus${element.id}" style="margin: auto;">
              </div>
              <div class="col-md-11">
                <div class="card-body">
                  <h4 class="card-title">
                  ${element.title}
                  </h4>
                  <h6 class="card-text">
                  ${(element.due_date).split('T')[0]}
                  </h6>
                  <p class="card-text">
                  ${element.description}
                  </p>
                  <button class="btn" id="updateTodos" onclick="getOneTodo(${element.id})" type="submit">Update</button>
                  <button class="btn btn-danger id="deleteTodos" onclick="deleteTodo(${element.id})" type="submit">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        `)
        }

      });
    })
    .fail(err => {

    })
    .always(() => {

    })
}


//====================== CRUD END =============================================



//========================Document Ready=======================================
$(document).ready(() => {
  console.log("page reloaded");
  showCovidApi()

  //Register
  $("#createNewUser").click((event) => {
    event.preventDefault()
    var email = $("#emailRegister").val()
    var password = $("#passwordRegister").val()
    registerUser(email, password)
  })

  //show/hide register
  $("#toLogin").click((event) => {
    event.preventDefault()
    $("#register").fadeOut(300, () => {
      $("#login").fadeIn()
    })
  })

  //Login
  $("#loginUser").click((event) => {
    event.preventDefault()
    var email = $("#emailLogin").val()
    var password = $("#passwordLogin").val()
    console.log(email, password);
    login(email, password)
  })

  //show/hide login
  $("#toRegister").click((event) => {
    event.preventDefault()
    $("#login").fadeOut(300, () => {
      $("#register").fadeIn()
    })
  })

  //logout
  $("#logout").click((event) => {
    event.preventDefault()
    localStorage.clear()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    checkAuth()
  })

  //create todo
  $("#showAddForm").click((event) => {
    event.preventDefault()
    $("#addForm").fadeIn()
  })

  $("#hideAddForm").click((event) => {
    event.preventDefault()
    $("#addForm").fadeOut()
  })

  $("#addTodo").click((event) => {
    event.preventDefault()
    var title = $("#title").val()
    var due_date = $("#due_date").val()
    var description = $("#description").val()
    var status = false
    addTodo(title, due_date, description, status)
  })

  checkAuth()



})


