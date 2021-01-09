var baseUrl = "http://localhost:3000"
var todos = []
var user = []

function getUser() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/user`,
    })
    .done(res => {
        user = res
        console.log('user get');
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}

$(document).ready(function(){
    console.log("page reload");
    checkAuth()
    


    $.ajax({
        method: 'GET',
        url: `${baseUrl}/jokes`,
    })
    .done(res => {
    $(".nav-side-login-jokes").append(res)
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
})
$('.sign-up-atuh').click(function() {
    $('.kondisi-log-out').show()
    $('.kondisi-sign-in').hide()
    $('.kondisi-log-in').hide()
})

$('.sign-in-atuh').click(function() {
    $('.kondisi-log-out').hide()
    $('.kondisi-sign-in').show()
    $('.kondisi-log-in').hide()
})

function checkAuth() {
    if (localStorage.access_token) {
        console.log("log out");
        getTodo()
        $('.kondisi-log-out').hide()
        $('.kondisi-sign-in').hide()
        $('.kondisi-log-in').show()
        $('.kondisi-project').hide()


    } else {
        console.log("log out");
        $('.kondisi-log-out').hide()
        $('.kondisi-sign-in').show()
        $('.kondisi-log-in').hide()
        $('.kondisi-project').hide()

    }
}



function getTodo() {
    $('.kondisi-log-in').show()
    $('.kondisi-project').hide()
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(res => {
        console.log(res);
        todos = res
        console.log(todos);
        $('#append-todos').empty()
        todos.forEach(element => {
            if (element.status === "important") {
                $('#append-todos').append(
                    `<div class="card col-12" style="width: 26rem;" onclick="storeItem(todos, ${element.id})">
                    
                    <div class="rating-checked">
                        <span onclick="changeNotClear(todos, ${element.id})" >☆</span>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" name="title">${element.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted" name="description">${element.description}</h6>
                            <p class="card-text" name="status">${element.status}</p>
                            <p class="card-text" name="due_date">${convertDate(element.due_date)}</p>
                           
                        </div>
                    </div>`
                    )
            } else {
            $('#append-todos').append(
                `<div class="card col-12" style="width: 26rem;" onclick="storeItem(todos, ${element.id})">
                
                <div class="rating">
                    <span onclick="changeImportant(todos, ${element.id})">☆</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title" name="title">${element.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted" name="description">${element.description}</h6>
                        <p class="card-text" name="status">${element.status}</p>
                        <p class="card-text" name="due_date">${convertDate(element.due_date)}</p>
                       
                    </div>
                </div>`
                )}
            });
        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}
//changeNotClear()
//changeImportant()

function changeNotClear(todos,id) {
    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token,
        },
        data :{
            status: "not_clear"

        }
    })
    .done(res => {
        getTodo()        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}

function changeImportant(todos,id) {
    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token,
        }, 
        data: {
            status: "important"
        }
    })
    .done(res => {
        getTodo()        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}



function storeItem(todos, id) {
    let todo = todos.find(x => x.id === id)
    $('#append-item').empty()
    if (todo.status === "clear") {
        $('#append-item').append(
            `<div class="box-body mt-2">
            <h3 class="box-title" name="title">${todo.title}</h5>
            <h6 class="box-subtitle mb-2 text-muted" name="description">${todo.description}</h6> 
            <p class="box-text" name="status">${todo.status}</p>
            <p class="box-text" name="due_date">${convertDate(todo.due_date)}</p>
            <a onclick="delet(todos, ${todo.id})" class="btn btn-primary">Delete</a>
        </div>`
        )
    } else {
        $('#append-item').append(
            `<div class="box-body mt-2">
            <h3 class="box-title" name="title">${todo.title}</h5>
            <h6 class="box-subtitle mb-2 text-muted" name="description">${todo.description}</h6> 
            <p class="box-text" name="status">${todo.status}</p>
            <p class="box-text" name="due_date">${convertDate(todo.due_date)}</p>
            <a onclick="edit(todos, ${todo.id})"class="btn btn-primary">Edit</a>
            <a onclick="delet(todos, ${todo.id})" class="btn btn-primary">Delete</a>
            <a onclick="changeClear(todos, ${todo.id})" class="btn btn-primary">Marks As Done</a>
    
        </div>`
        )
    }
    
}

function changeClear(todos,id) {
    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token,
        }, 
        data: {
            status: "clear"

        }
    })
    .done(res => {
        getTodo()        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}

$('#log-out-bn').click(function() {
    localStorage.clear()
    signOut()
    checkAuth()
})




function getStatusClear(value) {
    $('.kondisi-log-in').show()
    $('.kondisi-project').hide()
    value = "clear"
    $('#append-item').empty()
    $('#append-item').append(`<div class="box-body mt-2">
    <h3 class="box-title" name="title">See what you can achieve!</h5>
    <h6 class="box-subtitle mb-2 text-muted" name="description">Task management, time tracking and billing for freelancers, consultants and teams.</h6> 
    </div>`)
    
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/find/status`,
        headers: {
            access_token: localStorage.access_token,
            status: value
        }
       
    })
    .done(res => {
        console.log(res);
        todos = res
        console.log(todos);
        $('#append-todos').empty()
        todos.forEach(element => {
            $('#append-todos').append(
                `<div class="card col-12" style="width: 26rem;" onclick="storeItem(todos, ${element.id})">
                    <div class="card-body">
                        <h5 class="card-title" name="title">${element.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted" name="description">${element.description}</h6>
                        <p class="card-text" name="status">${element.status}</p>
                        <p class="card-text" name="due_date">${convertDate(element.due_date)}</p>
                       
                    </div>
                </div>`
        )});
        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}

function getStatusImportant(value) {
    $('.kondisi-log-in').show()
    $('.kondisi-project').hide()
    value = "important"
    $('#append-item').empty()
    $('#append-item').append(`<div class="box-body mt-2">
    <h3 class="box-title" name="title">See what you can achieve!</h5>
    <h6 class="box-subtitle mb-2 text-muted" name="description">Task management, time tracking and billing for freelancers, consultants and teams.</h6> 
    </div>`)

    $.ajax({
        method: 'GET',
        url: `${baseUrl}/find/status`,
        headers: {
            access_token: localStorage.access_token,
            status: value
        }
    })
    .done(res => {
        console.log(res);
        todos = res
        console.log(todos);
        $('#append-todos').empty()
        todos.forEach(element => {
            $('#append-todos').append(
                `<div class="card col-12" style="width: 26rem;" onclick="storeItem(todos, ${element.id})">
                <div class="rating-checked">
                    <span >☆</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title" name="title">${element.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted" name="description">${element.description}</h6>
                        <p class="card-text" name="status">${element.status}</p>
                        <p class="card-text" name="due_date">${convertDate(element.due_date)}</p>
                       
                    </div>
                </div>`
        )});
        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}




function addTodos() {
        $('#append-item').empty()
        $('#append-item').append(
            `
            <form >
            <h4 class="mt-2 p-0"style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-style: inherit;">New Todo</h4>
            <hr>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title-insert" aria-describedby="emailHelp">
                </div>
                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="date" class="form-control" id="date-insert" aria-describedby="emailHelp">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description-insert" aria-describedby="emailHelp"></textarea>
                </div>
                <br>
                <button type="submit" class="btn btn-primary" id="add-btn" onclick="insertTodos()">Submit</button>
            </form>`
        )
}

function insertTodos() {
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token,
        },
        data: {
            title: $("#title-insert").val(),
            due_date: $("#date-insert").val(),
            description: $("#description-insert").val()
        }
    })
    .done(res => {
        getTodo()        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}
function convertDate(str) {
    let date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

function edit(todos, id) {
    let todo = todos.find(x => x.id === id)
    $('#append-item').empty()
    console.log(todo);
    $('#append-item').append(
        `
    <form >
    <h4 class="mt-2 p-0"style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-style: inherit;">Edit Todo</h4>
    <hr>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" value="${todo.title}" class="form-control" id="title-update" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="date">Date</label>
            <input type="date" value="${convertDate(todo.due_date)}"class="form-control" id="datetitle-update" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" value=""id="descriptiontitle-update" aria-describedby="emailHelp">${todo.description}</textarea>
        </div>
        <br>
        <button type="submit" class="btn btn-primary" onclick="updateTodo(${todo.id})"id="update-btn">Update</button>
        <button type="submit" class="btn btn-primary" onclick="delet(todos, ${todo.id})" id="delete-btn">Delete</button>

    </form>`
    )
}

function delet(todos, id) {
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token,
        }
    })
    .done(res => {
    $('#append-item').empty()
        getTodo()
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}

function updateTodo(id) {
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token,
        },
        data: {
            title: $("#title-update").val(),
            due_date: $("#date-update").val(),
            description: $("#description-update").val(),
            status: "not_clear"
        }
    })
    .done(res => {
    $('#append-item').empty()
    getTodo()
        
    })
    .fail(err => {
        console.log(err);
        // alert("wow")
        $('.alert-success').show()
        $('.alert-success').append(err)
    })
    .always(() => {
        console.log("complete");
    })
}

