let baseURL = "http://localhost:3000"
let toDoId = null

$('#register-form').hide()

function checkAuth() {
    // console.log(localStorage.access_token)
    if (localStorage.access_token) {
        loggedIn()
    } else {
        // console.log('no')
        loggedOut()
    }
}

function loggedIn() {
    readTodo()
    $('#login-form').hide()
    $('#logout-button').show()
    $('#register-form').hide()
    $('#add-form').hide()
    $('#main-web').show()

}

function loggedOut() {
    $('#login-form').show()
    $('#register-form').hide()
    $('#logout-button').hide()
    $('#main-web').hide()
    localStorage.clear()
}

$(document).ready(function () {

    console.log('page di reload')
    checkAuth()
})

$('#login-btn').click(function (event) {
    event.preventDefault()
    login()
})

$('#logout-button').click(function (event) {
    event.preventDefault()
    localStorage.clear()
    localStorage.removeItem('access_token')
    signOut()
    checkAuth()
})

$('#register-button').click(function (event) {
    event.preventDefault()
    $('#register-form').show()
    $('#login-form').hide()
})

$('#register-submit').click(function (event) {
    event.preventDefault()
    register()
})

$('#cancel-submit').click(function (event) {
    event.preventDefault()
    loggedOut()
})



$('#add-task').click(function (event) {
    event.preventDefault()
    $('#add-form').show()
})

$(`#add-cancel-button`).click(function (event) {
    event.preventDefault()
    $('#add-form').hide()
})

$('#add-button').click(function (event) {
    event.preventDefault()
    addTodo()
})

$('#editTodo').click(function (event) {
    event.preventDefault()
    $('#main-web').show()
})


//=========LOGIN========

function login() {

    let email = $('#login-email').val()
    let password = $('#login-password').val()

    if (email == '' || password == '') {
        swal("ERROR", "Email dan Password harus diisi")
    } else {
        $.ajax({
                method: 'POST',
                url: `${baseURL}/login`,
                data: {
                    email,
                    password
                }
            })
            .done(response => {
                localStorage.setItem('access_token', response.access_token)
                checkAuth()
            })
            .fail(err => {
                console.log(err)
            })
            .always(() => {
                $('#login-email').val('')
                $('#login-password').val('')
            })
    }
    // console.log(email, password)

}


//=======REGISTER=======

function register() {

    let email = $('#register-email').val()
    let password = $('#register-password').val()
    let name = $('#register-name').val()

    if (email == '' || password == '' || name === '') {
        swal("ERROR", "Email, Name, dan Password harus diisi")
    } else {

        $.ajax({
                method: 'POST',
                url: `${baseURL}/register`,
                data: {
                    name,
                    email,
                    password
                }
            })
            .done(response => {
                loggedOut()
            })
            .fail(err => {
                console.log(err)
            })
            .always(() => {
                console.log('always')
            })
    }
}



//=========READ=========

