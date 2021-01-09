const SERVER = "http://localhost:3001"
let data
$(document).ready(()=>{
    const token = localStorage.getItem("token")
    if(token){
        $("#addbutton").show()
        $("#errorbar").hide()
        $("#todo").hide();
        $("#login").hide();
        $("#todos").show();
        $("#weatherbar").show();
        $("#login-button").hide();
        $("#signup-button").hide();
        $("#logout-button").show();
        $("#signup").hide()
        $("#add").hide()
        showWeather();
        showToDo()

    }
    else{
        $("#addbutton").hide()
        $("#errorbar").hide()
        $("#signup").hide()
        $("#todos").hide();
        $("#todo").hide()
        $("#weatherbar").hide();
        $("#login").show();
        $("#login-button").hide();
        $("#signup-button").hide();
        $("#logout-button").hide();
        $("#add").hide()
    }
})

function showSignUp(){
    $("#errorbar").hide()
    $("#signup").show()
    $("#login").hide();
    $("#register").hide();
    $("#home").hide();
    $("#todos").hide();
    $("#todo").hide();
    $("#weatherbar").hide();
    $("#login-button").hide();
    $("#signup-button").hide();
    $("#logout-button").hide();
    $("#add").hide()
}

function showLogin() {
    $("#errorbar").hide()
  $("#login").show();
  $("#register").hide();
  $("#home").hide();
  $("#todos").hide();
  $("#todo").hide();
  $("#weatherbar").hide();
  $("#login-button").hide();
  $("#signup-button").hide();
  $("#logout-button").hide();
  $("#signup").hide()
  $("#add").hide()
}
function showToDoForm() {
    const token = localStorage.token
    if(token){
        $("#addbutton").show()
        $("#errorbar").hide()
        $("#login").hide();
        $("#register").hide();
        $("#home").hide();
        $("#todos").hide();
        $("#todo").hide();
        $("#weatherbar").hide();
        $("#login-button").hide();
        $("#signup-button").hide();
        $("#logout-button").show();
        $("#signup").hide()
        $("#add").show()
    }else{
        $("#addbutton").hide()
        $("#errorbar").hide()
        $("#add").hide()
        $("#login-button").show();
        $("#signup-button").show();
        $("#logout-button").hide();
    }

}
  

function home(){
    $("#errorbar").hide()
    $("#signup").hide()
    $("#login").hide()
    $("#todo").hide();
    $("#add").hide()
    const token = localStorage.token
    if(token){
        $("#addbutton").show()
        $("#errorbar").hide()
        $("#todos").show();
        $("#weatherbar").show()
        $("#login-button").hide();
        $("#signup-button").hide();
        $("#logout-button").show();
        $("#add").hide()
        showToDo()
    }else{
        $("#addbutton").hide()
        $("#login-button").show();
        $("#signup-button").show();
        $("#logout-button").hide();
    }
}
function showWeather(event) {
    $("#kota").empty();
    $("#temp").empty();
    $("#weather").empty();
    $.ajax({
        method: "GET",
        url: SERVER + "/weather",
    })
    .done((result) => {
    console.log(result);
    $("#kota").append(`${result.name}`);
    $("#temp").append(`Temp: ${result.temp}`);
    $("#weather").append(`Weather: ${result.weather}`);
    })
    .fail((err)=>{
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p class="font-weight-bold" >${err.status} ${err.responseJSON.msg}</p>
        `)
    })
}

function signUp(event) {
    event.preventDefault()
    console.log('ooooyy');
    const email = $("#signup-email").val()
    const password = $("#signup-password").val()
    console.log(email||"kosong",password);

    $.ajax({
        method: "POST",
        url: SERVER + "/register",
        data: {
        email,
        password
        },
    })
    .done(result=>{
        $("#errorbar").hide()
        $("#signup").hide()
        $("#login").show()
    })
    .fail((err)=>{
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p class="font-weight-bold" >${err.status} ${err.responseJSON.msg}</p>
        `)
    })

}

