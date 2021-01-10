"use strict"

/** USER FUNCTION */

function register() {
    let email = $('#email').val()
    let password = $('#password').val()
    let name = $('#name').val()
    $('.modal').modal('show');

    User.register(email, password, name)
        .done(response => {
            console.log(response);
            login(email, password)
            $('#email').val('')
            $('#password').val('')
            $('#name').val('')
            $('#passwordCon').val('')
            console.log(email, password);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> Register berhasil! Silahkan login!
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)

        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            hideLoading()
        })
}

function login() {
    $('.modal').modal('show');
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()
    User.login(email, password)
        .done(response => {
            localStorage.email = email
            localStorage.access_token = response.access_token
            $('#loginEmail').val('')
            $('#loginPassword').val('')
            // //auth()
            setTimeout(function () {
                $('.modal').modal('hide');
            }, 3000);
            $('.signup, .login').addClass('switched');
            setTimeout(function () { $('.signup, .login').hide(); }, 700);
            setTimeout(function () { $('.brand').addClass('active').addClass('col-sm-12').removeClass('col-sm-6'); }, 300);
            setTimeout(function () { $('.heading').addClass('active'); }, 600);
            setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
            setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
            setTimeout(function () { $('.form').hide(); }, 700);
            
            
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            hideLoading()
        })
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    $('.modal').modal('show');

    User.loginGoogle(id_token)
        .done(response => {
            localStorage.email = profile.getEmail()
            localStorage.access_token = response.access_token
            //auth()
        })
        .fail((err) => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
             readTodo()
             getHolidays()
        })
        .always(() => {
            hideLoading()
        })
}

function logout() {
    $('.modal').modal('show');
    localStorage.clear()
    if (gapi.auth2) {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
    hideLoading()
    //auth()
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
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err.responseJSON.message}
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
    // $('.modal').modal('show');

    Todo.readTodo()
        .done(response => {
            console.log(response);
            $("#listTodo").empty()
            
            response.forEach(el => {
                console.log(localStorage.email , el.User.email);
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
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            hideLoading()
        })
}

function readOneTodo(id) {
    Todo.readOneTodo(id)
        .done(response => {
            console.log(response);
            const { title, description, due_date } =  response
            const date = new Date(due_date).toISOString().slice(0, 10)
            console.log(date,'<<<<');
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
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            hideLoading()
        })
}

function createTodo() {
    let name = $('#todoTitle').val()
    let description = $('#todoDescription').val()
    let due_date = $('#todoDueDate').val()
    Todo.createTodo(name, description, '', due_date)
    .done(response => {
            $('.modal').modal('show');
            $('#todoTitle').val('')
            $('#todoDescription').val('')
            $('#todoDueDate').val('')
            readTodo()
        })
        .fail(err => {
            console.log(err.responseJSON.message);
            $('#alert').empty()
            $('#alert').append(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            hideLoading()
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
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            hideLoading()
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
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            hideLoading()
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
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>WARNING!</strong> ${err.responseJSON.message}
               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             `)
        })
        .always(() => {
            hideLoading()
        })
}