function readTodo() {

    $.ajax({
            method: "GET",
            url: `${baseURL}/todos`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(data => {
            // console.log(toDo)
            $('#todo').empty()
            $.each(data, (index, value) => {

            let checkbox = `<input type="checkbox" class="form-check-input" id="status-${value.id}" onclick="editStatus(${value.id}, '${value.status}')" `
            if (value.status === true) {
                checkbox += `checked>`
            } else if(value.status === false){
                checkbox += `>`
            }
                // console.log(value)
                $('#todo').append(`
            <div class="card" id="list-task" style="width: 40rem";>
                <div class="card-body badan-kartu" id=toDoCard${value.id}>
                    <div id=todoCardBody${value.id}>
                        ${checkbox}
                        <h5 class="card-title">${value.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${value.due_date.split('T')[0]}</h6>
                        <p class="card-text">${value.description}</p>
                        <a href="#" onclick='editForm(${value.id})' class="card-link btn btn-success" id="editTodo">Edit</a>
                        <a href="#" onclick='delTodo(event, ${value.id})' class="card-link btn btn-danger" id="delTodo">Hapus</a>
                    </div>
                </div>
            </div>
            `)
            })
        })
        .fail(err => {
            console.log(err, "ERROR")
        })
        .always()
}

//==========ADD=========

function addTodo() {

    $.ajax({
            method: "POST",
            url: `${baseURL}/todos`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                title: $('#task-name').val(),
                description: $('#task-description').val(),
                due_date: $('#task-date').val()
            }
        })
        .done(done => {
            readTodo()
            $('#add-form').hide()
        })
        .fail(err => {
            swal("ERROR", "Input tanggal harus melebihi tanggal sekarang")
            console.log(err, "ERROR")
        })
        .always(() => {
            $('#task-name').val('')
            $('#task-description').val('')
            $('#task-date').val('')
            toDoId = null
        })
}

//===========DELETE============

function delTodo(event, id) {
    event.preventDefault()
    $.ajax({
        method: 'DELETE',
        url: `${baseURL}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    readTodo()
}

//============EDIT==============

function editForm(id) {
    toDoId = id

    $.ajax({
            method: 'GET',
            url: `${baseURL}/todos/${toDoId}`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(data => {
            $(`#todoCardBody${toDoId}`).hide()
            $(`#toDoCard${toDoId}`).append(`
            <div class="edited-form">
            <h3>Edit Form</h3>
        <form role="form" id="form-edit-main${toDoId}">
            <input type="text" class="form-control" value="${data.title}" name="task" id="edit-name">
            <input type="text" class="form-control" value= "${data.due_date.split('T')[0]}" name="Date" id="edit-date">
            <input type="text" class="form-control" value="${data.description}" name="task" id="edit-description">
            <button onclick="submitEdit(event)" class="btn btn-primary" id="edit-button">Edit</button>
            <button onclick="editCancel(event)" class="btn btn-primary" id="edit-cancel-button">Cancel</button>
        </form>
        </div>
        `)
        })

}

function editCancel(event) {
    event.preventDefault()
    $(`#form-edit-main`).hide()
    $('.badan-kartu').show()
    $(`#add-todo-form`).show()
    readTodo()
}

function submitEdit(event) {
    event.preventDefault()
    editSubmit()
}

function editSubmit() {
    $(`#form-edit-main`).show()

    $.ajax({
            method: 'PUT',
            url: `${baseURL}/todos/${toDoId}`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                title: $('#edit-name').val(),
                description: $('#edit-description').val(),
                due_date: $('#edit-date').val()
            }
        })
        .done(data => {
            $(`#form-edit-main`).hide()
            $('.badan-kartu').show()
            $(`#add-todo-form`).show()
            readTodo()
        })
        .fail(err => {
            swal("ERROR", "Input tanggal harus melebihi tanggal sekarang")
            console.log(err, 'ERROR EDIT')
        })
        .always(() => {
            $('#edit-name').val('')
            $('#edit-description').val('')
            $('#edit-date').val('')
        })
}

function editStatus(id, status) {

    let inputStatus
    if (status === 'true') {
        inputStatus = false
    } else {
        inputStatus = true
    }

    $.ajax({
            method: 'PATCH',
            url: `${baseURL}/todos/${id}`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                status: inputStatus
            }
        })
        .done(data => {
            console.log('Berhasil di Edit')
            readTodo()
        })
        .fail(err => {
            console.log(err, "ERROR EDIT")
        })
        .always(() => {

        })
}

//======GOOGLE==========

function onSignIn(googleUser) {

    const id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        method: "POST",
        url: `${baseURL}/googleLogin`,
        data: {
            id_token
        }
    }).done(result => {
        // console.log(result)
        localStorage.setItem('access_token', result.access_token)
        loggedIn()
        // console.log(result)
    }).fail(err => {
        console.log(err)
    })
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}