function login(event) {
    event.preventDefault()
    console.log('ooooyy');
    const email = $("#email").val()
    const password = $("#password").val()
    console.log(email||"kosong",password);

    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
        email,
        password
        },
    })
    .done(result=>{
        const token = result.accessToken
        // console.log(token);
        localStorage.setItem("token",token)
        $("#errorbar").hide()
        $("#todo").hide();
        $("#login").hide()
        $("#todos").show();
        $("#weatherbar").show();
        $("#logout-button").show();        
        showToDo()
        showWeather()
    })
    .fail((err)=>{
        console.log(err);
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p class="font-weight-bold" >${err.status} ${err.responseJSON.message}</p>
        `)
    })

}
function addToDo(event){
    event.preventDefault()
    console.log('ooooyy');
    const title = $("#title").val()
    const description = $("#description").val()
    const due_date = $("#due_date").val()
    console.log(title||"kosong",description);

    $.ajax({
        method: "POST",
        url: SERVER + "/todos",
        data: {
        title,
        description,
        due_date
        },
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(result=>{
        $("#fetch-todo").empty()
        $("#add").hide()
        $("#errorbar").hide()
        $("#home").show()
        home()
    })
    .fail((err)=>{
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p class="font-weight-bold" >${err.status} ${err.responseJSON.msg}</p>
        `)
    })
}

