let baseUrl = "http://localhost:3000"

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
            afterLogin()
        })
        .fail((xhr, status) => {

        })
        .always()
}

function googleSignOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


function loginMenu() {
    $("#email").val('')
    $("#password").val('')
    $('#main-page').show()
    $('#content-page').hide()
    $('#login-page').show()
    $('#register-page').hide()
    $('#container-todo-list').hide()
}

function registerMenu() {
    $('#main-page').show()
    $('#content-page').hide()
    $('#register-page').show()
    $('#login-page').hide()
    $('#container-todo-list').hide()
}

function afterLogin() {
    $('#main-page').hide()
    $('#content-page').show()
    $('#container-todo-list').show()
    getTodoList()
    $('#logout-btn').show()
}

function loggedOut() {
    loginMenu()
    googleSignOut()

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
                $('#todo-list').append(`
                <div class="card col-8" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.description}</p>
                        <p class="card-text">${element.due_date}</p>
                        <a href="#" class="btn btn-primary">Update</a>
                        <a href="#" class="btn btn-danger">Delete</a>
                    </div>
                </div>            
`)
            })
        })
        .fail(err => {
            console.log(err, ">>>> this is error from ajax todolist")
        })
        .always(() => {
            console.log("ALWAYS!")
        })
}

$(document).ready(function () {
    checkAuth()

    $('#register-btn').click((event) => {
        event.preventDefault()
        let email = $("#email").val()
        let password = $("#password").val()

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
            .fail((jqXHR, textStatus, error) => {
                console.log(jqXHR.responseJSON.messages)
                let errMessagesRegister = jqXHR.responseJSON.messages

                errMessagesRegister.forEach(element => {
                    $('#register-errors').append(`
                                <div class="alert alert-danger" role="alert" id="register-errors">
                                        ${element}
                                </div>
                                `)
                })
            })
            .always(() => {
                $("#email").val('')
                $("#password").val('')
            })
    })

    $('#login-btn').click((event) => {
        event.preventDefault()
        let email = $("#email").val()
        let password = $("#password").val()

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
                console.log(jqXHR.responseJSON.messages)
                let errMessagesLogin = jqXHR.responseJSON.messages

                errMessagesLogin.forEach(element => {
                    $('#login-errors').empty()
                    $('#login-errors').append(`
                                <div class="alert alert-danger" role="alert">
                                        ${element}
                                </div>
                                `)
                })
            })
            .always(() => {
                $("#email").val('')
                $("#password").val('')
            })
    })

    $('#logout-btn').click((event) => {
        event.preventDefault()
        localStorage.clear()
        loggedOut()
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


