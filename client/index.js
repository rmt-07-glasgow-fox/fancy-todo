const url = 'http://localhost:3000';

function cekAuth () {
    if (localStorage.token) {
        $('#movie-disp-con').hide();
        $('#register-login').hide();
        $('#main-app').show();
        $('#update-todo').hide();
        loadTodo();
    } else {
        $('#register-login').show();
        $('.container-register').show();
        $('.container-login').hide();
        $('#main-app').hide();
    }
}

$(document).ready(() => {
    cekAuth();
});

function dateFormat (date) {
    return `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1 > 9 ? new Date(date).getMonth() + 1 : '0'+(new Date(date).getMonth() + 1)}-${new Date(date).getDate() > 9 ? new Date(date).getDate() : '0'+new Date(date).getDate()}`;
}

function loadTodo () {
    $.ajax({
        type: "GET",
        url: `${url}/todos`,
        headers: {
            token: localStorage.token
        }
    })
        .done((data) => {
            $('#todo-data').html('');

            if (data.length < 1) {
                $('#todo-data').append(`
                    <h3 id="no-data-todo">You dont have todo yet!</h3>
                `);
            }

            data.forEach(e => {
                e.dueDate = dateFormat(e.dueDate);
                $('#todo-data').append(`
                    <div id="todo-card">
                        <div id="todo-content">
                            <h3 id="todo-title">${e.title}</h3>
                            <p id="todo-desc">${e.description} ${e.dueDate}</p>
                            <p>${e.status}</p>
                        </div>
                        <div id="card-btn">
                            <a id="status-card-btn" onClick="updateStatusTodo(${e.id},'${e.status}')">Status</a>
                            <a id="update-card-btn" onClick="updateTodo(${e.id},'${e.title}','${e.description}','${e.status}','${e.dueDate}')">Update</a>
                            <a id="delete-card-btn" onClick="deleteTodo(${e.id})">Delete</a>
                        </div>
                    </div>
                `);
            });
        })
        .fail((err) => {
            throw err;
        });
}

function goToRegister () {
    $('.container-register').show();
    $('.container-login').hide();
    $('#err-login').html('');
    $('#email-signin').val('');
    $('#password-signin').val('');
}

function goToLogin () {
    $('.container-register').hide();
    $('.container-login').show();
    $('#reg-error').html('');
    $('#email-signup').val('');
    $('#password-signup').val('');
}

function signUp () {
    $.ajax({
        type: "POST",
        url: `${url}/signUp`,
        data: {
            email: $('#email-signup').val(),
            password: $('#password-signup').val()
        }
    })
        .done(() => {
            $('#email-signup').val('');
            $('#password-signup').val('');
            goToLogin();
        })
        .fail((err) => {
            console.log(err);
            $('#reg-error').html('');
            
            err.responseJSON.msg.forEach(e => {
                $('#reg-error').append(`
                    <p id="error">${e}</p>
                `);
            });
        });
}

function sigIn () {
    $.ajax({
        type: "POST",
        url: `${url}/signIn`,
        data: {
            email: $('#email-signin').val(),
            password: $('#password-signin').val()
        }
    })
        .done((data) => {
            localStorage.setItem('token', data.token);
            cekAuth();
            $('#email-signin').val('');
            $('#password-signin').val('');
            $('#err-login').html('');
        })
        .fail((err) => {
            $('#err-login').html('');

            err.responseJSON.msg.forEach(e => {
                $('#err-login').append(`
                    <p id="error">${e}</p>
                `);
            });
        });
}

function logOut () {
    localStorage.clear();
    cekAuth();
    $('.container-register').hide();
    $('.container-login').show();
    signOut();
}

function addTodo () {
    $.ajax({
        type: "POST",
        url: `${url}/todos`,
        headers: {
            token: localStorage.token
        },
        data: {
            title: $('#todo-form-title').val(),
            description: $('#todo-form-desc').val(),
            status: "unfinished",
            dueDate: $('#todo-form-date').val()
        }
    })
        .done(() => {
            $('#todo-form-title').val('');
            $('#todo-form-desc').val('');
            $('#todo-form-date').val('');
            $('#add-todo-err').html('');
            loadTodo();
        })
        .fail((err) => {
            console.log(err.responseJSON.msg);
            $('#add-todo-err').html('');

            for (let i = 0; i < err.responseJSON.msg.length; i++) {
                if (i < 3) {
                    $('#add-todo-err').append(`
                        <p id="error">${err.responseJSON.msg[i]}</p>
                    `);
                }
            }
        });
}

function updateStatusTodo (updateStatusId, status) {
    $('#add-todo-err').html('');
    
    $.ajax({
        type: "PATCH",
        url: `${url}/todos/${updateStatusId}`,
        headers: {
            token: localStorage.token
        },
        data: {
            status: (status == "finished" ? "unfinished" : "finished")
        }
    })
        .done(() => {
            loadTodo();
        });
}

