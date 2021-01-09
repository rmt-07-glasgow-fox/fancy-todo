let myUrl = `http://localhost:3000`
let listTodos
let weather

$(document).ready(function () {
    // $('#sign-up').hide()
    console.log('ready')
    signUp()
    checkAuth()

    $('#form-signup').submit(function (event) {
        event.preventDefault()
        let email = $('#SUemail').val()
        let password = $('#SUpassword').val()

        $.ajax({
            method: `POST`,
            url: `${myUrl}/signup`,
            data: {
                email,
                password
            }
        })
            .done(response => {
                signIn()
            })
            .fail(err => {
                console.log(err, 'err')
            })
            .always(() => {

            })
    })

    $('#form-signin').submit(function (event) {
        event.preventDefault()
        // console.log('coba ya masuk sign in')
        let email = $('#SIemail').val()
        let password = $('#SIpassword').val()

        $.ajax({
            method: `POST`,
            url: `${myUrl}/signin`,
            data: {
                email,
                password
            }
        })
            .done(response => {
                localStorage.setItem('access_token', response.access_token)
                signedIn()
            })
            .fail(err => {
                console.log(err, 'err')
            })
            .always(() => {
                $('#SIemail').val('')
                $('#SIpassword').val('')
            })
    })




    $('#form-add-task').submit(function (event) {
        event.preventDefault()
        let title = $('#todo').val()
        let description = $('#desc').val()
        let due_date = $('#date').val()

        $.ajax({
            method: `POST`,
            url: `${myUrl}/todos`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                title,
                description,
                due_date
            }
        })
            .done(response => {
                signedIn()
                $('#list-todo').fadeIn()
                $('#todo').val('')
                $('#desc').val('')
                $('#date').val('')

                // getTodos()
            })
            .fail(err => {
                console.log(err)
            })
    })


    $('#btn-add-todo').click(function (event) {
        event.preventDefault()
        $('#add-task').fadeIn()
    })

    $('#btn-edit').click(function (event) {
        event.preventDefault()
        $('#form-edit-task').fadeIn()
    })


    $('#btn-cancel').click(function (event) {
        event.preventDefault()
        // $('#edit-task').fadeOut()
        $('#add-task').fadeOut()
    })



    $('#btn-logout').click(function (event) {
        event.preventDefault()
        localStorage.clear()
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        checkAuth()
    })

    function checkAuth() {
        if (localStorage.access_token) {
            signedIn()
        } else {
            signUp()
        }
    }


})

function getTodos() {
    $.ajax({
        method: `GET`,
        url: `${myUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            listTodos = response.data
            weather = response.weather
            $('#list-todo').empty()
            $('#weather-dtl').empty()
            $('#list-todo').hide()

            $('#weather-dtl').append(
                `
                    <h6>${weather.name}</h6>
                    <h5>${weather.main.temp}Kelvin</h5>
                    `

            )

            listTodos.forEach(el => {
                $('#list-todo').append(
                    `<div class="card" style="margin-bottom: 30px">
                        <h4>${el.title}</h4>
                        <h5>${el.due_date.split('T')[0]}</h5>
                        <p>${el.description}</p>
                    <div style="margin-bottom: 10px">
                        <button id="btn-edit" onclick="getId(${el.id})" class="btn btn-outline-primary">edit</button>
                        <button id="btn-delete" onclick="deleteTodos(${el.id})" class="btn btn-outline-danger">delete</button>
                    </div>
                    </div>`
                )
            })
            $('#list-todo').fadeIn()

        })
        .fail(err => {
            console.log(err, 'err')
        })
        .always(() => {

        })

}

function signedIn() {
    $('#sign-up').hide()
    $('#sign-in').hide()
    $('#weather').show()
    $('#task').show()
    $('#add-task').hide()
    $('#btn-logout').show()
    getTodos()
    $('#form-edit-task').hide()
    $('#all-down').show()

}

function getId(id) {
    console.log(id)
    $.ajax({
        method: `GET`,
        url: `${myUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            console.log(response)
            $('#edit-task').empty()

            $('#edit-task').append(
                `<form id="form-edit-task" class="form-inline" style="margin-top: 20px; margin-left: 187px;">
                <div style="margin-right: 5px;">
                    <input type="text" class="form-control" id="editTodo" value="${response.title}" required>
                </div>
                <div style="margin-right: 5px;">
                    <input type="date" class="form-control" id="editDate" value="${response.due_date.split('T')[0]}" required>
                </div>
                <div style="margin-right: 5px;">
                    <input type="text" class="form-control" id="editDesc" value="${response.description}" required>
                </div>
                <div style="margin-left: 5px;">
                    <button class="btn btn-outline-primary" onclick="editTodos(${response.id})" type="submit">Edit</button>
                    <button class="btn btn-outline-danger" onclick="cancelEdit()" id="btn-cancel-2">Cancel</button>
                </div>
            </form>`
            )
            $('#form-edit-task').fadeIn()

        })
        .fail(err => {
            console.log(err)
        })

}

function editTodos(id) {
    let title = $('#editTodo').val()
    let description = $('#editDesc').val()
    let due_date = $('#editDate').val()

    $.ajax({
        method: `PUT`,
        url: `${myUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            due_date
        }
    })
        .done(response => {
            signedIn()
            $('#form-edit-task').fadeOut()
            $('#todo').val('')
            $('#desc').val('')
            $('#date').val('')
        })
        .fail(err => {
            console.log(err)
        })
}

function deleteTodos(id) {
    $.ajax({
        method: `DELETE`,
        url: `${myUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            signedIn()
        })
        .fail(err => {
            console.log(err)
        })

}


function signUp() {
    $('#sign-up').show()
    $('#sign-in').hide()
    $('#weather').hide()
    $('#task').hide()
    $('#add-task').hide()
    $('#btn-logout').hide()
    $('#list-todo').hide()
    $('#all-down').hide()
}

function signIn() {
    $('#sign-up').hide()
    $('#sign-in').show()
    $('#weather').hide()
    $('#task').hide()
    $('#add-task').hide()
    $('#btn-logout').hide()
    $('#list-todo').hide()
    $('#form-edit-task').hide()
    $('#all-down').hide()

}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: `${myUrl}/google`,
        data: {
            id_token
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            signedIn()

        })
        .fail(err => {
            console.log(err)
        })

}


function cancelEdit() {
    $('#form-edit-task').fadeOut()
}
