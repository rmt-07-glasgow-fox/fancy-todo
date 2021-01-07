
//page
function homepage () {
    $('#list').hide()
    $('#signin').hide()
    $('#signup').hide()
}

function listpage () {
    $('#list').show()
    $('#edittodo').hide()
    $('#home').hide()
    $('#signin').hide()
    $('#signup').hide()
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

//function
function signup() {
    let email = $('#emailSignup').val()
    let password = $('#passwordSignup').val()
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
        data: {email: email, password: password}
    })
    .done(data => {
        console.log(data)
        localStorage.setItem('access_token', data.access_token)
    })
    .fail(err => {
        console.log(err)
    })
}

function fetchTodo() {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register', 
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(data => {
        console.log(data)
        data.forEach(element => {
            $("#listfeature").append(`
            <div class="card my-3 border">
                <div class="card-header">
                    <input type="checkbox" name="status" id="status" class="form-check-input">
                    ${element.title}
                </div>
                <div class="card-body">${element.description}</div>
                <div class="card-footer"> ${element.due_date} </div>
            </div>
            `)
        })
    })
    .fail(err => {
        console.log(err)
    })
}