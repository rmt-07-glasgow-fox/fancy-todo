let baseUrl = 'http://localhost:3000'

function registerForm() {
    $('.login').hide()
    $('.register').show()
}

function loginForm() {
    $('.register').hide()
    $('.login').show()
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
    $('.login').show()
    $('#registerForm').show()
    $('#loginForm').show()
    $('.g-signin2').show()
    $('#email').val('')
    $('#password').val('')

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
        console.log(response)
        $('#todos').empty()
        response.map(task => {
            $(`
                <div class="card" style="width: 50rem;">
                    <div class="card-body" id="cardBody">
                        <h5 class="card-title">${task.title}</h5>
                        <h7 class="card-subtitle">${task.due_date}</h7><br><br>
                        <p class="card-text">${task.description}</p>
                    </div>
                </div>
            `).appendTo('#todos')
        })
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
})

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }