"use strict"

/** USER FUNCTION */

function register() {
    let email = $('#email').val()
    let password = $('#password').val()
    let name = $('#name').val()
    User.register(email, password, name)
        .done(response => {
            console.log(response);
            $('#email').val('')
            $('#password').val('')
            $('#name').val('')
            $('#passwordCon').val('')

            login(email, password)
        })
        .fail(err => {
            console.log(err.responseJSON.message);
        })
        .always(() => {
            console.log('always');
        })
}

function login() {
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()
    console.log(email, password);
    User.login(email, password)
        .done(response => {
            localStorage.access_token = response.access_token
            $('#loginEmail').val('')
            $('#loginPassword').val('')
            // //auth()
            $('.signup, .login').addClass('switched');
            setTimeout(function () { $('.signup, .login').hide(); }, 700);
            setTimeout(function () { $('.brand').addClass('active').addClass('col-sm-12').removeClass('col-sm-6'); }, 300);
            setTimeout(function () { $('.heading').addClass('active'); }, 600);
            setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
            setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
            setTimeout(function () { $('.form').hide(); }, 700);
            
        })
        .fail(err => {
            alert(err.responseJSON.message)
            console.log(err.responseJSON);
        })
        .always(() => {
        })
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    if (true) {
        
    }
    User.loginGoogle(id_token)
        .done(response => {
            localStorage.access_token = response.access_token
            //auth()
        })
        .fail((xhr, status) => {
            console.log(status,'<<<<<<<<<<<<<<');
        })
}

function logout() {
    localStorage.clear()
    if (gapi.auth2) {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
    //auth()
}

/** TODO */

function readTodo() {
    Todo.readTodo()
        .done(response => {
            console.log(response);
            $("#list-todo-container").empty()
            response.forEach(el => {
                let due_date = new Date(el.due_date).getFullYear()
                $('#list-todo-container').append(`
                <div class="d-flex text-muted pt-3">
                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6f42c1"/><text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text></svg>
                    <div class="pb-3 mb-0 small lh-sm border-bottom">
                        <p class="mb-0">
                            <strong class="d-block text-gray-dark">${el.title}</strong>
                            ${el.description}
                        </p>
                        <a href="">${due_date}</a>
                    </div>
                </div>
                `)
            });
        })
        .fail(err => {
            
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

function readOneTodo(id) {
    Todo.readOneTodo(id)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

function createTodo(title, description, due_date) {
    Todo.createTodo(title, description, '', due_date)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

function updateTodo(id, title, description, status, due_date) {
    Todo.updateTodo(id, title, description, status, due_date)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

function updateStatusTodo(id, status) {
    Todo.updateStatusTodo(id, status)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}

function deleteTodo(id) {
    Todo.deleteTodo(id)
        .done(response => {
            console.log(response);
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            console.log('always');
        })
}