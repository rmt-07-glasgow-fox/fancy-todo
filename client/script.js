var baseUrl = 'http://localhost:3000'

function hideContent() {
    $('#login-page').hide()
    $('#register-page').hide()
    $('#add-todo-page').hide()
    $('#edit-page').hide()
    $('#main-page').hide()
}


function succesLogin() {
    $('#login-page').hide()
    $('#register-page').hide()
    $('#add-todo-page').hide()
    $('#edit-page').hide()
    $('#main-page').show()
    todoList()
}

function pageAddTodo() {
    $('#login-page').hide()
    $('#register-page').hide()
    $('#add-todo-page').show()
    $('#edit-page').hide()
    $('#main-page').hide()
}

function failLogin() {
    $('#login-page').show()
    $('#register-page').hide()
    $('#add-todo-page').hide()
    $('#edit-page').hide()
    $('#main-page').hide()
}

function logOut() {
    localStorage.clear()
    failLogin()
}

function todoList() {
    $.ajax({
        method: `GET`,
        url: `${baseUrl}/todos`,
        headers: { access_token: localStorage.access_token }
    })
    .done(data => {
        console.log('berhasil');
        console.log(data);
            $('#list-todo').empty()

            data.forEach(data => {
                $('#list-todo').append(`
                <tr>
                    <td>${data.name}</td>
                    <td>${data.type}</td>
                    <td>${data.description}</td>
                    <td>${data.date}</td>
                    <td>${data.time}</td>
                    <td>
                        <button onclick="deleleteTodo(${data.id})" >Delete</button>
                        <button onclick="updateTodo(${data.id})" >Update</button>
                        <button onclick="doneTodo(${data.id})" >Done</button>
                    </td>
                </tr>
                `)
            })
    })
    
    .fail(err => {
        console.log('berhagagalsil');
        res.send(err)
    })
}

function deleleteTodo(params) {
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${params}`,
        headers: { access_token: localStorage.access_token }
    })
    .done(res => {
        hideContent()
        console.log(res);
    })
    .fail(err => {
        console.log(err);
    })
}

function doneTodo(params) {
    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${params}`,
        headers: { access_token: localStorage.access_token }
    })
    .done(res => {
        hideContent()
        console.log(res);
    })
    .fail(err => {
        console.log(err);
    })
}

function updateTodo(params) {
    $('#edit-page').show()
    $('#main-page').hide()

    $('#edit-todo-btn').click(function(event) {
        event.preventDefault()
        let name = $('#edit-name').val()
        let type = $('#edit-type').val()
        let description = $('#edit-description').val()
        let date = $('#edit-date').val()
        let time = $('#edit-time').val()
        console.log(name, type, description, date, time);
        $.ajax({
            method : 'PUT',
            url : `${baseUrl}/todos/${params}`,
            data :{name, type, description, date, time},
            headers : { access_token: localStorage.access_token }
        })
    .done(res => {
        console.log(res);
        $('#main-page').show()
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        console.log('ini always');
    })
    })
}


$(document).ready(function() {
    hideContent()

    if (localStorage.getItem('access_token')) {
        succesLogin()
    } else {
        failLogin()
    }

    $('#login-btn').click(function (event) {
        event.preventDefault()
        let email = $('#email').val()
        let password = $('#password').val()
        console.log(email,password, '===masuk');
    
        $.ajax({
            method : 'POST',
            url : `${baseUrl}/auth/login`,
            data :{
                email: email,
                password: password
            }
        })
        .done(res => {
            console.log('login');
            localStorage.setItem('access_token',res.access_token)
            $('#login-page').hide()
            $('#main-page').show()
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('ini always');
        })
    })

    $('#register-btn').click(function (event) {
        event.preventDefault()
        let name = $('#name-register').val()
        let username = $('#username-register').val()
        let email = $('#email-register').val()
        let password = $('#password-register').val()
        console.log(email,password, '===masuk');
    
        $.ajax({
            method : 'POST',
            url : `${baseUrl}/auth/signup`,
            data :{
                name: name,
                username: username,
                email : email,
                password: password
            }
        })
        .done(res => {
            succesLogin()
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('ini always');
        })
    })

    $('#add-todo-btn').click(function (event) {
        event.preventDefault()
        let name = $('#todo-name').val()
        let type = $('#todo-type').val()
        let description = $('#todo-description').val()
        let date = $('#todo-date').val()
        let time = $('#todo-time').val()
        console.log(name, type, description, date, time);
        $.ajax({
            method : 'POST',
            url : `${baseUrl}/todos`,
            data :{name, type, description, date, time},
            headers : { access_token: localStorage.access_token }
        })
        .done(res => {
            console.log(res);
            $('#main-page').show()
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('ini always');
        })
    })

})
