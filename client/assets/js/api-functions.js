"use strict"

/** USER FUNCTION */

function register() {
    $('.modal').modal('show');

    let email = $('#email').val()
    let password = $('#password').val()
    let name = $('#name').val()
    
    User.register(email, password, name)
        .done(response => {
            console.log(response);
            // reset input
            $('#email').val('')
            $('#password').val('')
            $('#name').val('')
            $('#passwordCon').val('')
            
            login(email, password) // Login account after register
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            // Error Alert
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            $('.modal').modal('hide');
        })
}

function login(email, password) {
    $('.modal').modal('show');

    if (!email || !password) {
        email = $('#loginEmail').val()
        password = $('#loginPassword').val()
    }

    User.login(email, password)
        .done(response => {
            localStorage.access_token = response.access_token
            // reset input
            $('#loginEmail').val('')
            $('#loginPassword').val('')

            cekAuth()
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            $('.modal').modal('hide');
        })
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;

    User.loginGoogle(id_token)
        .done(response => {
            localStorage.access_token = response.access_token
            cekAuth()
        })
        .fail((err) => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            
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
    cekAuth()
}

/** API */
function getHolidays() {
    API.getHolidayDate()
        .done((response) => {
            console.log(response);
            $("#listHoliday").empty()

            response.forEach(el => {
                $("#listTodo").append(`
                <div class="col-sm-9 p-1">
                    <div class="card">
                        ${el.date} - ${el.name}
                    </div>
                </div>
                `)
            });
        })
        .fail((err) => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {

        })
}

/** TODO */

function readTodo() {
    Todo.readTodo()
        .done(response => {
            console.log(response);
            $("#listTodo").empty()
            response.forEach(el => {
                let due_date = new Date(el.due_date).toISOString().slice(0, 10)
                $('#listTodo').append(`
                <div class="col-md-4">
                    <div class="card bg-light mb-3" style="max-width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${el.title}</h5>
                            <p class="card-text">${el.description}</p>
                            <p class="card-text text-danger">${due_date}</p>
                            <div>
                                <button type="button" class="btn btn-warning btn-sm btnLoad" onClick="doneTodo(${el.id}, ${el.status})">${el.status ? 'CANCEL' : 'DONE'}</button>
                                <button type="button" class="btn btn-primary btn-sm"  onClick="readOneTodo(${el.id})">UPDATE</button>
                                <button type="button" class="btn btn-danger btn-sm" onClick="deleteTodo(${el.id})">DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
                `)
            });
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            
        })
}

function readOneTodo(id) {
    Todo.readOneTodo(id)
        .done(response => {
            console.log(response);
            const { title, description, due_date } =  response
            const date = new Date(due_date).toISOString().slice(0, 10)
            $('#todoId').val(id)
            $('#todoTitle').val(title)
            $('#todoDescription').val(description)
            $('#todoDueDate').val(date)
            showEdit(true)
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            
        })
}

function createTodo() {
    let name = $('#todoTitle').val()
    let description = $('#todoDescription').val()
    let due_date = $('#todoDueDate').val()
    Todo.createTodo(name, description, '', due_date)
        .done(response => {
            $('#todoTitle').val('')
            $('#todoDescription').val('')
            $('#todoDueDate').val('')
            readTodo()
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            
        })
}

function updateTodo() {
    let id = $('#todoId').val()
    let title = $('#todoTitle').val()
    let description = $('#todoDescription').val()
    let status = $('#todoStatus').val()
    let due_date = $('#todoDueDate').val()

    Todo.updateTodo(id, title, description, status, due_date)
        .done(response => {
            console.log(response);
            showEdit(false)
            readTodo()
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            
        })
}

function doneTodo(id, status) {
    Todo.updateStatusTodo(id, !status)
        .done(response => {
            console.log(response);
            readTodo()
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            
        })
}

function deleteTodo(id) {
    Todo.deleteTodo(id)
        .done(response => {
            console.log(response);
            readTodo()
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
               <strong>ERROR!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            
        })
}