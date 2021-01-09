let baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    if (localStorage.access_token) {
        showMainPage()
    } else {
        showLoginPage()
    }
})

function showRegisterPage() {
    $('#navbar').hide()
    $('#register-page').show()
    $('#logout-btn').hide()
    $('#login-page').hide()
    $('#add-task').hide()
    $('#all-tasks').hide()
    $('#update-task').hide()
}

function showLoginPage() {
    $('#navbar').hide()
    $('#register-page').hide()
    $('#logout-btn').hide()
    $('#login-page').show()
    $('#add-task').hide()
    $('#all-tasks').hide()
    $('#update-task').hide()
}


function showMainPage() {
    $('#navbar').show()
    $('#register-page').hide()
    $('#logout-btn').show()
    $('#login-page').hide()
    $('#add-task').hide()
    $('#all-tasks').show()
    $('#update-task').hide()
    showTasks()
    getRandomJokes()
} 


function showUpdateForm() {
    $('#navbar').show()
    $('#register-page').hide()
    $('#logout-btn').show()
    $('#login-page').hide()
    $('#add-task').hide()
    $('#all-tasks').hide()
    $('#update-task').show()
} 

function showAddForm() {
    $('#navbar').show()
    $('#register-page').hide()
    $('#logout-btn').show()
    $('#login-page').hide()
    $('#add-task').show()
    $('#all-tasks').hide()
    $('#update-task').hide()
}

//login
$('#login-form').on('submit', function(event) {
    event.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-password').val()
    
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            password
        }
    })
        .done(response => {
            console.log(response)
            localStorage.setItem('access_token', response.access_token)            
            Swal.fire({
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: false,
                timer: 1000
            })
            showMainPage()
        })
        .fail(err => {
            console.log(err.responseJSON)
            Swal.fire({
              icon: 'error',
              title: err.responseJSON.message
            })
        })
        .always(()=> {
            $('#login-email').val('')
            $('#login-password').val('')
        })
})

// register
$('#register-link').on('click', function(event) {
    event.preventDefault()
    showRegisterPage()
})

//login button di register
$('#login-btn').on('click', function(e){
    e.preventDefault()
    showLoginPage()
})

// register
$('#register-form').on('submit', function(event) {
    event.preventDefault()
    let fullName = $('#register-fullname').val()
    let email = $('#register-email').val()
    let password = $('#register-password').val()
    
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {
            fullName, 
            email,
            password
        }
    })
        .done(response => {
            console.log(response)
            showLoginPage()
        })
        .fail(err => {
            console.log(err.responseJSON)
            let text
            if(typeof err.responseJSON.message == 'object'){
                text = err.responseJSON.message.join(', ')
            } else {
                text = err.responseJSON.message
            }

            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text
            })
        })
        .always(()=> {
            $('#register-email').val('')
            $('#register-password').val('')
        })
})

// add-task form
$('#add-task-form').on('submit', function(event) {
    event.preventDefault()
    let title = $('#add-title').val()
    let description = $('#add-description').val()
    let due_date = $('#add-date').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        data: {
            title, 
            description, 
            due_date,
            status: 'false'
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            console.log(response)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your to-do list has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            showMainPage()
        })
        .fail(err => {
            console.log(err.responseJSON)
            let text
            if(typeof err.responseJSON.message == 'object'){
                text = err.responseJSON.message.join(', ')
            } else {
                text = err.responseJSON.message
            }

            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text
            })
        })
        .always(()=> {
            $('#add-title').val('')
            $('#add-description').val('')
            $('#add-date').val('')
        })
})

//logout
$('#logout-btn').on('click', function(e){
    e.preventDefault()
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    showLoginPage()
})

//show tasks
function showTasks() {
    $.ajax({
        method: 'GET', 
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response =>{
        console.log(response)
        $('#list-tasks').empty()
        for(let i = 0; i < response.length; i++) {
            $('#list-tasks').append(
                `<div class="col-4 mb-3">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${response[i].title}</h5>
                        <p class="card-text">Description: ${response[i].description}</p>
                        <p class="card-text">Status: ${response[i].status}</p>
                        <p class="card-text">Due date: ${response[i].due_date.split('T')[0]}</p>
                        <a href="#" class="btn btn-primary" onclick="getOneTask(${response[i].id})">Update</a>
                        <a href="#" class="btn btn-primary" onclick="deleteTask(${response[i].id})" >Delete</a>
                    </div>
                    </div>
                </div>`
            )
        }
    })
    .fail(err =>{
        console.log(err)
    })
}

function getOneTask(id){
    $.ajax({
        method: 'GET', 
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            console.log(response)
            showUpdateForm()
            $('#update-title').val(response.title)
            $('#update-description').val(response.description)
            $('#update-status').val(response.status)
            $('#update-date').val(response.due_date.split('T')[0])
            $('#update-task-form').data('id', response.id)
        })
        .fail(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: err.responseJSON.message
            })
        })
}

$('#update-task-form').on('submit', function(e){
    e.preventDefault()
    let title = $('#update-title').val()
    let description = $('#update-description').val()
    let status = $('#update-status').val()
    let due_date = $('#update-date').val()
    let id = $('#update-task-form').data('id')
    // console.log(id)
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${id}`,
        data: {
            title, 
            description, 
            status, 
            due_date
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            console.log(response)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your to-do list has been updated',
                showConfirmButton: false,
                timer: 1500
            })
            showMainPage()
        })
        .fail(err =>{
            console.log(err)
        })
        .always(()=>{
            $('#update-title').val('')
            $('#update-description').val('')
            $('#update-status').val('')
            $('#update-date').val('')
        })
})



function deleteTask (id) {
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            console.log(response)
            showMainPage()
        })
        .fail(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: err.responseJSON.message
            })
        })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data: {
            id_token
        }
    })
        .done(response => {
            console.log(response)
            localStorage.setItem('access_token', response.access_token)
            Swal.fire({
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: false,
                timer: 1000
            })
            showMainPage()
        })
        .fail(err => {
            console.log(err)
        })
  
}

function getRandomJokes() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/jokes`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(response => {
            $('#jokes').empty()
            console.log(response)
            $('#jokes').append(response)
        })
        .fail(err => {
            console.log(err)
        })
}

$('#addtask-btn').on('click', function(e) {
    e.preventDefault()
    showAddForm()
})

$('#btn-cancel-update').on('click', function(e){
    e.preventDefault()
    showMainPage()
})

$('#btn-cancel-add').on('click', function(e){
    e.preventDefault()
    showMainPage()
})