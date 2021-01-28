const server = 'http://localhost:3000'
let task = null
let id = null

const authCheck = () => {
    if(localStorage.access_token){
        home()
    }
    else {
        login()
    }
}

// register
const register = () => {
    $('#register-page').show()
    $('#login-page').hide()
    $('#logout-nave').hide()
    $('#addTodos-page').hide()
    $('#form-todos').hide()
    $('#showform').hide()
    $('#edit-user').hide()
    $('#show-todos').hide()
    $('#editTodos-page').hide()
}

$('#showLogin').click((event) => {
    event.preventDefault()
    login()
})

const axiosRegister = () => {
    let email = $('#email-reg').val()
    let name = $('#name-reg').val()
    let password = $('#password-reg').val()
    $.ajax({
        method: 'POST',
        url: `${server}/register`,
        data: {
            email,
            name,
            password
        }
    })
    .done(response => {
        console.log(response, 'this is response')
        login()
    })
    .fail(err => {
        let errMessage = err.responseJSON.map(err => err.message)
        console.log(errMessage);
        Swal.fire({
            title: 'Error!',
            text: errMessage.join(', '),
            icon: 'error'
          })
    })
    .always(() => {
        $('#email-reg').val('')
        $('#name-reg').val('')
        $('#password-reg').val('')
        $('#rePassword').val('')
    })
}

$('#showRegister').click((event) => {
    event.preventDefault()
    register()
})

//login

const login = () => {
    $('#register-page').hide()
    $('#login-page').show()
    $('#logout-nave').hide()
    $('#addTodos-page').hide()
    $('#form-todos').hide()
    $('#showform').hide()
    $('#edit-user').hide()
    $('#show-todos').hide()
    $('#editTodos-page').hide()
}

function onSignIn(googleUser) {
    let name = googleUser.getBasicProfile().getName();
    let id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: 'POST',
        url: `${server}/loginGoogle`,
        data:{
            id_token
        }
    })
    .done(response =>{
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        home()
    })
    .fail((xhr,status) =>{
        let errMessage = err.responseJSON.map(err => err.message)
        console.log(errMessage);
        Swal.fire({
            title: 'Error!',
            text: errMessage.join(', '),
            icon: 'error'
          })
    })
}

const axiosLogin = () => {
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    $.ajax({
        method: 'POST',
        url: `${server}/login`,
        data : {
            email,
            password
        }
    })
    .done(response => {
        console.log(response, 'ini res')
        localStorage.setItem("access_token", response.access_token)
        home()
    })
    .fail(err => {
        let errMessage = err.responseJSON.map(err => err.message)
        console.log(errMessage);
        Swal.fire({
            title: 'Error!',
            text: errMessage.join(', '),
            icon: 'error'
          })
    })
    .always(() => {
        $('#email-login').val('')
        $('#password-login').val('')
    })
}

$('#logout-nave').click((event) => {
    event.preventDefault()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function () {
        localStorage.clear()
        console.log('User signed out.');
        login()
    })
    .catch(err=>{
        console.log(err, `ini error di google account`)
    })
})

// Add Edit Update Todos
const fetchCovid = () => {
    $.ajax({
        method: 'GET',
        url: `${server}/covid/cases`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response);
        $('#covid').empty()
        $('#covid').append(`
        <div class="card text-white bg-secondary mb-3" style="margin: 10px; max-width: 18rem;">
            <div class="card-header">Confirmed</div>
            <div class="card-body">
            <h1 class="card-text">${response.confirmed}</h1>
            </div>
        </div>
        <div class="card text-white bg-success mb-3" style="margin: 10px; max-width: 18rem;">
            <div class="card-header">Recovered</div>
            <div class="card-body">
            <h1 class="card-text">${response.recovered}</h1>
            </div>
        </div>
        <div class="card text-white bg-danger mb-3" style="margin: 10px; max-width: 18rem;">
            <div class="card-header">Deaths</div>
            <div class="card-body">
            <h1 class="card-text">${response.deaths}</h1>
            </div>
        </div>
        `)
    })
    .fail(err => {
        console.log(err);
    })
}

const fetchData = () => {
    $.ajax({
        method: 'GET',
        url: `${server}/todos`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response);
        $('#show-todos').empty()
        response.forEach(e => {
            let date = new Date(e.due_date);
            let newDate = date.toISOString().substring(0, 10);
            $('#show-todos').append(`
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox" id="status">
                </div>
                </div>
                <div class="card" style="width: 40rem">
                    <div class="card-body" id="todoCardBody${e.id}">
                    <div id="todoCardValue">
                        <h5 class="card-title">${e.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${newDate}</h6>
                        <p class="card-text">${e.description}</p>
                        <a href="#" class="card-link" onclick="updateTodo(${e.id})" >Edit</a>
                        <a href="#" class="card-link" onclick="deleteTodo(${e.id})">Hapus</a>
                    </div>
                    </div>
                </div>
            </div>
        `)
        });
    })
    .fail(err => {
        let errMessage = err.responseJSON.map(err => err.message)
        console.log(errMessage);
        Swal.fire({
            title: 'Error!',
            text: errMessage.join(', '),
            icon: 'error'
          })
    })
}

