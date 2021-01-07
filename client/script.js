let baseUrl = "http://localhost:3000"

// Intialize document
$(document).ready(event => {
    checkAuth()
})

// Show Login/register page
$('#to-login-btn').click( event => {
    event.preventDefault()
    $('#login-form').show()
    $('#register-form').hide();
})

$('#to-register-btn').click( event => {
    event.preventDefault()
    $('#login-form').hide()
    $('#register-form').show();
})

// Login Button
$('#login-btn').click( event => {
    event.preventDefault();
    let email = $('#email-login').val()
    let password = $('#password').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            password
        }
    })
    .done(response => {
        // Menyimpan token untuk sementara
        localStorage.access_token = response.access_token;
        checkAuth();
    })  
    .fail((xhr, status, err) => {
        console.log(xhr.responseJSON.message);
    })
    .always(() => {
        console.log('Always');
        $('#email-login').val('')
        $('#password').val('')
    })
})

// Logout Button
$('#logout-btn').click(() => {
    localStorage.clear();
    checkAuth();
    signOut()
})

// Form Button
$('#add-form-btn').click(event => {
    event.preventDefault();
    checkAuth()
    $('#todo-form').fadeIn(500)
})

// Cancel Form Button
$('#cancel-todo-btn').click(event => {
    event.preventDefault();
    checkAuth()
})

// Register Button
$('#register-btn').click(event => {
    event.preventDefault();
    let email = $('#email-register').val();
    let password = $('#password-register').val();
    let repeatPassword = $('#repeatPassword').val();

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {
            email,
            password,
            repeatPassword
        }
    })
        .done(response => {
            // console.log(response);
        })
        .fail(xhr => {
            console.log(xhr.responseJSON.message);
        })
        .always(() => {
            $('#email-register').val('');
            $('#password-register').val('');
            $('#repeatPassword').val('')
        })
})

// Add Todo Button
$('#add-todo-btn').click(event => {
    event.preventDefault();

    let title = $('#title').val();
    let due_date = $('#due_date').val();
    let description = $('#description').val();

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            due_date,
            description
        }
    })
        .done(response => {
            let todo = response;

            $('tbody').append(`
            <tr id="todo-${todo.id}">
                <td class="align-middle">${todo.title}</td>
                <td class="align-middle">${todo.description}</td>
                <td style="text-align: center;" class="align-middle">${todo.status}</td>
                <td style="text-align: center;" class="align-middle">${todo.due_date}</td>
                <td style="text-align: center;" class="align-middle">
                    <button class="btn btn-success" onclick="openEditFormTodo(${todo.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTodo(${todo.id})">Delete</button>
                </td>
            </tr>
            `)

            $('#todo-form').fadeOut(500)
        })
        .fail((xhr, status, err) => {
            console.log(xhr.responseJSON.message);
        })
        .always(() => {
            $('#title').val("");
            $('#due_date').val("");
            $('#description').val("");
        })
})

// Google SignIn Function
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/google-login`,
        data: {
            id_token
        }
    })
    .done(response => {
        console.log(response);
        localStorage.access_token = response.access_token;
        checkAuth()
    })
    .fail((xhr, status) => {
        console.log((xhr.responseJSON.message));
    })
}

// Edit form
function openEditFormTodo(id) {
    $('#status-list').show();
    $('#todo-form').fadeIn(500);
    $('#edit-todo-btn').show();
    $('#add-todo-btn').hide();
    $('#edit-todo-btn').removeAttr('class').addClass(`btn btn-success  edit-todo-btn-${id}`);
    $('#edit-todo-btn').off('click')
    $('option').removeAttr('selected')
    $('#selected').attr('selected', 'selected')
    getTodoById(id)

    // Edit Todo Button
    $(`.edit-todo-btn-${id}`).click(event => {
        event.preventDefault();
        let title = $('#title').val();
        let due_date = $('#due_date').val();
        let description = $('#description').val();
        let status = $('#status').val()

        $.ajax({
            method: 'PUT',
            url: `${baseUrl}/todos/${id}`,
            headers: {
                access_token: localStorage.access_token,
            },
            data: {
                title,
                due_date,
                description,
                status
            }
        })
            .done(response => {
                getTodoList()
            })
            .fail((xhr) => {
                console.log(xhr.responseJSON.message)
            })
            .always(() => {
                checkAuth()
            })
    })
}  

// Delete todo function
function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token,
        }
    })
        .done(response => {
            $(`#todo-${id}`).remove();
        })
        .fail((xhr, status, err) => {
            console.log(xhr.responseJSON.message);
        })
}

// Get todo by id functioin
function getTodoById(id) {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token,
        }
    })
        .done(response => {
            let todo = response;
            $('#title').val(todo.title);
            $('#due_date').val(todo.due_date);
            $('#description').val(todo.description);
            $(`#${todo.status.replace(' ', '-')}`).attr('selected', 'selected')
        })
}

// Authentication Function
function checkAuth() {
    if (localStorage.access_token) {
        $('#auth-page').hide();
        $('#todo-list-page').show();
        getTodoList();
        $('#logout-btn').show();
        $('#edit-todo-btn').hide();
        $('#add-todo-btn').show();
        $('#todo-form').hide()
        $('#status-list').hide()
        $('#title').val('');
        $('#due_date').val('');
        $('#description').val('');
        $('option').removeAttr('selected')
        $('#selected').attr('selected', 'selected')
    } else {
        $('#auth-page').show();
        $('#login-form').hide()
        $('#register-form').show();
        $('#todo-list-page').hide();
        $('#logout-btn').hide();
    }
}

// getTodoList Function
function getTodoList() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            let todos = response;

            $('tbody').empty()
            todos.forEach(todo => {
                $('tbody').append(`
                <tr id="todo-${todo.id}">
                    <td class="align-middle">${todo.title}</td>
                    <td class="align-middle">${todo.description}</td>
                    <td style="text-align: center;" class="align-middle">${todo.status}</td>
                    <td style="text-align: center;" class="align-middle">${todo.due_date}</td>
                    <td style="text-align: center;" class="align-middle">
                        <button class="btn btn-success" onclick="openEditFormTodo(${todo.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteTodo(${todo.id})">Delete</button>
                    </td>
                </tr>
                `)
            })
        })
        .fail(xhr => {
            console.log(xhr);
            console.log(xhr.statusText);
        })
}


function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}




