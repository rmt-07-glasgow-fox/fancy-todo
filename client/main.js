const baseUrl = 'http://localhost:3000'
$(document).ready(function(){
   checkAuth()  
});

function checkAuth(){
    if(localStorage.access_token) {
        $('#welcome').hide()
        getTodos()
        $('#todos').show()
        $('#logout-btn').show()
        $('#form-edit').hide()
        $('#form-add').hide()
        $.ajax({
            method:'POST',
            url: `${baseUrl}/todos/weather`,
            headers: {
             access_token: localStorage.access_token
            }
        })
        .done(response=> {
            getWeather(response)
        })
        .fail(err => {
         console.log(err)
         })
         .always(() => {
             console.log("always RUN")
         })
    }else{
        $('#welcome').show()
        $('#signIn').hide()
        $('#todos').hide()
        $('#signUp').show()
        $('#logout-btn').hide()
    }
}

$('#btn-view-add').click(function(event) {
    event.preventDefault()
    $('#form-add').show()
})


$('#cancel-btn').click(function() {
    getTodos()
})
// function check (v) {
//     $('#check-edit-todo').prop('checked', v);
// }


$('#reg-btn').click(function(event) {
    event.preventDefault()
    const username = $('#regusername').val()
    const email = $('#regemail').val()
    const password = $('#regpassword').val()
    console.log({username,email,password})

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/signup`,
        data: {
            username: username,
            email: email,
            password: password,
        }
    })
    .done(response => {
        console.log(response)
        $('#signUp').hide()
        $('#signIn').show()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        console.log('always')
        $('#regemail').val('')
        $('#regpassword').val('')
        $('#regusername').val('')
    })
})

$('#login-btn').click(function(event) {
    event.preventDefault()
    const email = $('#email').val()
    const password = $('#password').val()
    console.log({password,email})

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/signin`,
        data: {
            email: email,
            password: password,
        }
    })
    .done(response => {
        console.log(response)
        localStorage.setItem('access_token',response.access_token)
        checkAuth()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        console.log('always')
        $('#email').val('')
        $('#password').val('')
    })
})

$('#signin-link').click(function(event){
    event.preventDefault()
    $('#signIn').show()
    $('#signUp').hide()
})
$('#signup-link').click(function(event){
    event.preventDefault()
    $('#signIn').hide()
    $('#signUp').show()
})

$('#logout-btn').click(function(event){
    event.preventDefault()
    localStorage.clear()
    checkAuth()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
})

function getTodos() {
    let todoList = []
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        console.log(response)
        todoList = response
        $('#view-todo').empty()
        todoList.forEach(element => {
            $('#view-todo').append(
            `<div class="row card-body mx-auto">
                <div class="col-md-1 bg-dark checkbox">
                <br><br><br>
                <input type="checkbox" id="status-${
                    element.id}"onclick="changeStatus(${element.id}, ${!element.status})" ${
                    element.status ? 'checked' : ''}>
                </div>
                <div class="col-md-11 bg-white">
                <br>
                <p>${element.title}</p>
                <p>${new Date(element.due_date).toISOString().slice(0, 10)}</p>
                <p>${element.description}</p>
                <button class="btn btn-transparent" onClick="getOneTodo(${element.id})" id="edit-btn-todo">edit</button>
                <button class="btn btn-transparent" onClick="deleteTodo(${element.id})">hapus</button>
                <br>
                </div>
            </div>`
        )
        });
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        console.log('always')
    })
}

function getOneTodo (id) {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        console.log(response)

        $('#title-edit-todo').val(response.title)
        $('#date-edit-todo').val(new Date(response.due_date).toISOString().slice(0, 10))
        $('#desc-edit-todo').val(response.description)
        $('#update-btn').data('id',id)
        $('#form-edit').show()
        $('#view-todo').hide()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        console.log('always')
    })
}

$('#update-btn').click(function(){
    const title = $('#title-edit-todo').val();
    const due_date = $('#date-edit-todo').val();
    const description = $('#desc-edit-todo').val();
    let id = $('#update-btn').data('id')
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${id}`,
        data: {
            title: title,
            due_date: due_date,
            description: description,
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        console.log(response)
        $('#form-edit').hide()
        getTodos()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        console.log('always')
        $('#title-edit-todo').val('')
        $('#date-edit-todo').val('')
        $('#desc-edit-todo').val('')
        $('#check-edit-todo').val('')
    })
})

function changeStatus(id,v) {
    $.ajax({
        url:`${baseUrl}/todos/${id}`,
        method: 'PATCH',
        data: {
          status: v,
        },
        headers: {
            access_token: localStorage.access_token
        },
      })
        .done((response) => {
          getTodos();
        })
        .fail((err) => {
          console.log(err);
          
        })
        .always(() => {});
    }

$('#add-todo').click(function(event){
    event.preventDefault();
    const title = $('#title-add').val()
    const due_date = $('#date-add').val()
    const description = $('#desc-add').val()
    const status = false;
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        data: {
            title: title,
            due_date: due_date,
            description: description,
            status: status,
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done((response) => {
            getTodos();
    })
    .fail((err) => {
            console.log(err)
    })
    .always(() => {
        $('#title-add').val('');
        $('#date-add').val('');
        $('#desc-add').val('');
        $('#form-add').hide()
    });
})

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)

    $.ajax({
        method: 'POST',
        url:`http://localhost:3000/loginGoogle`,
        data: {id_token},
    })
    .done(response => {
        console.log(response)
        localStorage.setItem('access_token',response.access_token)
        checkAuth()
    })
    .fail((xhr,status) => {

    })
  }

function deleteTodo (id) {
    $.ajax({
      method: 'DELETE',
      url: `${baseUrl}/todos/${id}`,
      headers: {
        access_token: localStorage.access_token
      },
    })
      .done((response) => {
        getTodos();
      })
      .fail((err) => {
        console.log(err)
      });
  };

function getWeather(response){
    $("#weather").empty()
    weather = response.weather
    temp = response.temp
    city = response.city
    $('#weather').append(`
    <p>${weather}</p>
   <p>${temp}&deg;</p>
    <p>${city}</p>`)
}