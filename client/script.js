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
        })
        .fail(err => {
            console.log(err, 'err di login')
        })
        .always(() => {

        })

}

function logout(event) {
    localStorage.clear()
    $('.login').show()
    $('#registerForm').show()
    $('#loginForm').show()
    $('#email').val('')
    $('#password').val('')

}

$(document).ready(function() {
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