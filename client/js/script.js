const baseUrl = 'http://localhost:3000'


$(document).ready(()=> {
    $('.register').hide()
    $('#logout-btn').hide()
    // $('.login').hide()
    $('.todoList').hide()

    $('#show-register-btn').click(() => {
        $('.register').show()
        $('.login').hide()
    })

    $('#show-login-btn').click(() => {
        $('.register').hide()
        $('.login').show()
    })

    // Register
    $('#register-btn').click(function(event) {
        event.preventDefault()
        let email = $('#regemail').val()
        let password = $('#regpassword').val()

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/register`,
            data: {email, password}
        })
        .done(response => {
            $('.login').show()
            $('.register').hide()
        })
        .fail(err => {
            console.log(err);
        })
        .always(_=> {
            console.log('always');
            $('#regusername').val()
            $('#regemail').val()
            $('#regpassword').val()
        })
    })

    // Login
    $('#login-btn').click(function(event) {
        event.preventDefault()
        let email = $('#email').val()
        let password = $('#password').val()

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/login`,
            data: {email, password}
        })
        .done(response => {
            afterLogin()
            localStorage.setItem('access_token', response.access_token)
            console.log(localStorage);
        })
        .fail(err => {
            console.log(err);
        })
        .always(_=> {
            console.log('always');
            $('#email').val()
            $('#password').val()
        })
    })

    // Logout
    $('#logout-btn').click(function(event){
        event.preventDefault()
        localStorage.clear()
        afterLogout()
        console.log("logout cuy")
        console.log(localStorage);
    })
})

// Signin Google
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data: { id_token }
    })
    .done(response => {
        console.log('masuk google login');
        afterLogin()
        localStorage.setItem('access_token', response.access_token)
    })
    .fail(err => {
        console.log(err);
    })
    .always()
}

function afterLogin() {
    $('.login').hide()
    $('.register').hide()
    $('#logout-btn').show()
    $('.todoList').show()
}

function afterLogout() {
    $('.login').show()
    $('.register').hide()
    $('.todoList').hide()
    $('#logout-btn').hide()
}