function showToDo(){
    $("#fetch-todos").empty()
    $("#errorbar").hide()
    $.ajax({
        method: "GET",
        url: SERVER + "/todos",
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(result=>{
        todos=result
        console.log(todos);
        $.each(todos, (key, value)=>{
            console.log(value.User.email);
            $("#fetch-todos").append(`
            <div class="card col-3 mx-4 mb-4 btn" onclick="showToDoById(${value.id})" >
            <div class="card-body">
                <h5 class="card-title">${value.title}</h5>
                <p class="card-text"><b>Description</b>: ${value.description}</p>
                <p class="card-text"><b>Due Date</b>: ${value.due_date.split("T")[0]}</p>
                <p class="card-text"><b>Status</b>: ${value.status}</p>
                <p class="card-text"><b>Posted by</b>: ${value.User.email}</p>
            </div>
            </div>`);
        })
    })
    .fail((err)=>{
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p class="font-weight-bold" >${err.status} ${err.responseJSON.msg}</p>
        `)
    })
}
function showToDoById(id){
    $("#errorbar").hide()
    $("#todos").hide();
    $("#fetch-todo").empty()
    $("#todo").show();
    $('#editToDo').hide()
    
    $.ajax({
        method: "GET",
        url: SERVER + `/todos/${id}`,
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(result=>{

        todo=result
        localStorage.setItem("title",todo.title)
        localStorage.setItem("description",todo.description)
        localStorage.setItem("due_date",todo.due_date.split("T")[0])
        localStorage.setItem("status",todo.status)
        localStorage.setItem("id",id)

            $("#fetch-todo").append(`
            <div class="card col-3 mx-4 mb-4">
            <div class="card-body">
                <h5 class="card-title">${todo.title}</h5>
                <p class="card-text"><b>Description</b>: ${todo.description}</p>
                <p class="card-text"><b>Due Date</b>: ${todo.due_date.split("T")[0]}</p>
                <p class="card-text"><b>Status</b>: ${todo.status}</p>
                <button type="button" class="btn btn-info" id="edit-button" onclick="showEdit()">Edit</button>
                <button type="button" class="btn btn-danger ml-1" id="delete-button" onclick="deletetodo(${todo.id})" >Delete</button> 
                <button type="button" class="btn btn-info mt-2" id="complete-button" onclick="completeToDo(${todo.id})" : null >Complete</button>
            </div>
            </div>`);
            if(todo.status == 'completed'){
                $('#complete-button').hide()
            }else{
                $('#complete-button').show()
            }
    })
    .fail((err)=>{
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p class="font-weight-bold" >${err.status} ${err.responseJSON.msg}</p>
        `)
    })
}

function showEdit(){
        const title = localStorage.title
        const description = localStorage.description
        const status = localStorage.status
        const due_date = localStorage.due_date
        $("#errorbar").hide()
        $('#todo').hide()
        $('#editToDo').show()
        $("#fetch-edit").empty()
        $('#fetch-edit').append(`           
        <form action="" onsubmit="editToDo(event)">
        <div class="form-group">
            <label for="edittitle">Title</label>
            <input class="form-control" value="${title}" type="text" id="edittitle">
        </div>
        <div class="form-group">
            <label for="editdescription">Description</label>
            <input class="form-control" value="${description}" type="text" id="editdescription" >
        </div>
        <div class="form-group">
            <label for="editdue_date">Due Date</label>
            <input class="form-control" type="date" value="${due_date}" id="editdue_date" >
        </div>
        <div class="form-group">
            <label for="editstatus">Status</label>
            <select class="form-control" id="editstatus" >
                <option value="not complete">not complete</option>
                <option value="completed">completed</option>
            </select>
        </div>                       
        <button type="submit" class="btn btn-success">Edit</button>
        </form>`)
}

function editToDo(event){
    event.preventDefault()
    const title = $("#edittitle").val()
    const description = $("#editdescription").val()
    const due_date = $("#editdue_date").val()
    const status = $("#editstatus").val()
    const id = localStorage.id
    console.log(title, description, due_date, status);
    const token = localStorage.token

    $.ajax({
        method: "PUT",
        url: SERVER + `/todos/${id}`,
        data: {
            title,
            description,
            due_date,
            status
        },
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(()=>{
        $("#fetch-todo").empty()
        $("#errorbar").hide()
        $("#editToDo").hide();
        showToDoById(id)
    })
    .fail((err)=>{
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p class="font-weight-bold" >${err.status} ${err.responseJSON.msg}</p>
        `)
    })
}

function completeToDo(id){
    const token = localStorage.token
    $.ajax({
        method: "PATCH",
        url: SERVER + `/todos/${id}`,
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(()=>{
        $("#fetch-todo").empty()
        $("#errorbar").hide()
        $("#todo").show();
        showToDoById(id)
    })
    .fail((err)=>{
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p class="font-weight-bold" >${err.status} ${err.responseJSON.msg}</p>
        `)
    })
}

function deletetodo(id){
    const token = localStorage.token
    $.ajax({
        method: "DELETE",
        url: SERVER + `/todos/${id}`,
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(()=>{
        $("#fetch-todo").empty()
        $("#todo").hide
        $("#errorbar").hide()
        $("#home").show
        home()
    })
    .fail((err)=>{
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p class="font-weight-bold" >${err.status} ${err.responseJSON.msg}</p>
        `)
    })
}

function logout() {
    localStorage.clear()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
    $("#weatherbar").hide();
    $("#errorbar").hide()
    $("#todos").hide();
    $("#todo").hide();
    $("#login-button").show();
    $("#signup-button").show();
    $("#logout-button").hide();
    $("#add").hide()

}

// Google SignIn
function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
  
    $.ajax({
      method: "POST",
      url: SERVER + "/googleLogin",
      data: {
        google_token,
      },
    })
      .done((response) => {
        const token = response.accessToken;
        localStorage.setItem("token", token);
        $("#todo").hide();
        $("#login").hide()
        $("#todos").show();
        $("#weatherbar").show();
        $("#logout-button").show();
        $("#errorbar").hide()
        showToDo()
        showWeather()
      })
      .fail((err)=>{
        $("#errorbar").show()
        $("#errormsg").empty()
        $("#errormsg").append(`
        <p>${err}</p>
        `)
    })
  }
  
  // Google SignOut
  function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
  }
  