const updateTodo = (value) => {
    $.ajax({
        method: 'GET',
        url: `${server}/todos/${value}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        task = response
        id = response.id
        showEditData(response)
        }
    )
    .fail(err => {
        console.log(err);
    })
}

const home = () => {
    $('#register-page').hide()
    $('#login-page').hide()
    $('#logout-nave').show()
    $('#addTodos-page').show()
    $('#form-todos').hide()
    $('#showform').show()
    $('#edit-user').show()
    $('#show-todos').show()
    $('#editTodos-page').hide()
    fetchCovid()
    fetchData()
}

const formAddTodos = (event) => {
    $('#register-page').hide()
    $('#login-page').hide()
    $('#logout-nave').show()
    $('#addTodos-page').show()
    $('#form-todos').show()
    $('#showform').show()
    $('#edit-user').show()
    $('#editTodos-page').hide()
    $('#show-todos').show()
    fetchCovid()
}

$('#showForm').click((event) => {
    event.preventDefault()
    formAddTodos()
})

$('#save-todo').click((event) => {
    event.preventDefault()
    let title = $('#title').val()
    let date = $('#date').val()
    let description = $('#description').val()
    $.ajax({
        method: 'POST',
        url: `${server}/todos`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data : {
            title,
            due_date: date,
            description
        }
    })
    .done(response => {
        Swal.fire({
            title: 'Success !!',
            text: 'Success add Todo',
            icon: 'success',
            confirmButtonText: 'Close'
          })
        authCheck()
    })
    .fail(err => {
        console.log(err);
        let errMessage = err.responseJSON.map(err => err.message)
        console.log(errMessage);
        Swal.fire({
            title: 'Error!',
            text: errMessage.join(', '),
            icon: 'error'
          })
    })
    .always(() => {

    })
    authCheck()
})

$('#cancel').click((event) => {
    event.preventDefault()
    authCheck()
})

const formEditTodos = (event) => {
    $('#register-page').hide()
    $('#login-page').hide()
    $('#logout-nave').show()
    $('#addTodos-page').show()
    $('#form-todos').hide()
    $('#showform').show()
    $('#edit-user').show()
    $('#show-todos').show()
    $('#editTodos-page').show()
    fetchCovid()
}
const showEditData = () => {
    if (task) {
        $("#editTitle").val(task.title)
        $("#editDescription").val(task.description)
        $("#editDue_date").val(task.due_date)
    }
    formEditTodos()
}

$('#cancelEdit').click((event) => {
    event.preventDefault()
    authCheck()
})

const deleteTodo = (id) => {
    $.ajax({
        method: 'DELETE',
        url: `${server}/todos/${id}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        Swal.fire({
            title: 'Success !!',
            text: 'Success Delete Todo',
            icon: 'success'
          })
        home()
    })
    .fail(err => {
        let errMessage = err.responseJSON.map(err => err.message)
        console.log(errMessage);
        Swal.fire({
            title: 'Error!',
            text: errMessage.join(', '),
            icon: 'error'
          })
    })
}

$('#saveEdit').click((event) => {
    event.preventDefault()
    const title = $("#editTitle").val()
    const description = $("#editDescription").val()
    const due_date = $("#editDue_date").val()
    $.ajax({
      method: 'PUT',
      url: `${server}/todos/${id}`,
      headers: {
        access_token: localStorage.getItem('access_token')
      },
      data: { title,
        due_date,
        description}
    })
      .done(response => {
        Swal.fire({
            title: 'Success !!',
            text: 'Success Update Todo',
            icon: 'success',
        })
        home()
      })
      .fail(err => {
        let errMessage = err.responseJSON.map(err => err.message)
        console.log(errMessage);
        Swal.fire({
            title: 'Error!',
            text: errMessage.join(', '),
            icon: 'error'
          })
      })
      .always(response => {
        console.log(response);
      })

  })



$(document).ready(function(){
    console.log('Greetings My lords')
    authCheck()
    $('#register-btn').click(function(event){
        event.preventDefault()
        axiosRegister()
    })
    $('#login-btn').click(function(event){
        event.preventDefault()
        axiosLogin()
    })
});


