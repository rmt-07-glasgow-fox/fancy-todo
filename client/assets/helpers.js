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
            $("#listTodo").append(`
            <div class="card my-3 border">
                <div class="card-header">
                    <input type="checkbox" name="status" id="status" class="form-check-input">
                    ${element.title}
                </div>
                <div class="card-body">${element.description}</div>
                <div class="card-footer"> ${element.due_date} <br>
                <button onclick="editpage(${element.id})"> Edit </button> <button onclick="deleteTodo(${element.id})"> Delete </button> 
                </div>
            </div>
            `)
        })
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
    localStorage.clear()
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
        console.log(data.due_date);
        // console.log(data.due_date.getDate());

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
        method: 'POST',
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
        console.log(data);
    })
    .fail(err => {
        console.log(err);
    })
}