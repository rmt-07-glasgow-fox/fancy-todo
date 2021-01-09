function showLoginPage() {
    $('#login-page').show()
    $('#main-page').hide()
    $('#btn-logout').hide()
    $('#edit-page').hide()
    $('#register-page').hide()
}

function showMainPage() {
    $('#login-page').hide()
    $('#main-page').show()
    $('#edit-page').hide()
    $('#btn-logout').show()
    $('#register-page').hide()
    fetchToDo()
}

function showRegisterPage() {
    $('#login-page').hide()
    $('#register-page').show()
    $('#edit-page').hide()
    $('#main-page').hide()
    $('#btn-logout').hide()
}

function register() {
    const email = $('#email-register').val()
    const password = $('#password-register').val()

    $.ajax({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(response => {
        showLoginPage()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    }) 

    .always(() => {
        $('#email-register').val('')
        $('#password-register').val('')
    })
}



function login() {
    const email = $('#email-login').val()
    const password = $('#password-login').val()

    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    }) 

    .always(() => {
        $('#email-login').val('')
        $('#password-login').val('')
    })
}

function logout() {
    localStorage.clear()
    showLoginPage()
}

function fetchToDo() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        $("#todo-list").empty()
        console.log(response)
        let todo= response
        for(let i = 0; i < todo.length; i++) {
            if(todo[i].status == 'belum') {
                $('#todo-list').append(`<h5 id="list-title">List of To Do's!</h5>
                <h3>${todo[i].title}</h3>
            <p>${todo[i].description}</p>
            <p>${todo[i].status}</p>
            <p>${todo[i].due_date}</p>
            <button onclick="checkToDo(${todo[i].id})">Done</button>
            <button onclick="deleteToDo(${todo[i].id})">Delete</button>`)
            }
            else {
                $('#todo-list').append(`<h3>${todo[i].title}</h3>
            <p>${todo[i].description}</p>
            <p>${todo[i].status}</p>`)
            }
        }
    })
}


function createToDo() {
    const title = $('#title-todo').val()
    const description = $('#desc-todo').val()
    const due_date = $('#duedate-todo').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.getItem('access_token'),
        },
        data: {
            title,
            description,
            due_date
        }
    })

    .done(response => {
        console.log(response)
        fetchToDo()
    })

    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })

    .always(() => {
        $("#form-todo").trigger('reset')
    })
}

function deleteToDo(id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/todos/' + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        fetchToDo()
        console.log(response)
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })
}

function checkToDo(id) {
    $.ajax({
        method: 'PATCH',
        url: 'http://localhost:3000/todos/' + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        fetchToDo()
        console.log(response)
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })
}


function onSignIn(googleUser) {
    var googleToken = googleUser.getAuthResponse().id_token;
    
    $.ajax({
        url: 'http://localhost:3000/googleLogin',
        method: 'POST',
        data: {
            googleToken
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail((xhr, textStatus) => {
        console.log(xhr, textStatus)
    })
}

$(document).ready(function(){
    if(localStorage.getItem('access_token')){
        showMainPage()
    }
    else {
        showLoginPage()
    }
    $('#login-form').on('submit', function(e) {
        e.preventDefault()
        login()
    })

    $('#register-form').on('submit', function(e) {
        e.preventDefault()
        register()
    })

    $('#btn-logout').on('click', function(e) {
        logout()
    })

    $('#form-todo').on('submit', function(e) {
        e.preventDefault()
        createToDo()
    })

});