function updateTodo (updateId, title, description, status, dueDate) {
    $('#add-todo').hide();
    $('#update-todo').show();
    $('#todo-update-title').val(title);
    $('#todo-update-desc').val(description);
    $('#todo-update-date').val(dueDate);
    $('#update-todo-btn').prop('dataId', updateId);
    $('#update-todo-btn').prop('dataStatus', status);
    $('#update-todo-err').html('');
    $('#add-todo-err').html('');
}

function confirmUpdate () {
    let updateId = $('#update-todo-btn').prop('dataId');
    let updateStatus = $('#update-todo-btn').prop('dataStatus');
    
    $.ajax({
        type: "PUT",
        url: `${url}/todos/${updateId}`,
        headers: {
            token: localStorage.token
        },
        data: {
            title: $('#todo-update-title').val(),
            description: $('#todo-update-desc').val(),
            status: updateStatus,
            dueDate: $('#todo-update-date').val()
        }
    })
        .done(() => {
            loadTodo();
            $('#add-todo').show();
            $('#update-todo').hide();
        })
        .fail((err) => {
            $('#update-todo-err').html('');

            err.responseJSON.msg.forEach(e => {
                $('#update-todo-err').append(`
                    <p id="error">${e}</p>
                `);
            });
        });
}

function cancelUpdate () {
    $('#add-todo').show();
    $('#update-todo').hide();
    $('#update-todo-err').html('');
}

function deleteTodo (deleteId) {
    $('#add-todo-err').html('');

    $.ajax({
        type: "DELETE",
        url: `${url}/todos/${deleteId}`,
        headers: {
            token: localStorage.token
        }
    })
        .done(() => {
            loadTodo();
        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function gonSign (googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    
    $.ajax({
        type: "POST",
        url: `${url}/googleLogin`,
        data: {
            id_token: id_token
        }
    })
        .done((data) => {
            localStorage.setItem('token', data.token);
            cekAuth();
            $('#email-signin').val('');
            $('#password-signin').val('');
            $('#err-login').html('');
        })
        .fail((xhr, status) => {
            console.log(xhr, status);
        });
}

function showMovie () {
    $('#movie-list').html('<p style="margin: 10px;">Now Popular</p>');

    $.ajax({
        type: 'GET',
        url: `${url}/movies`,
        headers: {
            token: localStorage.token
        }
    })
        .done((data) => {
            console.log(data.results);
            data.results.forEach(e => {
                $('#movie-list').append(`
                    <div id="movie-card" style="padding: 10px; margin: 10px; display: flex; flex-direction: row;justify-content: space-between;">
                        <p>${e.original_title}</p>
                        <a style="color: blue;" onclick="watchMovie('${e.original_title}')">Watch</a>
                    </div>
                `);
            });
        })
        .fail();

    $('#movie-disp-con').show();
}

function topRated () {
    $('#movie-list').html('<p style="margin: 10px;">Top Rated</p>');

    $.ajax({
        type: 'GET',
        url: `${url}/movies/top`,
        headers: {
            token: localStorage.token
        }
    })
        .done((data) => {
            console.log(data.results);
            data.results.forEach(e => {
                $('#movie-list').append(`
                    <div id="movie-card" style="padding: 10px; margin: 10px; display: flex; flex-direction: row;justify-content: space-between;">
                        <p>${e.original_title}</p>
                        <a style="color: blue;" onclick="watchMovie('${e.original_title}')">Watch</a>
                    </div>
                `);
            });
        })
        .fail();

    $('#movie-disp-con').show();
}

function searchMovie () {
    $('#movie-list').html(`<p style="margin: 10px;">Search '${$('#search-movie').val()}'</p>`);

    $.ajax({
        type: 'POST',
        url: `${url}/movies/find`,
        headers: {
            token: localStorage.token
        },
        data: {
            search: $('#search-movie').val()
        }
    })
        .done((data) => {
            console.log(data.results);
            data.results.forEach(e => {
                $('#movie-list').append(`
                    <div id="movie-card" style="padding: 10px; margin: 10px; display: flex; flex-direction: row;justify-content: space-between;">
                        <p>${e.original_title}</p>
                        <a style="color: blue;" onclick="watchMovie('${e.original_title}')">Watch</a>
                    </div>
                `);
            });
        })
        .fail();

    $('#movie-disp-con').show();
}

function watchMovie (title) {
    hideMovie();
    $('#todo-form-title').val('Watch movie');
    $('#todo-form-desc').val(title);
}

function hideMovie() {
    $('#movie-disp-con').hide();
}

$('#go-to-sign-up').click(goToRegister);
$('#go-to-sign-in').click(goToLogin);
$('#sign-up-btn').click(signUp);
$('#sign-in-btn').click(sigIn);
$('#logout-btn').click(logOut);
$('#add-todo-btn').click(addTodo);