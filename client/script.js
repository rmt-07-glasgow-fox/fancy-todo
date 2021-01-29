const baseUrl = 'http://localhost:3000'

$('#show-register-btn').click(() => {
    $('#register').show()
    $('#login').hide()
})

$('#show-login-btn').click(() => {
    $('#register').hide()
    $('#login').show()
})

$('#todo-list-btn').click(() => {
    fetchTodo()
    mainPage()
})

$('#show-add-todo-btn').click(() => {
    addPage()
})

// Register
$('#register-btn').click(function(event) {
    event.preventDefault()
    let email = $('#regemail').val()
    let password = $('#regpassword').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {email, password}
    })
    .done(response => {
        register()
    })
    .fail(err => {
        console.log(err);
    })
    .always(_=> {
        console.log('always');
        $('#regusername').val()
        $('#regemail').val()
        $('#regpassword').val()
    })
})

// Login
$('#login-btn').click(function(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {email, password}
    })
    .done(response => {
        mainPage()
        localStorage.setItem('access_token', response.access_token)
        console.log(response);
    })
    .fail(err => {
        console.log(err);
    })
    .always(_=> {
        console.log('always');
        $('#email').val()
        $('#password').val()
    })
})

// Logout
$('#logout-btn').click(function(event){
    event.preventDefault()
    localStorage.clear()
    const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    loginPage()
})

$(document).ready(()=> {
    auth()
})

// Signin Google
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data: { id_token }
    })
    .done(({data}) => {
        console.log('masuk google login');
        console.log(data);
        afterLogin()
        // localStorage.setItem('access_token', response.access_token)
    })
    .fail(err => {
        console.log(err);
    })
    .always()
}

function auth() {
    if (localStorage.access_token) {
        fetchTodo()
        mainPage()
    } else {
        loginPage()
    }
}

function register() {
    $('#edit-todo').hide()
    $('#login').hide()
    $('#register').hide()
    $('#logout-btn').show()
    $('.todoList').show()
}

function mainPage() {
    $('#edit-todo').hide()
    $('#login').hide()
    $('#register').hide()
    $('#logout-btn').show()
    $('#add-page').hide()
    $('.todoList').show()
}

function loginPage() {
    $('#edit-todo').hide()
    $('#login').show()
    $('#register').hide()
    $('#add-page').hide()
    $('.todoList').hide()
    $('#logout-btn').hide()
}

function addPage() {
    $('#edit-todo').hide()
    $('#login').hide()
    $('#register').hide()
    $('#add-page').show()
    $('.todoList').hide()
    $('#logout-btn').show()
}

// =======Todo=======
// POST
$('#add-todo-btn').click(function(event){
    event.preventDefault()

    let title = $('#titleAdd').val()
    let description = $('#description').val()
    let due_date = $('#due_date').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todo`,
        headers: {access_token: localStorage.access_token},
        data: {title, description, due_date}
    })
    .done(response => {
        console.log(response);
        fetchTodo()
        mainPage()
    })
    .fail(err => console.log(err))
    .always()
})

// GET
function fetchTodo() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todo`,
        headers: {access_token: localStorage.access_token}
    })
    .done(response => {
        console.log(response)
        $('#todo-list').empty()

        response.forEach(e => {
            $('#todo-list').append(
                `<div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <input type="checkbox" class="check-done">
                    </div>
                    <div class="card" style="width: 40rem;">
                        <div class="card-body">
                            <h5 class="card-title">${e.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${e.due_date.split('T')[0]}</h6>
                            <p class="card-text">${e.description}</p>
                            <a href="#" class="card-link" onclick="editShow(${e})">edit</a>
                            <a href="#" class="card-link" onclick="deleteTodo(${e.id})">delete</a>
                        </div>
                    </div>
                </div>`
            )
        });
    })
    .fail(err => console.log(err))
}

// EDIT
function editShow(e) {
    console.log(`edit${e.id}`);

    $('#edit-todo').append(
        `<form>
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title_edit" placeholder="Enter title">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input type="text" class="form-control" id="description_edit" placeholder="Enter description">
            </div>
            <div class="mb-3">
                <label for="due_date" class="form-label">Due Date</label>
                <input type="date" class="form-control" id="due_date_edit" placeholder="Enter due date">
            </div>
            <button type="button" class="btn btn-danger" id="edit-cancel-btn">cancel</button>
            <button type="submit" class="btn btn-primary" id="add-todo-btn">Save</button>
        </form>`
    )
    // $.ajax({
    //     method: 'PUT',
    //     url: `${baseUrl}/todo/${id}`,
    //     headers: {access_token: localStorage.access_token},
    //     data: {}
    // })
}

// DELETE
function deleteTodo(id) {
    console.log(`delete${id}`);

    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todo/${id}`,
        headers: {access_token: localStorage.access_token}
    })
    .done(response => {
        console.log(`delet id ${id} berhasil`);
        fetchTodo()
    })
    .fail(err => console.log(err))
    .always()
}