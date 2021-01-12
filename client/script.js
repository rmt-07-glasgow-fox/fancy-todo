let baseUrl = "http://localhost:3000"
//const baseUrl = "https://fancy-todo-todoco-client.web.app"


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
    $('#addTodoForm').hide()
    $('#updateTodoForm').hide()
    $('#container-todo-list').show()
    $('#col-sidebar').show()
    $('#col-todolist').show()
    getTodoList()
    $('#logout-btn').show()
}

function loggedOut() {
    loginMenu()
    googleSignOut()

}

function formUpdateTodo(todoId) {
    $('#main-page').hide()
    $('#content-page').show()
    $('#col-sidebar').hide()
    $('#col-todolist').hide()
    $('#addTodoForm').hide()
    $('#updateTodoForm').show()
    $('#update-btn').click((event) => {
        event.preventDefault()
        updateTodo(todoId)
    })
    $('#logout-btn').show()
}

function addTodoForm() {
    $('#main-page').hide()
    $('#content-page').show()
    $('#col-sidebar').hide()
    $('#col-todolist').hide()
    $('#addTodoForm').show()
    $('#updateTodoForm').hide()
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
                let statusButton

                //if (element.status) {
                //statusButton = `<button id="todo-status-done" class="btn btn-primary" type="button">
                //<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                //<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                //</svg>
                //</button>`
                //}
                //else {
                //statusButton = `<button id="todo-status-undone" class="btn btn-danger" type="button">
                //<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                //<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                //</svg>
                //</button>`
                //}
                $('#todo-list').append(`
                                            <div class="card col-12 border-dark mt-3 mb-5" style="width: 18rem;">
                                <div class="card-header">${element.title}</div>
                                    <div class="row">
                                        <div class="col-2 mt-5 mb-5">
                                          <button id="showDone-btn-${element.id}" onclick=showDone(${element.id}) class="btn btn-primary">
                                          Set as done
                                          </button>
                                          <div id="done-status-${element.id}">
                                            DONE
                                          </div>
                                        </div>
                                        <div class="col-10">
                                            <div class="card-body text-dark text-justify">
                                                <p class="card-text">${element.description}</p>
                                                <p class="card-text">Due: ${element.due_date}</p>
                                                <a href="#" class="btn btn-primary" onclick="formUpdateTodo(${element.id})">Update</a>
                                                <a href="#" class="btn btn-danger" onclick="deleteTodo(${element.id})">Delete</a>
                                            </div>
                                        </div>
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

//function checkStatus(todoId, status) {
//function switchStatus(todoId) {
//$("#todo-status").toggleClass(["bi bi-x", "bi bi-check"])
//console.log("masuk switchStatus!")

//checkAuth()
//status = !status

//$.ajax({
//method: 'PATCH',
//url: `${baseUrl}/todos/${todoId}`,
//headers: {
//access_token: localStorage.access_token
//},
//data: {
//status
//}
//})
//.done(response => {
//console.log(">>>>>", response)
//})
//.fail(err => {
//console.log(err, ">>>> this is error from ajax updateTodo")
//})
//.always(() => {
//console.log("ALWAYS!")
//})

//}

function deleteTodo(todoId) {
    $("#todo-list").empty()
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${todoId}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            console.log(response, ">>>> this is response from ajax deletetodo")
            $('#delete-success').empty()
            if (response) {
                $('#delete-success').append(`
                                <div class="alert alert-success" role="alert" id="delete-success">
                                        ${response.message}
                                </div>
                                `)
            }
            setTimeout(() => {
                afterLogin()
            }, 500)
        })
        .fail(err => {
            console.log(err, ">>>> this is error from ajax deleteTodo")
        })
        .always(() => {
            console.log("ALWAYS!")
        })
}

function updateTodo(todoId) {
    let title = $("#editTodoTitle").val()
    let description = $("#editTodoDescription").val()
    let due_date = $("#editTodoDueDate").val()
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${todoId}`,
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
            $('#update-success').empty()
            if (response) {
                $('#update-success').append(`
                                <div class="alert alert-success" role="alert" id="update-sucess">
                                        Update Success!
                                </div>
                                `)
            }
            setTimeout(() => {
                afterLogin()
            }, 500)
        })
        .fail(err => {
            console.log(err, ">>>> this is error from ajax updateTodo")
        })
        .always(() => {
            console.log("ALWAYS!")
        })
}

function showDone(todoId) {
    const displayProp = ($(`#done-status-${todoId}`).css('display'))

    if (displayProp === "none") {
        $(`#done-status-${todoId}`).show()
        $(`#showDone-btn-${todoId}`).html('Set as undone')
        // insert a function to switch status here using ajax
    }
    else {
        $(`#done-status-${todoId}`).hide()
        $(`#showDone-btn-${todoId}`).html('Set as done')
        // insert a function to switch status here using ajax
    }

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
                let errMessagesRegister = jqXHR.responseJSON.messages
                $('#register-errors').empty()

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
                let errMessagesLogin = jqXHR.responseJSON.messages
                $('#login-errors').empty()

                errMessagesLogin.forEach(element => {
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

    $('#delete-btn').click((event) => {
        event.preventDefault()
        deleteTodo()
    })

    $('#add-btn').click((event) => {
        event.preventDefault()
        addTodoForm()
    })

    $('#add-btn-confirm').click((event) => {
        event.preventDefault()
        let title = $("#addTodoTitle").val()
        let description = $("#addTodoDescription").val()
        let due_date = $("#addTodoDueDate").val()
        let status = false
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/todos`,
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                title,
                description,
                due_date,
                status
            }
        })
            .done(response => {
                $('#add-success').empty()
                if (response) {
                    $('#add-success').append(`
                                <div class="alert alert-success" role="alert" id="add-success">
                                        Add success!
                                </div>
                                `)
                }
                setTimeout(() => {
                    afterLogin()
                }, 500)
            })
            .fail(err => {
                console.log(err, ">>>> this is error from ajax addTodo")
            })
            .always(() => {
                console.log("ALWAYS!")
            })
    })

})


