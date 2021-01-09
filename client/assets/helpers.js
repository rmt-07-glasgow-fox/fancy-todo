let editData

//page
function homepage () {
    $('#list').hide()
    $('#signin').hide()
    $('#signup').hide()
    $('#logout').hide()
}

function listpage () {
    $('#list').show()
    $('#edittodo').hide()
    $('#home').hide()
    $('#signin').hide()
    $('#signup').hide()
    $('#navSignup').hide()
    $('#navLogin').hide()
    fetchTodo()
    weather()
    videos()
}

function loginpage() {
    $('#signin').show()
    $('#edittodo').hide()
    $('#home').hide()
    $('#list').hide()
    $('#signup').hide()
}

function signuppage() {
    $('#signup').show()
    $('#home').hide()
    $('#list').hide()
    $('#signin').hide()
}

function editpage(id) {
    $('#list').show()
    $('#edittodo').show()
    $('#createtodo').hide()
    $('#home').hide()
    $('#signin').hide()
    $('#signup').hide()
    $('#navSignup').hide()
    $('#navLogin').hide()
    fetchTodoByid(id)
}

//function
function signup() {
    let email = $('#emailSignup').val()
    let password = $('#passwordSignup').val()
    console.log(email, password);
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register', 
        data: {email: email, password: password}
    })
    .done(data => {
        console.log(data)
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $('#registerForm').trigger('reset')
    })
}

function login() {
    let email = $('#emailSignup').val()
    let password = $('#passwordSignup').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login', 
        data: {email, password}
    })
    .done(data => {
        localStorage.setItem('access_token', data.access_token)
        listpage()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $('#loginForm').trigger('reset')
    })
}

function fetchTodo() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos', 
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(data => {
        $("#listTodo").empty()
        data.forEach(element => {
            element.due_date = element.due_date.replace('T00:00:00.000Z', '')
            $("#listTodo").append(`
            <div class="card my-3 border">
                <div class="card-header">
                    <input type="checkbox" name="status" id="status" class="form-check-input">
                    ${element.title}
                </div>
                <div class="card-body">${element.description}</div>
                <div class="card-footer"> ${element.due_date} <br> <br>
                <button class="btn btn-dark" onclick="editpage(${element.id})"> Edit </button> <button class="btn btn-dark" onclick="deleteTodo(${element.id})"> Delete </button> 
                </div>
            </div>
            `)
        })
        $('#createtodo').show()
        $('#edittodo').hide()
    })
    .fail(err => {
        console.log(err)
    })
}

function createTodo() {
    let title = $('#titleCreate').val()
    let description = $('#descriptionCreate').val()
    let due_date = $('#dueDateCreate').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos', 
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            due_date
        }
    })
    .done(data => {
        console.log(data);
        fetchTodo()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $('#createForm').trigger('reset')
    })
}

function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`, 
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(data => {
        fetchTodo()
    })
    .fail(err => {
        console.log(err);
    })
}

function logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    homepage()
}

function fetchTodoByid(id) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`, 
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(data => {
        editData = data
        data.due_date = data.due_date.replace('T00:00:00.000Z', '')
        let title = $('#titleEdit').val(data.title)
        let description = $('#descriptionEdit').val(data.description)
        let due_date = $('#dueDateEdit').val(data.due_date)
    })
    .fail(err => {
        console.log(err);
    })
}

function saveEdit () {
    let title = $('#titleEdit').val()
    let description = $('#descriptionEdit').val()
    let due_date = $('#dueDateEdit').val()
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${editData.id}`, 
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            description,
            due_date
        }
    })
    .done(data => {
        fetchTodo()
        // listpage()
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        $('#editForm').trigger('reset')
    })
}

function weather () {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/weather'
    })
    .done(data => {
        $("#weather").empty()
        data.forEach(element => {
            $("#weather").append(`
            <li class="list-group-item list-group-item-warning">
            <div class="card my-3 border" style="width: 15rem;">
                <div class="card-header"> ${element.applicable_date} </div>
                <div class="card-body"> ${element.weather_state_name} </div>
                <div class="card-footer"> Min: ${element.min_temp} <br>
                Max: ${element.max_temp} <br>
                </div>
            </div>
            </li>
            `)
        })
    })
    .fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    var tokenGoogle = googleUser.getAuthResponse().id_token;
    $.ajax({
        url : 'http://localhost:3000/google',
        method : 'POST',
        data : {
            tokenGoogle
        }
    })
    .done(result => {
        localStorage.setItem('access_token', result.access_token)
        listpage()
    })
    .fail(err => {
        console.log(err);
    })
}

function videos () {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/videos'
    })
    .done(data => {
        $("#mv").empty()
        data.forEach(element => {
            element.strMusicVid = element.strMusicVid.replace('watch?v=', 'embed/')
            $("#mv").append(`
            <li class="list-group-item list-group-item-warning">
                <iframe width="330" height="185" src="${element.strMusicVid}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </li>
            `)
        })
    })
    .fail(err => {
        console.log(err)
    })
}