// registerUser
// loginUser


function registerUser() {
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {
            email: $("#user_email-register").val(),
            password: $("#user_password-register").val(),
        }
    })
    .done(res => {
        checkAuth()
        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}

function loginUser() {
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email: $("#email-login").val(),
            password: $("#password-login").val(),
        }
    })
     .done(res => {
        localStorage.setItem('access_token',res.access_token)
        checkAuth()
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
        $('#email-login').val('')
        $('#password-login').val('')
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data: {
            id_token
        }
    })
    .done(res => {
        console.log(res);
        localStorage.setItem('access_token', res.access_token)
        checkAuth()
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}



function getStatusNotClear(value) {
    $('.kondisi-log-in').show()
    $('.kondisi-project').hide()
    $('#append-item').empty()
    $('#append-item').append(`<div class="box-body mt-2">
    <h3 class="box-title" name="title">See what you can achieve!</h5>
    <h6 class="box-subtitle mb-2 text-muted" name="description">Task management, time tracking and billing for freelancers, consultants and teams.</h6> 
    </div>`)
    value = "not_clear"
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/find/status`,
        headers: {
            access_token: localStorage.access_token,
            status: value

        }
    })
    .done(res => {
        console.log(res);
        todos = res
        console.log(todos);
        $('#append-todos').empty()
        todos.forEach(element => {
            $('#append-todos').append(
                `<div class="card col-12" style="width: 26rem;" onclick="storeItem(todos, ${element.id})">
                <div class="rating">
                    <span >☆</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title" name="title">${element.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted" name="description">${element.description}</h6>
                        <p class="card-text" name="status">${element.status}</p>
                        <p class="card-text" name="due_date">${convertDate(element.due_date)}</p>
                       
                    </div>
                </div>`
        )});
        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}

function getStatusToday(value) {
    $('.kondisi-log-in').show()
    $('.kondisi-project').hide()
    $('#append-item').empty()
    $('#append-item').append(`<div class="box-body mt-2">
    <h3 class="box-title" name="title">See what you can achieve!</h5>
    <h6 class="box-subtitle mb-2 text-muted" name="description">Task management, time tracking and billing for freelancers, consultants and teams.</h6> 
    </div>`)
    value = "important"
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/find/today`,
        headers: {
            access_token: localStorage.access_token,
            status: value

        }
    })
    .done(res => {
        console.log(res);
        todos = res
        console.log(todos);
        $('#append-todos').empty()
        todos.forEach(element => {
            $('#append-todos').append(
                `<div class="card col-12" style="width: 26rem;" onclick="storeItem(todos, ${element.id})">
                <div class="rating">
                    <span >☆</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title" name="title">${element.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted" name="description">${element.description}</h6>
                        <p class="card-text" name="status">${element.status}</p>
                        <p class="card-text" name="due_date">${convertDate(element.due_date)}</p>
                       
                    </div>
                </div>`
        )});
        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log("complete");
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

function project() {
    $('.kondisi-log-in').hide()
    $('.kondisi-project').show()
    $('.kondisi-log-out').hide()
    $('.kondisi-sign-in').hide()
}



function addProject() {
    $('#append-item-project').empty()
    $('#append-item-project').append(
        `
        <form >
        <h4 class="mt-2 p-0"style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-style: inherit;">New Project</h4>
        <hr>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title-insert" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="date">Date</label>
                <input type="date" class="form-control" id="date-insert" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description-insert" aria-describedby="emailHelp"></textarea>
            </div>
            <div class="form-group">
                <label for="member">Member</label>
                <input type="selection" class="form-control overflow-auto" id="member-insert" aria-describedby="emailHelp">
                <br>
                <select name="genre" id="genre">
                <option selected hidden value="">Pick a member</option>
                </select>
                <button type="submit" class="btn btn-secondary" id="add-btn" onclick="insertTodos()">Add</button>
            </div>
            <br>
            <button type="submit" class="btn btn-primary" id="add-btn" onclick="insertTodos()">Submit</button>
        </form>`
    )
}
