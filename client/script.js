let baseUrl = 'http://localhost:3000'

function registerForm() {
    $('.login').hide()
    $('.register').show()
}

function loginForm() {
    $('.register').hide()
    $('.login').show()
}

function addTaskfrom() {
    $('#to-add-form').hide()
    $('#todos-list').hide()
    $('#add-task-form').show()

}

function register(event) {
    event.preventDefault()
        let email = $('#email-register').val()
        let password = $('#password-register').val()
        let passwordConfirm = $('#password-register-confirm').val()

        if (password === passwordConfirm) {
            $.ajax({
                method: 'POST',
                url: `${baseUrl}/register`,
                data: {
                    email,
                    password
                }
            })
            .done(response => {
                $('.register').hide()
                $('.login').show()
            })
            .fail(err => {
                console.log(err, 'err di reg')
            })
        }

}

function login(event) {
    // console.log('masuk login')
    event.preventDefault()
        let email = $('#email').val()
        let password = $('#password').val()
        // console.log(email, password)

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/login`,
            data: {
                email,
                password
            }
        })
        .done(response => {
            localStorage.access_token = response.access_token
            console.log(response, 'responses')

            $('#registerForm').hide()
            $('#loginForm').hide()
            $('#logout').show()
            $('.login').hide()
            $('.g-signin2').hide()
            dashBoard()
        })
        .fail(err => {
            console.log(err, 'err di login')
        })
        .always(() => {

        })

}

function logout() {
    localStorage.clear()
    $('#todos').hide()
    $('#logout').hide()
    $('#add-task-form').hide()
    $('#edit-task-form').hide()
    $('.login').show()
    $('#registerForm').show()
    $('#loginForm').show()
    $('.g-signin2').show()
    $('#email').val('')
    $('#password').val('')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

}

function dashBoard() {
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('.login').hide()
    $('#logout').show()
    $('.g-signin2').hide()
    todosList()
}

function todosList() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    }) 
    .done(response => {
        // console.log(response)
        $('#todos').show()
        $('#todos-list').empty()
        response.map(task => {
            let checkbox = ""
            if (task.status === true) {
                checkbox = "checked"
            }
            
            $(`
                <div class="card" style="width: 50rem;">
                    <div class="card-body" id="cardBody">
                        <input type="checkbox" name="" id="status" onclick="changeStatus(${task.id}, ${task.status})" ${checkbox}>
                        <h5 class="card-title">${task.title}</h5>
                        <h7 class="card-subtitle">${task.due_date}</h7><br><br>
                        <p class="card-text">${task.description}</p>
                        <a href="#" class="text-decoration-none" onclick="deleteTask(${task.id})">Delete</a>
                        <a href="#" class="text-decoration-none" onclick="editForm(${task.id})">Edit</a>
                    </div>
                </div>
            `).appendTo('#todos-list')
        })
    })
    .fail(err => {
        console.log(err)
    })
}

function addTodos(event) {
    let title = $('#title').val()
    let due_date = $('#due_date').val()
    let description = $('#description').val()
    event.preventDefault()
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            due_date,
            description
        }
    })
    .done(response => {
        // console.log(response)
        $('#add-task-form').hide()
        todosList()
        $('#to-add-form').show()
        $('#todos-list').show()

    })
    .fail(err => {
        console.log(err)
    })
}

function deleteTask(taskId) {
    $.ajax({
        method: "DELETE",
        url: `${baseUrl}/todos/${taskId}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log('berhasil delete')
        todosList()
    })
    .fail(err => {
        console.log(err)
    })
}

function editForm(taskId) {
    console.log('masuk edit form')
    console.log(taskId)
    
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/${taskId}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response)
        $('#todos').hide()
        $('#edit-task-form').empty()
        $('#edit-task-form').show()
        $(`
            <form action="">
                <label for="title">Title</label><br>
                <input type="text" name="" id="title-edit" value="${response.title}"><br><br>
                <label for="due-date">Due Date</label><br>
                <input type="date" name="" id="due_date-edit" value="${response.due_date}"><br><br>
                <label for="description">Description</label><br>
                <input type="text" name="" id="description-edit" value="${response.description}"><br><br>
                <button type="submit" class="rounded" id="edit-task-btn" onClick="edit(event, ${taskId})">Confirm Edit</button>
            </form>
        `).appendTo('#edit-task-form')
    })
    .fail(err => {
        console.log(err)
    })
}

function edit(event, taskId) {
    console.log('masuk edit')
    let title = $('#title-edit').val()
    let due_date = $('#due_date-edit').val()
    let description = $('#description-edit').val()
    event.preventDefault()
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${taskId}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            due_date,
            description
        }
    })
    .done(response => {
        console.log(response)
        $('#edit-task-form').hide()
        todosList()
        $('#todos').show()
    })
    .fail(err => {
        console.log(err)
    })
}

function changeStatus(taskId, status) {
    console.log('masuk edit status')
    let newStatus = ''
    if (status == true) {
        newStatus = false
    } else {
        newStatus = true
    }
    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${taskId}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            status: newStatus
        }
    })
    .done(response => {
        console.log(response)
        todosList()
    })
    .fail(err => {
        console.log(err)
    })
}


$(document).ready(function() {
    if (localStorage.access_token) {
        dashBoard()
    }

    $('#login-btn').click(login)
    $('#register-btn').click(register)
    $('#to-add-form').click(addTaskfrom)
    $('#add-task-btn').click(addTodos)
})

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/googleLogin`,
        data: { id_token },
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token);
        dashBoard();
    })
    .fail(err => {
        console.log(err)
    });
}