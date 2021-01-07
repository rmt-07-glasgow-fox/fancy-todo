let baseUrl = "http://localhost:3000"
$(document).ready(function () {
    checkAuth()

    $('#register-btn').click((event) => {
        event.preventDefault()
        let email = $("#email-register").val()
        let password = $("#password-register").val()

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/register`,
            data: {
                email,
                password
            }
        })
            .done(response => {
                checkAuth()
            })
            .fail(err => {
                console.log(err, ">>>> this is error from ajax form submission")
            })
            .always(() => {
                console.log("ALWAYS!")
                $("#email-register").val('')
                $("#password-register").val('')
            })
    })

    $('#login-btn').click((event) => {
        event.preventDefault()
        let email = $("#email-login").val()
        let password = $("#password-login").val()

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/login`,
            data: {
                email,
                password
            }
        })
            .done(response => {
                localStorage.setItem("access_token", response.access_token)
                checkAuth()
            })
            .fail((jqXHR, textStatus, error) => {
                console.log(jqXHR.responseJSON.message)
            })
            .always(() => {
                $("#email-login").val('')
                $("#password-login").val('')
            })
    })

    $('#logout-btn').click((event) => {
        event.preventDefault()
        localStorage.clear()
        checkAuth()
    })

    $('#register-link').click((event) => {
        event.preventDefault()
        registerMenu()
    })

    $('#login-link').click((event) => {
        event.preventDefault()
        loginMenu()
    })
})

function checkAuth() {
    if (localStorage.access_token) {
        afterLogin()
    }
    else {
        loginMenu()
    }
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data: {
            id_token
        }
    })
        .done(response => {
            localStorage.setItem("access_token", response.access_token)
        })
        .fail((xhr, status) => {

        })
        .always()
}

function loginMenu() {
    $("#email").val('')
    $("#password").val('')
    $('#login-page').show()
    $('#logout-btn').hide()
    $('#register-page').hide()
    $('#container-todo-list').hide()
}

function registerMenu() {
    $('#register-page').show()
    $('#login-page').hide()
    $('#logout-btn').hide()
    $('#todo-list').hide()
}

function afterLogin() {
    $('#login-page').hide()
    $('#register-page').hide()
    $('#container-todo-list').show()
    getTodoList()
    $('#logout-btn').show()
}

function getTodoList() {
    $("#todo-list").empty()
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            let todoList = response

            todoList.forEach(element => {
                $('#todo-list').append(`<div class="card col-4" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.description}</p>
                        <p class="card-text">${element.due_date}</p>
                        <a href="#" class="btn btn-primary">Update</a>
                    </div>
                </div>`)
            })
        })
        .fail(err => {
            console.log(err, ">>>> this is error from ajax todolist")
        })
        .always(() => {
            console.log("ALWAYS!")
        })

}

